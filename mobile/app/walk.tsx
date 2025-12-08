import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Alert, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VideoView, useVideoPlayer } from 'expo-video';
import { useEvent } from 'expo';

// --- Constants ---
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const UI_PANEL_HEIGHT = 250;
const CHAR_WIDTH = SCREEN_WIDTH;
const CHAR_HEIGHT = SCREEN_HEIGHT - UI_PANEL_HEIGHT; // Full height minus UI panel only
const STORAGE_KEY = '@walk_game_state_v2';

// --- Game State Types ---
type GameState = {
    waterLevel: number;
    streak: number;
    coins: number;
    isWalking: boolean;
};

const INITIAL_STATE: GameState = {
    waterLevel: 80,
    streak: 22,
    coins: 0,
    isWalking: false,
};

// Video-based Character Component
const VideoCharacter = ({ isWalking, waterLevel }: { isWalking: boolean; waterLevel: number }) => {
    const [videoState, setVideoState] = useState<'walk' | 'sleeping'>('sleeping');
    const [videoKey, setVideoKey] = useState(0); // For forcing VideoView re-render if needed
    const isInitialMount = useRef(true);

    // State machine logic - simple transitions between walk and sleeping
    useEffect(() => {
        console.log('📹 State check:', { videoState, isWalking, waterLevel });

        if (isWalking && waterLevel > 0) {
            // Switch to walking if energy allows
            if (videoState !== 'walk') {
                console.log('🚶 Switching to walk');
                setVideoState('walk');
            }
        } else {
            // Switch to sleeping if not walking or out of water
            if (videoState !== 'sleeping') {
                console.log('💤 Switching to sleeping');
                setVideoState('sleeping');
            }
        }
    }, [isWalking, waterLevel, videoState]);

    const getVideoSource = (state: 'walk' | 'sleeping') => {
        switch (state) {
            case 'walk':
                return require('@/assets/walk.mov');
            case 'sleeping':
                return require('@/assets/sleeping.mov');
        }
    };

    // Both walk and sleeping videos loop
    const shouldLoop = true;

    // Get initial source (sleeping state)
    const initialSource = getVideoSource('sleeping');
    
    // Create player with initial source
    const player = useVideoPlayer(initialSource, (playerInstance) => {
        playerInstance.loop = true; // Both videos loop
        playerInstance.play(); // Start playback immediately
    });

    // Update player source and settings when state changes
    useEffect(() => {
        // Skip initial mount since player is already initialized
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        
        console.log('🔄 Updating video player for state:', videoState);
        const newSource = getVideoSource(videoState);
        // Replace the video source
        player.replace(newSource);
        // Update loop setting (both videos loop)
        player.loop = true;
        // Ensure video is playing
        player.play();
        // Force VideoView remount by updating key to ensure clean state
        setVideoKey(prev => prev + 1);
    }, [videoState, player]);

    return (
        <VideoView
            key={videoKey}
            player={player}
            style={{ width: CHAR_WIDTH, height: CHAR_HEIGHT }}
            contentFit="cover"
        />
    );
};

export default function WalkScreen() {
    const router = useRouter();
    const [state, setState] = useState<GameState>(INITIAL_STATE);

    useEffect(() => {
        loadState();
    }, []);

    useEffect(() => {
        saveState();
    }, [state]);

    // Decrease water level while walking
    useEffect(() => {
        if (state.isWalking && state.waterLevel > 0) {
            const interval = setInterval(() => {
                setState(prev => {
                    const newWaterLevel = Math.max(0, prev.waterLevel - 1);
                    return {
                        ...prev,
                        waterLevel: newWaterLevel,
                        isWalking: newWaterLevel > 0 ? prev.isWalking : false
                    };
                });
            }, 1000); // Decrease by 1 every second

            return () => clearInterval(interval);
        }
    }, [state.isWalking, state.waterLevel]);

    const loadState = async () => {
        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEY);
            if (stored) setState(JSON.parse(stored));
        } catch (e) { }
    };

    const saveState = async () => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) { }
    };

    const toggleWalk = () => {
        if (state.waterLevel <= 0) {
            Alert.alert("Thirsty!", "You need more water to walk.");
            return;
        }
        setState(prev => ({ ...prev, isWalking: !prev.isWalking }));
    };

    const refillWater = () => {
        setState(prev => ({ ...prev, waterLevel: 100, isWalking: true }));
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <View style={styles.coinBadge}>
                    <Text style={styles.coinText}>🪙 {state.coins}</Text>
                </View>
            </View>

            {/* Character - full width, tappable to toggle walk */}
            <TouchableOpacity
                onPress={toggleWalk}
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: CHAR_WIDTH,
                    height: CHAR_HEIGHT,
                    zIndex: 10
                }}
                activeOpacity={1}
            >
                <VideoCharacter isWalking={state.isWalking} waterLevel={state.waterLevel} />
            </TouchableOpacity>

            {/* UI Panel */}
            <View style={styles.uiPanel}>
                <View style={styles.statsRow}>
                    <View>
                        <Text style={styles.waterLabel}>Water Level</Text>
                        <View style={styles.waterMeter}>
                            <View style={[styles.waterFill, { width: `${state.waterLevel}%` }]} />
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.streakTitle}>{state.streak} Day Streak</Text>
                        <Text style={styles.subText}>7 days to next unlock</Text>
                        <View style={styles.pipsRow}>
                            <View style={[styles.pip, styles.pipActive]} />
                            <View style={[styles.pip, styles.pipActive]} />
                            <View style={styles.pip} />
                        </View>
                    </View>
                </View>
                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.actionButton} onPress={refillWater}>
                        <Text style={styles.btnText}>Water Refill</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.btnText}>Redeem</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#60a5fa' },
    header: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 60, paddingHorizontal: 20, zIndex: 100 },
    backBtn: { padding: 8 },
    backText: { color: '#1e293b', fontWeight: 'bold' },
    coinBadge: { backgroundColor: 'rgba(255,255,255,0.9)', padding: 8, borderRadius: 8 },
    coinText: { fontWeight: 'bold', fontSize: 14 },
    uiPanel: {
        height: UI_PANEL_HEIGHT,
        backgroundColor: '#fff',
        padding: 24,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
    waterLabel: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
    waterMeter: { width: 150, height: 20, backgroundColor: '#e2e8f0', borderRadius: 10, overflow: 'hidden' },
    waterFill: { height: '100%', backgroundColor: '#3b82f6', borderRadius: 10 },
    streakTitle: { fontSize: 20, fontWeight: 'bold' },
    subText: { color: '#64748b', fontSize: 12, marginBottom: 8 },
    pipsRow: { flexDirection: 'row', gap: 8 },
    pip: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#e2e8f0' },
    pipActive: { backgroundColor: '#000' },
    actionRow: { flexDirection: 'row', gap: 16 },
    actionButton: { flex: 1, backgroundColor: '#e2e8f0', paddingVertical: 16, borderRadius: 4, alignItems: 'center' },
    btnText: { fontWeight: '600', fontSize: 14, color: '#1e293b' },
});

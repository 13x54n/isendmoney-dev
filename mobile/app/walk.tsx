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
    const [videoState, setVideoState] = useState<'walk' | 'gotosleep' | 'sleeping'>('sleeping');
    const transitionTimeout = useRef<NodeJS.Timeout | null>(null);
    const [videoKey, setVideoKey] = useState(0); // For forcing VideoView re-render if needed
    const isInitialMount = useRef(true);

    // Fallback timeout for gotosleep transition (adjust 3000ms to match your video length)
    useEffect(() => {
        if (videoState === 'gotosleep') {
            console.log('⏳ Starting gotosleep timeout fallback');
            transitionTimeout.current = setTimeout(() => {
                if (videoState === 'gotosleep' && waterLevel <= 0 && !isWalking) {
                    console.log('🔄 Force transitioning from gotosleep to sleeping (timeout)');
                    setVideoState('sleeping');
                }
            }, 3000);
        } else {
            if (transitionTimeout.current) {
                clearTimeout(transitionTimeout.current);
                transitionTimeout.current = null;
            }
        }

        return () => {
            if (transitionTimeout.current) {
                clearTimeout(transitionTimeout.current);
                transitionTimeout.current = null;
            }
        };
    }, [videoState, waterLevel, isWalking]);

    // State machine logic - refined for better transitions
    useEffect(() => {
        console.log('📹 State check:', { videoState, isWalking, waterLevel });

        if (isWalking && waterLevel > 0) {
            // Prioritize walking if energy allows
            if (videoState !== 'walk') {
                console.log('🚶 Switching to walk');
                setVideoState('walk');
            }
        } else if (waterLevel <= 0) {
            // Only sleep if out of energy (regardless of isWalking)
            if (videoState === 'walk') {
                console.log('😴 Out of water: starting gotosleep transition');
                setVideoState('gotosleep');
            } else if (videoState === 'gotosleep') {
                // Already transitioning, let it finish or timeout
                console.log('⏳ Already in gotosleep, waiting...');
            } else if (videoState === 'sleeping') {
                // Already sleeping, stay
                console.log('💤 Staying in sleeping');
            }
        } else if (!isWalking && waterLevel > 0) {
            // If not walking but has water, transition from sleeping to walk when toggled
            // This handles the case when user toggles walking on from sleeping state
            if (videoState === 'sleeping') {
                // Stay in sleeping when not walking
                console.log('💤 Not walking, staying in sleeping');
            }
        }
    }, [isWalking, waterLevel, videoState]);

    const getVideoSource = (state: 'walk' | 'gotosleep' | 'sleeping') => {
        switch (state) {
            case 'walk':
                return require('@/assets/walk.mov');
            case 'gotosleep':
                return require('@/assets/gotosleep.mov');
            case 'sleeping':
                return require('@/assets/sleeping.mov');
        }
    };

    const shouldLoop = videoState === 'walk' || videoState === 'sleeping';

    // Get initial source (sleeping state)
    const initialSource = getVideoSource('sleeping');
    
    // Create player with initial source
    const player = useVideoPlayer(initialSource, (playerInstance) => {
        playerInstance.loop = true; // Initial state is sleeping, which loops
        playerInstance.play(); // Start playback immediately
    });

    // Update player source and settings when state changes
    useEffect(() => {
        // Skip initial mount since player is already initialized
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        
        console.log('🔄 Updating video player for state:', videoState, 'shouldLoop:', shouldLoop);
        const newSource = getVideoSource(videoState);
        // Replace the video source
        player.replace(newSource);
        // Update loop setting
        player.loop = shouldLoop;
        // Ensure video is playing
        player.play();
        // Force VideoView remount by updating key to ensure clean state
        setVideoKey(prev => prev + 1);
    }, [videoState, shouldLoop, player]);

    // Listen for playToEnd event (equivalent to didJustFinish)
    useEvent(player, 'playToEnd', () => {
        console.log('📊 playToEnd fired for state:', videoState);
        if (videoState === 'gotosleep') {
            console.log('✅ gotosleep finished naturally - transitioning to sleeping');
            setVideoState('sleeping');
        }
    });

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

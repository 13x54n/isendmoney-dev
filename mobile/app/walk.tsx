import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Alert, StatusBar, Image } from 'react-native';
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
    waterLevel: 0,
    streak: 22,
    coins: 0,
    isWalking: false,
};

// Video-based Character Component
const VideoCharacter = ({ isWalking, waterLevel }: { isWalking: boolean; waterLevel: number }) => {
    const [videoState, setVideoState] = useState<'walk' | 'sleeping'>('sleeping');
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

    // Get initial source (sleeping state)
    const initialSource = getVideoSource('sleeping');

    // Create player with initial source - simplified without callback
    const player = useVideoPlayer(initialSource);

    // Initialize player settings on mount
    useEffect(() => {
        if (player) {
            player.loop = true;
            player.volume = 0;
            player.play();
        }
    }, [player]);

    // Update player source and settings when state changes
    useEffect(() => {
        // Skip initial mount since player is already initialized
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        if (!player) return;

        console.log('🔄 Updating video player for state:', videoState);
        const newSource = getVideoSource(videoState);

        // Replace the video source asynchronously to avoid UI freezes on iOS
        player.replaceAsync(newSource)
            .then(() => {
                try {
                    // Update loop setting (both videos loop)
                    player.loop = true;
                    // Muted
                    player.volume = 0;
                    // Ensure video is playing
                    player.play();
                    console.log('✅ Video replaced and playing:', videoState);
                } catch (error) {
                    console.error('Error updating video player settings:', error);
                }
            })
            .catch((error) => {
                console.error('Error replacing video source:', error);
            });
    }, [videoState, player]);

    return (
        <View style={{ width: CHAR_WIDTH, height: CHAR_HEIGHT, backgroundColor: '#60a5fa' }}>
            {player ? (
                <VideoView
                    player={player}
                    style={{ width: CHAR_WIDTH, height: CHAR_HEIGHT }}
                    contentFit="cover"
                    nativeControls={false}
                />
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff' }}>Loading video...</Text>
                </View>
            )}
        </View>
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
                {/* Energy Bar Section */}
                <View style={styles.energySection}>
                    {/* Top Row: Energy Level and Streak */}
                    <View style={styles.energyTopRow}>
                        <Text style={styles.energyLabel}>ENERGY LEVEL</Text>
                        <Text style={styles.streakText}>{state.streak}-DAY STREAK</Text>
                    </View>

                    {/* Simple Progress Bar */}
                    <View style={styles.progressBarContainer}>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: `${state.waterLevel}%` }]} />
                        </View>
                        {/* Time remaining on the right */}
                        <Text style={styles.timeDisplay}>{Math.floor(state.waterLevel / 10)}h {state.waterLevel % 10 * 6}m</Text>
                    </View>

                </View>
                <View style={styles.actionRow}>
                    <TouchableOpacity style={{ ...styles.actionButton, backgroundColor: '#c7ced8' }} onPress={refillWater}>
                        <Image
                            source={require('@/assets/images/drop.jpeg')}
                            style={styles.dropIcon}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.actionButton, backgroundColor: '#d9c1aa' }}>
                        <Image
                            source={require('@/assets/images/cart.jpeg')}
                            style={{ width: 64, height: 84, objectFit: 'contain' }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#60a5fa' },
    header: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 60, paddingHorizontal: 20, zIndex: 100 },
    backBtn: { padding: 8, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 8 },
    backText: { color: '#ffffff', fontWeight: 'bold' },
    coinBadge: { backgroundColor: 'rgba(255,255,255,0.9)', padding: 8, borderRadius: 8 },
    coinText: { fontWeight: 'bold', fontSize: 14 },
    uiPanel: {
        height: UI_PANEL_HEIGHT,
        backgroundColor: '#ffffff',
        padding: 24,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    // Energy Bar Styles
    energySection: {
        marginBottom: 24,
    },
    energyTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    energyLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#06133b',
        letterSpacing: 1,
    },
    streakText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#dd9c3b',
        letterSpacing: 1,
    },
    progressBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 8,
    },
    progressBar: {
        flex: 1,
        height: 24,
        backgroundColor: '#d7d7d7ff',
        borderRadius: 12,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#4c9fdf',
    },
    timeDisplay: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4c9fdf',
        minWidth: 80,
    },
    unlockText: {
        fontSize: 12,
        color: '#60a5fa',
        textAlign: 'center',
    },
    actionRow: { flexDirection: 'row', gap: 16 },
    actionButton: { flex: 1, backgroundColor: 'transparent', borderRadius: 14, alignItems: 'center', width: 150 },
    dropIcon: {
        width: 70,
        height: 70,
        paddingTop: 16,
    },
    btnText: { fontWeight: '600', fontSize: 14, color: '#1e293b' },
});

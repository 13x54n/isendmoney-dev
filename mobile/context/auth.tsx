import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, signInWithGoogle as googleSignIn } from '../configs/firebase';
import { useRouter, useSegments } from 'expo-router';
import { Alert } from 'react-native';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
    signInAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signIn: async () => { },
    signOut: async () => { },
    signInAsGuest: () => { },
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isGuest, setIsGuest] = useState(false);
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (!isGuest) {
                setUser(authUser);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, [isGuest]);

    useEffect(() => {
        if (loading) return;

        const inAuthGroup = segments[0] === '(tabs)';

        if (!user && !isGuest && inAuthGroup) {
            router.replace('/login');
        } else if ((user || isGuest) && segments[0] === 'login') {
            router.replace('/(tabs)');
        }
    }, [user, loading, isGuest, segments]);

    const signIn = async () => {
        try {
            await googleSignIn();
        } catch (error: any) {
            console.log('Sign in failed (expected in Expo Go):', error);
            Alert.alert(
                "Sign In Failed",
                "Google Sign-In requires a custom Development Build to access native modules. \n\nPlease use 'Guest Mode' to test the app in Expo Go."
            );
        }
    };

    const signOut = async () => {
        setIsGuest(false);
        await firebaseSignOut(auth);
    };

    const signInAsGuest = () => {
        setIsGuest(true);
        setUser({ uid: 'guest', email: 'guest@example.com' } as User); // Mock user object
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut, signInAsGuest }}>
            {children}
        </AuthContext.Provider>
    );
}

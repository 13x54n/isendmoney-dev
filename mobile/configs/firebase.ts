import { initializeApp, getApp, getApps } from 'firebase/app';
// @ts-ignore -- getReactNativePersistence is available in runtime but types might be missing in this version
import { initializeAuth, getReactNativePersistence, getAuth, GoogleAuthProvider, signInWithCredential, Auth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// TODO: Replace with your actual config
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
let app;
let auth: Auth;

if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
    });
} else {
    app = getApp();
    auth = getAuth(app);
}

export { auth };

export const signInWithGoogle = async () => {
    try {
        // Configure Google Sign-In
        GoogleSignin.configure({
            webClientId: '861573051234-lmqj4vd73cb7k4sh0qv5k6ftbtgd8jsi.apps.googleusercontent.com', // Required for Firebase
            // iosClientId is automatically read from GoogleService-Info.plist
        });

        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();

        if (userInfo.data?.idToken) {
            const { idToken } = userInfo.data;
            const credential = GoogleAuthProvider.credential(idToken);
            return signInWithCredential(auth, credential);
        } else {
            throw new Error('No ID token present!');
        }

    } catch (error: any) {
        console.error("Google Sign-In Error:", error);
        throw error;
    }
};

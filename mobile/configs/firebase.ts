import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin'; // Removed to avoid crash


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
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

export const signInWithGoogle = async () => {
    try {
        // Dynamically import to avoid crash in Expo Go/Dev Client without native module
        const { GoogleSignin } = require('@react-native-google-signin/google-signin');

        // Configure Google Sign-In
        GoogleSignin.configure({
            webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
            iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
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
        if (error.code === 'ExampleError') {
            // handle specific error
        }
        // If the module is missing (Expo Go), this will catch
        console.error("Google Sign-In Error (likely missing native module):", error);
        throw error;
    }
};

import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/context/auth';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function LoginScreen() {
    const { signIn, signInAsGuest } = useAuth();

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.logoContainer}>
                    <IconSymbol name="paperplane.fill" size={64} color={Colors.light.primary} />
                </View>
                <Text style={styles.title}>Welcome to iSendMoney</Text>
                <Text style={styles.subtitle}>Send money back home, instantly and securely.</Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.googleButton} onPress={signIn}>
                        <View style={styles.googleIconPlaceholder}>
                            {/* In a real app, use the official Google G logo */}
                            <Text style={styles.googleG}>G</Text>
                        </View>
                        <Text style={styles.googleButtonText}>Sign in with Google</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={styles.guestButton} onPress={signInAsGuest}>
                        <Text style={styles.guestButtonText}>Try Demo (Guest Mode)</Text>
                    </TouchableOpacity> */}
                </View>

                <Text style={styles.footerText}>
                    By signing in, you agree to our Terms and Privacy Policy.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
        justifyContent: 'center',
    },
    content: {
        padding: 40,
        alignItems: 'center',
    },
    logoContainer: {
        marginBottom: 32,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.light.surface,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.light.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.light.text,
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.light.icon,
        textAlign: 'center',
        marginBottom: 48,
    },
    buttonContainer: {
        width: '100%',
        gap: 16,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: Colors.light.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    googleIconPlaceholder: {
        marginRight: 12,
    },
    googleG: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4285F4',
    },
    googleButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    guestButton: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    guestButtonText: {
        color: Colors.light.primary,
        fontSize: 16,
        fontWeight: '600',
    },
    footerText: {
        marginTop: 40,
        fontSize: 12,
        color: Colors.light.icon,
        textAlign: 'center',
    },
});

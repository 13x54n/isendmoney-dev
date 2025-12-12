import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/auth';

export default function ProfileScreen() {
    const router = useRouter();
    const { signOut, user } = useAuth();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Profile</Text>
            </View>

            <View style={styles.profileHeader}>
                <View style={styles.avatarContainer}>
                    {user?.photoURL ? (
                        <Image source={{ uri: user.photoURL }} style={{ width: 80, height: 80, borderRadius: 40 }} />
                    ) : (
                        <IconSymbol name="person.fill" size={40} color={Colors.light.primary} />
                    )}
                </View>
                <Text style={styles.name}>{user?.displayName || 'Guest User'}</Text>
                <Text style={styles.email}>{user?.email || 'guest@example.com'}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Settings</Text>

                <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/settings/personal-info')}>
                    <View style={styles.menuIcon}>
                        <IconSymbol name="person.fill" size={20} color={Colors.light.text} />
                    </View>
                    <Text style={styles.menuLabel}>Personal Information</Text>
                    <IconSymbol name="chevron.right" size={20} color={Colors.light.icon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuIcon}>
                        <IconSymbol name="house.fill" size={20} color={Colors.light.text} />
                    </View>
                    <Text style={styles.menuLabel}>Payment Methods</Text>
                    <IconSymbol name="chevron.right" size={20} color={Colors.light.icon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/settings/notifications')}>
                    <View style={styles.menuIcon}>
                        <IconSymbol name="bell.fill" size={20} color={Colors.light.text} />
                    </View>
                    <Text style={styles.menuLabel}>Notifications</Text>
                    <IconSymbol name="chevron.right" size={20} color={Colors.light.icon} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
        paddingTop: 60,
    },
    header: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 40,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.light.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: Colors.light.icon,
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 40,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.surface,
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    menuIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.light.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    menuLabel: {
        flex: 1,
        fontSize: 16,
        color: Colors.light.text,
    },
    logoutButton: {
        marginHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.light.error,
        alignItems: 'center',
    },
    logoutText: {
        color: Colors.light.error,
        fontWeight: '600',
        fontSize: 16,
    },
});

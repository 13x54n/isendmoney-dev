import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Stack, useRouter } from 'expo-router';

// ... (NOTIFICATIONS array remains unchanged) ...

const NOTIFICATIONS = [
    {
        id: '1',
        title: 'Transfer Successful',
        message: 'Your transfer of CA$500.00 to Mom was successful.',
        time: '2 hours ago',
        type: 'success',
        read: false,
    },
    {
        id: '2',
        title: 'New Feature Available',
        message: 'You can now send money directly to mobile wallets in Nepal!',
        time: '1 day ago',
        type: 'info',
        read: true,
    },
    {
        id: '3',
        title: 'Rate Update',
        message: 'The exchange rate for CAD to NPR has improved. Send now to get more!',
        time: '2 days ago',
        type: 'promo',
        read: true,
    },
    {
        id: '4',
        title: 'Security Alert',
        message: 'New login detected from a new device.',
        time: '3 days ago',
        type: 'warning',
        read: true,
    },
];

export default function NotificationsScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
                </TouchableOpacity>
                <Text style={styles.titleText}>Notifications</Text>
                <View style={{ width: 40 }} />
            </View>

            <FlatList
                data={NOTIFICATIONS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TouchableOpacity style={[styles.notificationItem, !item.read && styles.unreadItem]}>
                        <View style={[styles.iconContainer,
                        item.type === 'success' ? styles.successIcon :
                            item.type === 'warning' ? styles.warningIcon :
                                styles.infoIcon
                        ]}>
                            <IconSymbol
                                name={
                                    item.type === 'success' ? 'checkmark.circle.fill' :
                                        item.type === 'warning' ? 'exclamationmark.triangle.fill' :
                                            'bell.fill'
                                }
                                size={20}
                                color="#fff"
                            />
                        </View>
                        <View style={styles.content}>
                            <View style={styles.headerRow}>
                                <Text style={[styles.title, !item.read && styles.unreadText]}>{item.title}</Text>
                                <Text style={styles.time}>{item.time}</Text>
                            </View>
                            <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                ListHeaderComponent={() => (
                    <View style={styles.listHeader}>
                        <Text style={styles.headerTitle}>Recent</Text>
                        <TouchableOpacity>
                            <Text style={styles.markReadText}>Mark all as read</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    listContent: {
        padding: 20,
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    markReadText: {
        fontSize: 14,
        color: Colors.light.primary,
        fontWeight: '600',
    },
    notificationItem: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: Colors.light.surface,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    unreadItem: {
        backgroundColor: '#F0F9FF', // Light blue tint for unread
        borderColor: Colors.light.primary,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    successIcon: {
        backgroundColor: '#10B981',
    },
    warningIcon: {
        backgroundColor: '#F59E0B',
    },
    infoIcon: {
        backgroundColor: Colors.light.primary,
    },
    content: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
        flex: 1,
        marginRight: 8,
    },
    unreadText: {
        color: Colors.light.text,
        fontWeight: 'bold',
    },
    time: {
        fontSize: 12,
        color: Colors.light.icon,
    },
    message: {
        fontSize: 14,
        color: Colors.light.text,
        lineHeight: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
    backButton: {
        padding: 4,
        marginLeft: -4,
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
});

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function ReceiptScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { id, recipient, amount, date, status } = params;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Transaction Receipt</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <IconSymbol name="checkmark.circle.fill" size={60} color={Colors.light.success} />
                </View>
                <Text style={styles.status}>{status || 'Completed'}</Text>
                <Text style={styles.amount}>{amount}</Text>

                <View style={styles.detailsContainer}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Recipient</Text>
                        <Text style={styles.detailValue}>{recipient}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Date</Text>
                        <Text style={styles.detailValue}>{date}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Transaction ID</Text>
                        <Text style={styles.detailValue}>#{id || '123456'}</Text>
                    </View>
                </View>
            </View>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 40,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    iconContainer: {
        marginBottom: 16,
    },
    status: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.light.success,
        marginBottom: 8,
    },
    amount: {
        fontSize: 36,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 40,
    },
    detailsContainer: {
        width: '100%',
        backgroundColor: Colors.light.surface,
        padding: 24,
        borderRadius: 24,
        gap: 16,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: 16,
        color: Colors.light.icon,
    },
    detailValue: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
    },
});

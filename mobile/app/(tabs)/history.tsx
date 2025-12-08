import { StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useState } from 'react';
import { useRouter } from 'expo-router';

// Dummy initial data
const INITIAL_TRANSACTIONS = [
    { id: '1', recipient: 'Arjun K.', status: 'Completed', date: 'Today, 10:23 AM', amount: '1000 NPR' },
    { id: '2', recipient: 'Sarah S.', status: 'Processing', date: 'Yesterday, 4:15 PM', amount: '500 NPR' },
    { id: '3', recipient: 'Mom', status: 'Completed', date: 'Oct 24, 2023', amount: '2000 NPR' },
    { id: '4', recipient: 'John D.', status: 'Failed', date: 'Oct 22, 2023', amount: '1500 NPR' },
    { id: '5', recipient: 'Netflix', status: 'Completed', date: 'Oct 20, 2023', amount: '1500 NPR' },
    { id: '6', recipient: 'Amazon', status: 'Completed', date: 'Oct 18, 2023', amount: '5000 NPR' },
    { id: '7', recipient: 'Dad', status: 'Processing', date: 'Oct 15, 2023', amount: '3000 NPR' },
    { id: '8', recipient: 'Spotify', status: 'Completed', date: 'Oct 12, 2023', amount: '800 NPR' },
    { id: '9', recipient: 'Utilities', status: 'Completed', date: 'Oct 10, 2023', amount: '2500 NPR' },
    { id: '10', recipient: 'Rent', status: 'Completed', date: 'Oct 01, 2023', amount: '15000 NPR' },
];

const FILTERS = ['All', 'Processing', 'Completed', 'Failed'];

export default function HistoryScreen() {
    const router = useRouter();
    const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
    const [loading, setLoading] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');

    const loadMoreData = () => {
        if (loading) return;
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            const moreData = [
                { id: Math.random().toString(), recipient: 'Previous Month', status: 'Completed', date: 'Sep 30, 2023', amount: '1500 NPR' },
                { id: Math.random().toString(), recipient: 'Old Contact', status: 'Completed', date: 'Sep 28, 2023', amount: '200 NPR' },
                { id: Math.random().toString(), recipient: 'Subscription', status: 'Failed', date: 'Sep 25, 2023', amount: '1000 NPR' },
            ];
            setTransactions([...transactions, ...moreData]);
            setLoading(false);
        }, 1500);
    };

    const handleDownload = () => {
        Alert.alert('Download', 'Downloading transaction history...');
    };

    const filteredTransactions = activeFilter === 'All'
        ? transactions
        : transactions.filter(t => t.status === activeFilter);

    const renderFooter = () => {
        if (!loading) return null;
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="small" color={Colors.light.primary} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.title}>History</Text>
                    <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
                        <IconSymbol name="arrow.down.circle" size={24} color={Colors.light.primary} />
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
                    {FILTERS.map((filter) => (
                        <TouchableOpacity
                            key={filter}
                            style={[
                                styles.filterChip,
                                activeFilter === filter && styles.filterChipActive,
                            ]}
                            onPress={() => setActiveFilter(filter)}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    activeFilter === filter && styles.filterTextActive,
                                ]}
                            >
                                {filter}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={filteredTransactions}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.transactionItem}
                        onPress={() => router.push({
                            pathname: '/receipt',
                            params: {
                                id: item.id,
                                recipient: item.recipient,
                                status: item.status,
                                date: item.date,
                                amount: item.amount
                            }
                        })}
                    >
                        <View style={[styles.transactionIcon, { backgroundColor: item.status === 'Completed' ? '#dcfce7' : item.status === 'Processing' ? '#fef9c3' : '#fee2e2' }]}>
                            <IconSymbol
                                name={item.status === 'Completed' ? 'checkmark' : item.status === 'Processing' ? 'clock.fill' : 'xmark'}
                                size={20}
                                color={item.status === 'Completed' ? '#16a34a' : item.status === 'Processing' ? '#ca8a04' : '#dc2626'}
                            />
                        </View>
                        <View style={styles.transactionDetails}>
                            <Text style={styles.transactionStatus}>{item.status}</Text>
                            <Text style={styles.transactionName}>{item.recipient}</Text>
                            <Text style={styles.transactionDate}>{item.date}</Text>
                        </View>
                        <Text style={styles.transactionAmount}>{item.amount}</Text>
                    </TouchableOpacity>
                )}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
            />
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
        marginBottom: 10,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    downloadButton: {
        padding: 4,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    filterContainer: {
        paddingHorizontal: 20,
        gap: 12,
        paddingBottom: 4,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: Colors.light.surface,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    filterChipActive: {
        backgroundColor: Colors.light.primary,
        borderColor: Colors.light.primary,
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.text,
    },
    filterTextActive: {
        color: '#fff',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 10,
    },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.surface,
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    transactionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    transactionDetails: {
        flex: 1,
    },
    transactionStatus: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.light.primary, // Or dynamic color based on status
        marginBottom: 2,
    },
    transactionName: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 4,
    },
    transactionDate: {
        fontSize: 12,
        color: Colors.light.icon,
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    loader: {
        paddingVertical: 20,
        alignItems: 'center',
    },
});

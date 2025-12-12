import { StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/auth';

// Dummy initial data
// Initial data - empty for dynamic fetching
const INITIAL_TRANSACTIONS: any[] = [];

const FILTERS = ['All', 'Processing', 'Completed', 'Failed'];

export default function HistoryScreen() {
    const router = useRouter();
    const { user } = useAuth();
    const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
    const [loading, setLoading] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');

    // Fetch transactions on mount
    useEffect(() => {
        if (!user) return;
        const fetchTransactions = async () => {
            try {
                const res = await fetch(`${process.env.EXPO_PUBLIC_USER_PAYMENTS_API_URL}/api/transactions/${user.uid}`);
                if (res.ok) {
                    const data = await res.json();
                    // Map backend data to frontend structure if needed
                    const mapped = data.map((t: any) => ({
                        id: t._id,
                        recipient: t.recipientName,
                        status: t.status, // Ensure case matches (capitalize?)
                        date: new Date(t.date).toLocaleString(),
                        amount: `${t.amount} ${t.currency || 'NPR'}`
                    }));
                    setTransactions(mapped);
                }
            } catch (e) { console.error(e); }
        };
        fetchTransactions();
    }, [user]);

    const loadMoreData = () => {
        // Pagination not implemented yet
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
                ListFooterComponent={renderFooter}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <View style={styles.emptyIcon}>
                            <IconSymbol name="clock.arrow.circlepath" size={48} color={Colors.light.icon} />
                        </View>
                        <Text style={styles.emptyTitle}>No transactions yet</Text>
                        <Text style={styles.emptyText}>Start sending money to see your history here.</Text>
                        <TouchableOpacity style={styles.startBtn} onPress={() => router.push('/(tabs)/send')}>
                            <Text style={styles.startBtnText}>Start Transfer</Text>
                        </TouchableOpacity>
                    </View>
                }
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
    emptyContainer: {
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 40,
    },
    emptyIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.light.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 14,
        color: Colors.light.icon,
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 20,
    },
    startBtn: {
        backgroundColor: Colors.light.primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 24,
    },
    startBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

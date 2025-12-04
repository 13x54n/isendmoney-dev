import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';

const TRANSACTIONS = [
    { id: '1', name: 'Sarah Smith', date: 'Today, 10:30 AM', amount: '-$150.00', type: 'sent' },
    { id: '2', name: 'John Doe', date: 'Yesterday, 4:15 PM', amount: '+$500.00', type: 'received' },
    { id: '3', name: 'Netflix', date: 'Oct 24, 2023', amount: '-$15.99', type: 'sent' },
    { id: '4', name: 'Amazon', date: 'Oct 22, 2023', amount: '-$45.50', type: 'sent' },
    { id: '5', name: 'Salary', date: 'Oct 20, 2023', amount: '+$3,200.00', type: 'received' },
];

export default function HistoryScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>History</Text>
            </View>

            <FlatList
                data={TRANSACTIONS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.transactionItem}>
                        <View style={[styles.transactionIcon, { backgroundColor: item.type === 'sent' ? 'rgba(37, 99, 235, 0.1)' : 'rgba(16, 185, 129, 0.1)' }]}>
                            <IconSymbol
                                name={item.type === 'sent' ? 'paperplane.fill' : 'house.fill'}
                                size={20}
                                color={item.type === 'sent' ? Colors.light.primary : Colors.light.success}
                            />
                        </View>
                        <View style={styles.transactionDetails}>
                            <Text style={styles.transactionName}>{item.name}</Text>
                            <Text style={styles.transactionDate}>{item.date}</Text>
                        </View>
                        <Text style={[styles.transactionAmount, { color: item.type === 'sent' ? Colors.light.text : Colors.light.success }]}>
                            {item.amount}
                        </Text>
                    </TouchableOpacity>
                )}
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
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
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
    },
});

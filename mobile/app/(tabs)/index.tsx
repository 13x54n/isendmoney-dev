import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';

const ACCOUNTS = [
  { id: '1', currency: 'USD', balance: '12,450.00', flag: '🇺🇸' },
  { id: '2', currency: 'EUR', balance: '4,200.50', flag: '🇪🇺' },
  { id: '3', currency: 'GBP', balance: '1,100.00', flag: '🇬🇧' },
];

export default function HomeScreen() {
  const router = useRouter();

  const renderAccountCard = ({ item }: { item: typeof ACCOUNTS[0] }) => (
    <View style={styles.accountCard}>
      <View style={styles.accountHeader}>
        <View style={styles.flagContainer}>
          <Text style={styles.flag}>{item.flag}</Text>
        </View>
        <Text style={styles.currencyCode}>{item.currency}</Text>
      </View>
      <Text style={styles.accountBalance}>{item.balance}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileInitials}>AJ</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerActionButton}>
            <IconSymbol name="bell.fill" size={24} color={Colors.light.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.accountsSection}>
          <FlatList
            data={ACCOUNTS}
            renderItem={renderAccountCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.accountsList}
            snapToInterval={160}
            decelerationRate="fast"
          />
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/(tabs)/send')}>
            <View style={[styles.actionIcon, { backgroundColor: Colors.light.primary }]}>
              <IconSymbol name="paperplane.fill" size={24} color={Colors.light.onPrimary} />
            </View>
            <Text style={styles.actionLabel}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <IconSymbol name="plus" size={24} color={Colors.light.primary} />
            </View>
            <Text style={styles.actionLabel}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <IconSymbol name="arrow.down.left" size={24} color={Colors.light.primary} />
            </View>
            <Text style={styles.actionLabel}>Request</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Transactions</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/history')}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          {[1, 2, 3, 4].map((item) => (
            <View key={item} style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                <IconSymbol name="bag.fill" size={20} color={Colors.light.text} />
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionName}>Apple Store</Text>
                <Text style={styles.transactionDate}>Today</Text>
              </View>
              <Text style={styles.transactionAmount}>-$1,299.00</Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  profileButton: {
    padding: 4,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  headerActionButton: {
    padding: 8,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  accountsSection: {
    marginBottom: 32,
  },
  accountsList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  accountCard: {
    width: 150,
    height: 150,
    backgroundColor: Colors.light.surface,
    borderRadius: 24,
    padding: 20,
    justifyContent: 'space-between',
  },
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  flagContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  flag: {
    fontSize: 18,
  },
  currencyCode: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  accountBalance: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    marginBottom: 40,
  },
  actionButton: {
    alignItems: 'center',
    gap: 8,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.light.surface, // Default to primary, overridden for secondary actions
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  seeAll: {
    color: Colors.light.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
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
    fontSize: 14,
    color: Colors.light.icon,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
});

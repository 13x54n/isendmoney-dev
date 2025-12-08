import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';

const RECENT_CONTACTS = [
  { id: '1', name: 'Mom', initials: 'M' },
  { id: '2', name: 'John', initials: 'JD' },
  { id: '3', name: 'Sarah', initials: 'SS' },
  { id: '4', name: 'Mike', initials: 'MJ' },
  { id: '5', name: 'Anna', initials: 'AL' },
];

const TRANSACTIONS: { id: string; recipient: string; status: string; date: string; amount: string; }[] = [
  // { id: '1', recipient: 'Arjun K.', status: 'Completed', date: 'Today, 10:23 AM', amount: '1000 NPR' },
  // { id: '2', recipient: 'Sarah S.', status: 'Processing', date: 'Yesterday, 4:15 PM', amount: '500 NPR' },
  // { id: '3', recipient: 'Mom', status: 'Completed', date: 'Oct 24, 2023', amount: '2000 NPR' },
  // { id: '4', recipient: 'John D.', status: 'Failed', date: 'Oct 22, 2023', amount: '1500 NPR' },
];

export default function HomeScreen() {
  const router = useRouter();

  const renderRecentContact = ({ item }: { item: typeof RECENT_CONTACTS[0] }) => (
    <TouchableOpacity style={styles.contactItem} onPress={() => router.push({ pathname: '/(tabs)/send', params: { recipient: item.id } })}>
      <View style={styles.contactAvatar}>
        <Text style={styles.contactInitials}>{item.initials}</Text>
      </View>
      <Text style={styles.contactName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileButton} onPress={() => router.push('/walk')}>
          <View style={[styles.profileIcon, styles.glowEffect]}>
            <IconSymbol name="figure.walk" size={24} color="#fff" />
          </View>
        </TouchableOpacity>

        <View style={styles.rateContainer}>
          <View style={styles.rateLabelContainer}>
            <View style={styles.liveIndicator} />
            <Text style={styles.rateLabel}>Best Rate</Text>
          </View>
          <Text style={styles.rateValue}>1 CAD = 98.45 NPR</Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerActionButton} onPress={() => router.push('/notifications')}>
            <IconSymbol name="bell.fill" size={24} color={Colors.light.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.quickSendSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Send</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/history')}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={RECENT_CONTACTS}
            renderItem={renderRecentContact}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contactsList}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Transactions</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/history')}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          {TRANSACTIONS.length > 0 ? (
            TRANSACTIONS.map((item) => (
              <TouchableOpacity
                key={item.id}
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
            ))
          ) : (
            <View style={styles.emptyStateContainer}>
              <View style={styles.emptyStateIcon}>
                <IconSymbol name="heart.fill" size={32} color={Colors.light.primary} />
              </View>
              <Text style={styles.emptyStateText}>Send money back home to your loved ones</Text>
              <TouchableOpacity style={styles.startTransferButton} onPress={() => router.push('/(tabs)/send')}>
                <Text style={styles.startTransferText}>Start Transfer</Text>
              </TouchableOpacity>
            </View>
          )}
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
  quickSendSection: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  contactsList: {
    gap: 20,
    paddingTop: 16,
  },
  contactItem: {
    alignItems: 'center',
    gap: 8,
  },
  contactAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.light.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  contactInitials: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.primary,
  },
  contactName: {
    fontSize: 14,
    color: Colors.light.text,
    fontWeight: '500',
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
  transactionStatus: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.primary, // Or dynamic color based on status
    marginBottom: 2,
  },
  rateContainer: {
    alignItems: 'center',
  },
  rateLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
    backgroundColor: 'rgba(22, 163, 74, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  liveIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16a34a',
  },
  rateLabel: {
    fontSize: 12,
    color: '#16a34a',
    fontWeight: '600',
  },
  rateValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  emptyStateContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: Colors.light.surface,
    borderRadius: 24,
    paddingHorizontal: 24,
  },
  emptyStateIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(22, 163, 74, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  startTransferButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  startTransferText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  glowEffect: {
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
    backgroundColor: '#16a34a',
    borderWidth: 2,
    borderColor: '#4ade80',
  },
});

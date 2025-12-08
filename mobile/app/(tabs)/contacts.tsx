import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useState } from 'react';
import { useRouter } from 'expo-router';

type ContactType = 'bank' | 'mobile_money';

interface Contact {
    id: string;
    name: string;
    initials: string;
    type: ContactType;
    // Bank specific - optional but present if type is 'bank'
    bankName?: string;
    accountNumber?: string;
    // Mobile Money specific - optional but present if type is 'mobile_money'
    provider?: string;
    phoneNumber?: string;
}

// Dummy contacts data
const CONTACTS: Contact[] = [
    {
        id: '1',
        name: 'Mom',
        initials: 'M',
        type: 'mobile_money',
        provider: 'M-Pesa',
        phoneNumber: '+254 712 345 678'
    },
    {
        id: '2',
        name: 'John Doe',
        initials: 'JD',
        type: 'bank',
        bankName: 'Equity Bank',
        accountNumber: '1234567890'
    },
    {
        id: '3',
        name: 'Sarah Smith',
        initials: 'SS',
        type: 'mobile_money',
        provider: 'MTN Mobile Money',
        phoneNumber: '+256 772 123 456'
    },
    {
        id: '4',
        name: 'Mike Johnson',
        initials: 'MJ',
        type: 'bank',
        bankName: 'KCB Bank',
        accountNumber: '0987654321'
    },
    {
        id: '5',
        name: 'Anna Lee',
        initials: 'AL',
        type: 'mobile_money',
        provider: 'Airtel Money',
        phoneNumber: '+254 733 444 555'
    },
    {
        id: '6',
        name: 'David Brown',
        initials: 'DB',
        type: 'bank',
        bankName: 'Co-operative Bank',
        accountNumber: '1122334455'
    },
    {
        id: '7',
        name: 'Emily Davis',
        initials: 'ED',
        type: 'mobile_money',
        provider: 'M-Pesa',
        phoneNumber: '+254 700 111 222'
    },
];

export default function ContactsScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredContacts = CONTACTS.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (contact.bankName && contact.bankName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (contact.provider && contact.provider.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const renderContactDetails = (contact: Contact) => {
        if (contact.type === 'bank') {
            return (
                <View style={styles.detailRow}>
                    <IconSymbol name="building.columns.fill" size={14} color={Colors.light.icon} style={styles.detailIcon} />
                    <Text style={styles.contactDetailText}>
                        {contact.bankName} • •••• {contact.accountNumber?.slice(-4)}
                    </Text>
                </View>
            );
        } else {
            return (
                <View style={styles.detailRow}>
                    <IconSymbol name="iphone" size={14} color={Colors.light.icon} style={styles.detailIcon} />
                    <Text style={styles.contactDetailText}>
                        {contact.provider} • {contact.phoneNumber}
                    </Text>
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Contacts</Text>
                <TouchableOpacity style={styles.addButton}>
                    <IconSymbol name="plus" size={24} color={Colors.light.primary} />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <IconSymbol name="magnifyingglass" size={20} color={Colors.light.icon} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search name, bank, or provider..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor={Colors.light.icon}
                />
            </View>

            <FlatList
                data={filteredContacts}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.contactItem}
                        onPress={() => router.push({ pathname: '/(tabs)/send', params: { recipient: item.id } })}
                    >
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{item.initials}</Text>
                        </View>
                        <View style={styles.contactInfo}>
                            <Text style={styles.contactName}>{item.name}</Text>
                            {renderContactDetails(item)}
                        </View>
                        <IconSymbol name="chevron.right" size={20} color={Colors.light.icon} />
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    addButton: {
        padding: 8,
        backgroundColor: Colors.light.surface,
        borderRadius: 12,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.surface,
        marginHorizontal: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
        marginBottom: 20,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: Colors.light.text,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 100, // Space for bottom tab bar
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.light.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    avatarText: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.light.primary,
    },
    contactInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    contactName: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 4,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailIcon: {
        marginRight: 6,
    },
    contactDetailText: {
        fontSize: 14,
        color: Colors.light.icon,
    },
});

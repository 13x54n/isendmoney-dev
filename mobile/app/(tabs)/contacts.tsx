import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useState, useCallback } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import { useAuth } from '@/context/auth';

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
// Dummy contacts removed for dynamic fetching
const CONTACTS: Contact[] = [];

export default function ContactsScreen() {
    const router = useRouter();
    const { user } = useAuth();
    const [dbContacts, setDbContacts] = useState<Contact[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useFocusEffect(
        useCallback(() => {
            if (!user) return;
            const fetchContacts = async () => {
                try {
                    const res = await fetch(`${process.env.EXPO_PUBLIC_USER_PAYMENTS_API_URL}/api/users/${user.uid}/contacts`);
                    if (res.ok) {
                        const data = await res.json();
                        const mapped = data.map((c: any) => ({
                            id: c._id,
                            name: c.name,
                            initials: c.initials,
                            type: c.type,
                            bankName: c.bankName,
                            accountNumber: c.accountNumber,
                            provider: c.provider,
                            phoneNumber: c.phoneNumber
                        }));
                        setDbContacts(mapped);
                    }
                } catch (e) { console.error(e); }
            };
            fetchContacts();
        }, [user])
    );

    // Use only DB contacts
    const filteredContacts = dbContacts.filter(contact =>
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
                <TouchableOpacity style={styles.addButton} onPress={() => router.push('/add-contact')}>
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
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <View style={styles.emptyIcon}>
                            <IconSymbol name="person.2.fill" size={48} color={Colors.light.icon} />
                        </View>
                        <Text style={styles.emptyTitle}>No contacts found</Text>
                        <Text style={styles.emptyText}>Add your family and friends to send money easily.</Text>
                        <TouchableOpacity style={styles.addButtonEmpty} onPress={() => router.push('/add-contact')}>
                            <IconSymbol name="plus" size={20} color="#fff" style={{ marginRight: 8 }} />
                            <Text style={styles.addButtonText}>Add Contact</Text>
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
    addButtonEmpty: {
        flexDirection: 'row',
        backgroundColor: Colors.light.primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 24,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Colors } from '@/constants/theme';
import { useState, useCallback } from 'react';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import { useAuth } from '@/context/auth';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function SendScreen() {
    const router = useRouter();
    const { user } = useAuth();
    const params = useLocalSearchParams();

    const [sendAmount, setSendAmount] = useState('1000');
    const [isCadToNpr, setIsCadToNpr] = useState(true);
    const [liveRate, setLiveRate] = useState<number | null>(null);
    const [contacts, setContacts] = useState<any[]>([]);
    const [selectedRecipient, setSelectedRecipient] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            if (!user) return;
            const fetchData = async () => {
                try {
                    // Fetch Rate (can stay once, but harmless to refresh)
                    const rateRes = await fetch(`${process.env.EXPO_PUBLIC_RATE_MICROSERVICE_URL}/api/rate`);
                    const rateData = await rateRes.json();
                    if (rateData.rate) setLiveRate(rateData.rate);

                    // Fetch Contacts
                    const contactsRes = await fetch(`${process.env.EXPO_PUBLIC_USER_PAYMENTS_API_URL}/api/users/${user.uid}/contacts`);
                    if (contactsRes.ok) {
                        const contactsData = await contactsRes.json();
                        setContacts(contactsData);

                        // Handle route param (Auto-select if passed)
                        if (params.recipient) {
                            const rec = contactsData.find((c: any) => c._id === params.recipient || c.id === params.recipient);
                            if (rec) setSelectedRecipient(rec);
                        }
                    }
                } catch (e) { console.error(e); }
            };
            fetchData();
        }, [user, params.recipient])
    );

    // Fallback if loading
    const currentRate = liveRate || 98.45;
    const exchangeRate = isCadToNpr ? currentRate : (1 / currentRate);

    const amountToConvert = parseFloat(sendAmount.replace(/,/g, '')) || 0;

    // Fee is 0.5% of total CAD
    const fee = isCadToNpr ? (amountToConvert * 0.005) : 0;

    // Calculate receive amount
    // Logic: (Send Amount - Fee) * Rate
    const receiveAmount = ((amountToConvert - fee) * exchangeRate).toFixed(2);

    const toggleDirection = () => {
        setIsCadToNpr(!isCadToNpr);
    };

    const handleSend = async () => {
        if (!selectedRecipient || !user) return;

        setLoading(true);
        try {
            const payload = {
                userId: user.uid,
                recipientName: selectedRecipient.name,
                amount: parseFloat(receiveAmount), // Store what recipient gets? Or send amount? Usually Source/Dest. Let's store recipient amount for now or add both to schema later. Model has strict 'amount'.
                status: 'processing',
                currency: isCadToNpr ? 'NPR' : 'CAD'
            };

            const res = await fetch(`${process.env.EXPO_PUBLIC_USER_PAYMENTS_API_URL}/api/transactions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                Alert.alert('Success', 'Transfer initiated successfully!', [
                    { text: 'OK', onPress: () => router.push('/(tabs)/history') }
                ]);
            } else {
                Alert.alert('Error', 'Failed to initiate transfer');
            }
        } catch (e) {
            console.error(e);
            Alert.alert('Error', 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.calculatorCard}>
                    {/* You Send Section */}
                    <View style={styles.inputSection}>
                        <View style={styles.inputLabelRow}>
                            <Text style={styles.inputLabel}>You send</Text>
                        </View>
                        <View style={styles.inputRow}>
                            <TextInput
                                style={styles.amountInput}
                                value={sendAmount}
                                onChangeText={setSendAmount}
                                keyboardType="numeric"
                                placeholderTextColor={Colors.light.icon}
                            />
                            <View style={styles.currencyContainer}>
                                <View style={styles.flagContainer}>
                                    <Text style={styles.flag}>{isCadToNpr ? '🇨🇦' : '🇳🇵'}</Text>
                                </View>
                                <Text style={styles.currencyCode}>{isCadToNpr ? 'CAD' : 'NPR'}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Swap Button / Divider */}
                    <View style={styles.swapContainer}>
                        <View style={styles.divider} />
                        <TouchableOpacity style={styles.swapButton} onPress={toggleDirection}>
                            <IconSymbol name="arrow.up.arrow.down" size={20} color={Colors.light.primary} />
                        </TouchableOpacity>
                        <View style={styles.divider} />
                    </View>


                    {/* Recipient Gets Section */}
                    <View style={[styles.inputSection, styles.recipientSection]}>
                        <View style={styles.inputLabelRow}>
                            <Text style={styles.inputLabel}>Recipient gets</Text>
                        </View>
                        <View style={styles.inputRow}>
                            <TextInput
                                style={styles.amountInput}
                                value={receiveAmount}
                                editable={false}
                                placeholderTextColor={Colors.light.icon}
                            />
                            <View style={styles.currencyContainer}>
                                <View style={styles.flagContainer}>
                                    <Text style={styles.flag}>{isCadToNpr ? '🇳🇵' : '🇨🇦'}</Text>
                                </View>
                                <Text style={styles.currencyCode}>{isCadToNpr ? 'NPR' : 'CAD'}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Breakdown Section */}
                    <View style={styles.breakdownSection}>
                        <View style={styles.breakdownLine}>
                            <View style={styles.breakdownIcon}>
                                <IconSymbol name="minus" size={12} color={Colors.light.icon} />
                            </View>
                            <Text style={styles.breakdownText}>{fee.toFixed(2)} {isCadToNpr ? 'CAD' : 'NPR'} fee (0.5%)</Text>
                        </View>
                        <View style={styles.breakdownLine}>
                            <View style={styles.breakdownIcon}>
                                <IconSymbol name="equal" size={12} color={Colors.light.icon} />
                            </View>
                            <Text style={styles.breakdownText}>{(amountToConvert - fee).toFixed(2)} {isCadToNpr ? 'CAD' : 'NPR'} converted</Text>
                        </View>
                        <View style={styles.breakdownLine}>
                            <View style={styles.breakdownIcon}>
                                <IconSymbol name="multiply" size={12} color={Colors.light.icon} />
                            </View>
                            <Text style={styles.breakdownText}>{exchangeRate.toFixed(4)} Guaranteed rate</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.recipientContainer}>
                    <Text style={styles.sectionTitle}>Recipient</Text>

                    {selectedRecipient ? (
                        <View style={styles.selectedRecipientCard}>
                            <View style={styles.selectedRecipientInfo}>
                                <View style={styles.avatar}>
                                    <Text style={styles.avatarText}>{selectedRecipient.initials}</Text>
                                </View>
                                <View>
                                    <Text style={styles.recipientName}>{selectedRecipient.name}</Text>
                                    <Text style={styles.recipientDetail}>
                                        {selectedRecipient.type === 'bank'
                                            ? `${selectedRecipient.bankName} • ${selectedRecipient.accountNumber?.slice(-4)}`
                                            : `${selectedRecipient.provider} • ${selectedRecipient.phoneNumber}`
                                        }
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => setSelectedRecipient(null)}>
                                <Text style={styles.changeText}>Change</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.contactsScroll}>
                                <TouchableOpacity style={styles.addRecipientCard} onPress={() => router.push('/add-contact?returnTo=/send')}>
                                    <View style={styles.addIconCircle}>
                                        <IconSymbol name="plus" size={24} color={Colors.light.primary} />
                                    </View>
                                    <Text style={styles.addCardText}>New</Text>
                                </TouchableOpacity>

                                {contacts.map((contact: any) => (
                                    <TouchableOpacity
                                        key={contact._id || contact.id}
                                        style={styles.contactCard}
                                        onPress={() => setSelectedRecipient(contact)}
                                    >
                                        <View style={styles.contactCardAvatar}>
                                            <Text style={styles.contactCardInitials}>{contact.initials}</Text>
                                        </View>
                                        <Text style={styles.contactCardName} numberOfLines={1}>{contact.name.split(' ')[0]}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.continueButton, (!selectedRecipient || loading) && styles.continueButtonDisabled]}
                    onPress={handleSend}
                    disabled={!selectedRecipient || loading}
                >
                    <Text style={styles.continueButtonText}>{loading ? 'Processing...' : 'Continue'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    content: {
        padding: 20,
        paddingTop: 60,
    },
    calculatorCard: {
        backgroundColor: Colors.light.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 32,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    inputSection: {
        marginBottom: 0,
    },
    recipientSection: {
        marginTop: 0,
    },
    inputLabelRow: {
        marginBottom: 8,
    },
    inputLabel: {
        fontSize: 14,
        color: Colors.light.icon,
        fontWeight: '500',
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    amountInput: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.light.text,
        flex: 1,
    },
    currencyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.background,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 24,
        gap: 8,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    flagContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flag: {
        fontSize: 14,
    },
    currencyCode: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    swapContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.light.border,
    },
    swapButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.light.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.light.primary,
        marginHorizontal: 16,
    },
    breakdownSection: {
        paddingVertical: 16,
        paddingLeft: 16,
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: Colors.light.border,
        marginTop: 16,
    },
    breakdownLine: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    breakdownIcon: {
        width: 24,
        alignItems: 'center',
    },
    breakdownText: {
        fontSize: 14,
        color: Colors.light.icon,
        fontWeight: '500',
    },
    recipientContainer: {
        gap: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    addRecipientButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    addRecipientIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.light.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.light.primary,
    },
    addRecipientText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.primary,
    },
    footer: {
        padding: 20,
        paddingBottom: 40,
        borderTopWidth: 1,
        borderTopColor: Colors.light.border,
        backgroundColor: Colors.light.background,
    },
    continueButton: {
        backgroundColor: Colors.light.primary,
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
    },
    continueButtonDisabled: {
        backgroundColor: Colors.light.icon,
        opacity: 0.5,
    },
    continueButtonText: {
        color: Colors.light.onPrimary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    // Recipient Styles
    selectedRecipientCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.light.surface,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.light.primary,
    },
    selectedRecipientInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.light.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    avatarText: {
        fontWeight: 'bold',
        color: Colors.light.primary,
    },
    recipientName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    recipientDetail: {
        fontSize: 12,
        color: Colors.light.icon,
    },
    changeText: {
        color: Colors.light.primary,
        fontWeight: '600',
    },
    contactsScroll: {
        flexDirection: 'row',
        gap: 12,
    },
    addRecipientCard: {
        width: 80,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.light.border,
        borderStyle: 'dashed',
        marginRight: 12,
    },
    addIconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(22, 163, 74, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    addCardText: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.light.primary,
    },
    contactCard: {
        width: 80,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.light.border,
        marginRight: 12,
    },
    contactCardAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.light.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    contactCardInitials: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    contactCardName: {
        fontSize: 12,
        fontWeight: '500',
        color: Colors.light.text,
        textAlign: 'center',
    },
});

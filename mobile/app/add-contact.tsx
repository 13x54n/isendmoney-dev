import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuth } from '@/context/auth';

type ContactType = 'mobile_money' | 'bank';

export default function AddContactScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [type, setType] = useState<ContactType>('mobile_money');

    // Bank fields
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');

    // Mobile Money fields
    const [provider, setProvider] = useState('');

    const handleSave = async () => {
        if (!user) return;
        if (!name || !phoneNumber) {
            Alert.alert('Error', 'Please fill in required fields');
            return;
        }

        setLoading(true);
        try {
            const payload: any = {
                name,
                initials: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
                phoneNumber,
                type,
                // Add conditional fields
                ...(type === 'bank' ? { bankName, accountNumber } : { provider })
            };

            const res = await fetch(`${process.env.EXPO_PUBLIC_USER_PAYMENTS_API_URL}/api/users/${user.uid}/contacts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const updatedContacts = await res.json();
                Alert.alert('Success', 'Contact saved!');

                // Smart Navigation
                if (params.returnTo) {
                    // Assuming the new contact is the last one (backend pushes)
                    const newContact = updatedContacts[updatedContacts.length - 1];
                    router.push({
                        pathname: params.returnTo as any,
                        params: { recipient: newContact._id }
                    });
                } else {
                    router.back();
                }
            } else {
                Alert.alert('Error', 'Failed to save contact');
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
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
                </TouchableOpacity>
                <Text style={styles.title}>New Contact</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Type Selection */}
                <View style={styles.typeContainer}>
                    <TouchableOpacity
                        style={[styles.typeButton, type === 'mobile_money' && styles.typeButtonActive]}
                        onPress={() => setType('mobile_money')}
                    >
                        <IconSymbol name="iphone" size={20} color={type === 'mobile_money' ? '#fff' : Colors.light.text} />
                        <Text style={[styles.typeText, type === 'mobile_money' && styles.typeTextActive]}>Mobile Money</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.typeButton, type === 'bank' && styles.typeButtonActive]}
                        onPress={() => setType('bank')}
                    >
                        <IconSymbol name="building.columns.fill" size={20} color={type === 'bank' ? '#fff' : Colors.light.text} />
                        <Text style={[styles.typeText, type === 'bank' && styles.typeTextActive]}>Bank Transfer</Text>
                    </TouchableOpacity>
                </View>

                {/* Common Fields */}
                <View style={styles.section}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. John Doe"
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor={Colors.light.icon}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. +1 234 567 8900"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                        placeholderTextColor={Colors.light.icon}
                    />
                </View>

                {/* Conditional Fields */}
                {type === 'mobile_money' ? (
                    <View style={styles.section}>
                        <Text style={styles.label}>Provider Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. M-Pesa, Airtel Money"
                            value={provider}
                            onChangeText={setProvider}
                            placeholderTextColor={Colors.light.icon}
                        />
                    </View>
                ) : (
                    <>
                        <View style={styles.section}>
                            <Text style={styles.label}>Bank Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. TD Bank"
                                value={bankName}
                                onChangeText={setBankName}
                                placeholderTextColor={Colors.light.icon}
                            />
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.label}>Account Number</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter account number"
                                value={accountNumber}
                                onChangeText={setAccountNumber}
                                keyboardType="number-pad"
                                placeholderTextColor={Colors.light.icon}
                            />
                        </View>
                    </>
                )}
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.saveButtonText}>Save Contact</Text>
                    )}
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
        backgroundColor: Colors.light.background,
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    content: {
        padding: 20,
    },
    typeContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.light.surface,
        padding: 4,
        borderRadius: 12,
        marginBottom: 24,
    },
    typeButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 8,
        gap: 8,
    },
    typeButtonActive: {
        backgroundColor: Colors.light.primary,
    },
    typeText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.text,
    },
    typeTextActive: {
        color: '#fff',
    },
    section: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.light.text,
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        backgroundColor: Colors.light.surface,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: Colors.light.text,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    footer: {
        padding: 20,
        paddingBottom: 40,
        borderTopWidth: 1,
        borderTopColor: Colors.light.border,
        backgroundColor: Colors.light.background,
    },
    saveButton: {
        backgroundColor: Colors.light.primary,
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

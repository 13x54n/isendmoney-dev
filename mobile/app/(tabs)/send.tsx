import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useState } from 'react';

export default function SendScreen() {
    const [sendAmount, setSendAmount] = useState('1000');
    const [isCadToNpr, setIsCadToNpr] = useState(true);

    const exchangeRate = isCadToNpr ? 98.45 : 0.0101; // Example rates
    const fee = isCadToNpr ? 4.14 : 0.00; // Example fee

    // Calculate receive amount
    // Logic: (Send Amount - Fee) * Rate
    // Simplified for demo
    const amountToConvert = parseFloat(sendAmount.replace(/,/g, '')) || 0;
    const receiveAmount = ((amountToConvert - fee) * exchangeRate).toFixed(2);

    const toggleDirection = () => {
        setIsCadToNpr(!isCadToNpr);
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
                            <Text style={styles.breakdownText}>{fee.toFixed(2)} {isCadToNpr ? 'CAD' : 'NPR'} fee</Text>
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
                    <TouchableOpacity style={styles.addRecipientButton}>
                        <View style={styles.addRecipientIcon}>
                            <IconSymbol name="plus" size={24} color={Colors.light.primary} />
                        </View>
                        <Text style={styles.addRecipientText}>Add a recipient</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.continueButton}>
                    <Text style={styles.continueButtonText}>Continue</Text>
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
    continueButtonText: {
        color: Colors.light.onPrimary,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

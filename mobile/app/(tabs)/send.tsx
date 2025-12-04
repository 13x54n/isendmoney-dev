import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function SendScreen() {
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
                                value="1,000"
                                keyboardType="numeric"
                                placeholderTextColor={Colors.light.icon}
                            />
                            <TouchableOpacity style={styles.currencySelector}>
                                <View style={styles.flagContainer}>
                                    <Text style={styles.flag}>🇺🇸</Text>
                                </View>
                                <Text style={styles.currencyCode}>USD</Text>
                                <IconSymbol name="chevron.down" size={16} color={Colors.light.text} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Breakdown Section */}
                    <View style={styles.breakdownSection}>
                        <View style={styles.breakdownLine}>
                            <View style={styles.breakdownIcon}>
                                <IconSymbol name="minus" size={12} color={Colors.light.icon} />
                            </View>
                            <Text style={styles.breakdownText}>4.14 USD fee</Text>
                        </View>
                        <View style={styles.breakdownLine}>
                            <View style={styles.breakdownIcon}>
                                <IconSymbol name="equal" size={12} color={Colors.light.icon} />
                            </View>
                            <Text style={styles.breakdownText}>995.86 USD converted</Text>
                        </View>
                        <View style={styles.breakdownLine}>
                            <View style={styles.breakdownIcon}>
                                <IconSymbol name="multiply" size={12} color={Colors.light.icon} />
                            </View>
                            <Text style={styles.breakdownText}>0.9205 Guaranteed rate</Text>
                        </View>
                    </View>

                    {/* Recipient Gets Section */}
                    <View style={[styles.inputSection, styles.recipientSection]}>
                        <View style={styles.inputLabelRow}>
                            <Text style={styles.inputLabel}>Recipient gets</Text>
                        </View>
                        <View style={styles.inputRow}>
                            <TextInput
                                style={styles.amountInput}
                                value="916.69"
                                editable={false}
                                placeholderTextColor={Colors.light.icon}
                            />
                            <TouchableOpacity style={styles.currencySelector}>
                                <View style={styles.flagContainer}>
                                    <Text style={styles.flag}>🇪🇺</Text>
                                </View>
                                <Text style={styles.currencyCode}>EUR</Text>
                                <IconSymbol name="chevron.down" size={16} color={Colors.light.text} />
                            </TouchableOpacity>
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
    currencySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.background,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 24,
        gap: 8,
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
    breakdownSection: {
        paddingVertical: 16,
        paddingLeft: 16,
        gap: 12,
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

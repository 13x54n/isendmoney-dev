import { StyleSheet, View, Text, Switch, ScrollView } from 'react-native';
import { Colors } from '@/constants/theme';
import { Stack } from 'expo-router';
import { useState } from 'react';

export default function NotificationSettingsScreen() {
    const [pushEnabled, setPushEnabled] = useState(true);
    const [emailEnabled, setEmailEnabled] = useState(true);
    const [smsEnabled, setSmsEnabled] = useState(false);
    const [marketingEnabled, setMarketingEnabled] = useState(true);

    const ToggleItem = ({ label, description, value, onValueChange }: { label: string, description: string, value: boolean, onValueChange: (val: boolean) => void }) => (
        <View style={styles.toggleContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
            <Switch
                trackColor={{ false: Colors.light.border, true: Colors.light.primary }}
                thumbColor={'#fff'}
                ios_backgroundColor={Colors.light.border}
                onValueChange={onValueChange}
                value={value}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Notification Settings', headerBackTitle: 'Profile' }} />

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>General</Text>
                    <ToggleItem
                        label="Push Notifications"
                        description="Receive alerts on this device"
                        value={pushEnabled}
                        onValueChange={setPushEnabled}
                    />
                    <ToggleItem
                        label="Email Notifications"
                        description="Receive updates via email"
                        value={emailEnabled}
                        onValueChange={setEmailEnabled}
                    />
                    <ToggleItem
                        label="SMS Notifications"
                        description="Receive updates via text message"
                        value={smsEnabled}
                        onValueChange={setSmsEnabled}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preferences</Text>
                    <ToggleItem
                        label="Marketing Updates"
                        description="Receive news about promotions and features"
                        value={marketingEnabled}
                        onValueChange={setMarketingEnabled}
                    />
                </View>
            </ScrollView>
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
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.primary,
        marginBottom: 16,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
        marginBottom: 8,
    },
    textContainer: {
        flex: 1,
        paddingRight: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: Colors.light.icon,
    },
});

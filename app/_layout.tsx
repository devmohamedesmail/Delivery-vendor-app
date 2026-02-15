import React, { useState, useEffect } from 'react'
import { Stack } from 'expo-router'
import AppProviders from '@/providers'
import '../i18n/i18n'
import '../global.css'
import { initI18n } from '@/i18n/i18n';
export default function RootLayout() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        initI18n().then(() => setReady(true));
    }, []);

    if (!ready) return null;
    return (

        <AppProviders>
            <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(store)" />
            </Stack>
        </AppProviders>
    )
}

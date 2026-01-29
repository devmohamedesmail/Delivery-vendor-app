import React from 'react'
import { Stack } from 'expo-router'
import AppProviders from '@/providers'
import '../i18n/i18n'
import '../global.css'

export default function RootLayout() {
    return (

        <AppProviders>
            <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(store)" />
            </Stack>
        </AppProviders>
    )
}

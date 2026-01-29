import React from 'react'
import { ThemeProvider } from '../context/theme-provider'
import { Stack } from 'expo-router'
import AppProviders from '@/providers'

export default function RootLayout() {
    return (

        <AppProviders>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
        </AppProviders>
    )
}

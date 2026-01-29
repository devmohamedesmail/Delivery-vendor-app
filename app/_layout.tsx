import React from 'react'
import { ThemeProvider } from '../context/theme-provider'
import { Stack } from 'expo-router'

export default function RootLayout() {
    return (
        <ThemeProvider>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
        </ThemeProvider>
    )
}

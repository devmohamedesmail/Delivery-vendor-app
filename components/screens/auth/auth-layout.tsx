import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, KeyboardAvoidingView, Platform, StatusBar } from 'react-native'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <SafeAreaView className="flex-1 " edges={["bottom"]}>
            <StatusBar barStyle="light-content" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

import React from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
export default function KeyboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {children}
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

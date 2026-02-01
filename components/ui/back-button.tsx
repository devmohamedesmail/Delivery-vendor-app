import React from 'react'
import { Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function BackButton() {
    const router = useRouter()
    return (
        <Pressable
            onPress={() => router.back()}
            className="p-2 bg-gray-200 rounded-full"
        >
            <Ionicons name="arrow-back" size={20} color="black" />
        </Pressable>
    )
}

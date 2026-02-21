import React from 'react'
import { Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'

export default function BackButton() {
    const router = useRouter()
    const {t,i18n} = useTranslation()
    const isRtl = i18n.language === 'ar'
    return (
        <Pressable
            onPress={() => router.back()}
            className="p-2 bg-gray-200 rounded-full"
        >
            <Ionicons name={isRtl ? "arrow-forward" : "arrow-back"} size={20} color="black" />
        </Pressable>
    )
}

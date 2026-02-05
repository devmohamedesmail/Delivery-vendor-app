import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Ionicons } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ButtonIcon from './button-icon'
import BackButton from './back-button'
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function Header({ title, backButton = true }: { title?: string, backButton?: boolean }) {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <View className="bg-black px-6 py-7 shadow-sm pt-18 ">
      <View className="flex-row justify-between items-center">
        {backButton && <BackButton />}

        <Text
          className="text-xl font-bold text-white"
        >
          {title}
        </Text>

        <View className="flex-row items-center gap-5">
          <ButtonIcon icon={<Ionicons name="notifications-outline" size={24} color="white" />} onPress={() => router.push('/notifications')} />
          <ButtonIcon icon={<FontAwesome name="user-o" size={24} color="white" />} onPress={() => router.push('/account')} />
        </View>
      </View>
    </View>
  )
}

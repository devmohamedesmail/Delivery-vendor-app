import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Ionicons } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function Header({ title }: { title?: string }) {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <View className="bg-black px-6 py-4 shadow-sm pt-18 ">
      <View className="flex-row justify-between items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 bg-gray-200 rounded-full"
        >
          <Ionicons name="arrow-back" size={20} color="black" />
        </TouchableOpacity>

        <Text
          className="text-xl font-bold text-white"
        >
          {title}
        </Text>

        {/* <NotificationIcon /> */}
        <Link href='/account' className='text-white'>
          <MaterialIcons name="account-circle" size={30} color="white" />
        </Link>
      </View>
    </View>
  )
}

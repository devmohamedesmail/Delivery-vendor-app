import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'


export default function FloatButton({ onPress }: { onPress?: () => void }) {
  return (
    <TouchableOpacity
      className="absolute bottom-24 right-6 bg-primary rounded-full w-16 h-16 items-center justify-center shadow-lg"
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons name="add" size={32} color="#fff" />
    </TouchableOpacity>
  )
}

import React from 'react'
import { Image, View } from 'react-native'
import { useSetting } from '@/hooks/useSetting'

export default function Logo() {
  const { settings } = useSetting()
  return (
    <View>
      {settings?.logo && (
        <Image
          source={{ uri: settings?.logo }}
          style={{ width: 90, height: 90 }}
        />
      )}
    </View>
  )
}

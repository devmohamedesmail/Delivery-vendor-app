import React from 'react'
import { Pressable, View, Text } from 'react-native'


export default function ButtonIcon({ icon, onPress, count , notificationIndicator }: { icon: React.ReactNode, onPress: () => void, count?: number , notificationIndicator?: boolean }) {
    return (
        <Pressable onPress={onPress} className='bg-gray-800 rounded-full p-2 relative w-10 h-10 flex items-center justify-center'>
            {icon}
            {count ? <View className='absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center' >
                <Text className='text-xs text-white font-bold'>{count}</Text>
            </View> : null}



            {notificationIndicator && <View className='absolute top-8 -right-0 w-2 h-2 bg-green-500 rounded-full flex items-center justify-center' >
                <Text className='text-xs text-white font-bold'></Text>
            </View>}
        </Pressable>
    )
}

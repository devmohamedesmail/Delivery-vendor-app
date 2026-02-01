import React from 'react'
import { Pressable } from 'react-native'

export default function ButtonIcon({ icon, onPress }: { icon: React.ReactNode, onPress: () => void }) {
    return (
        <Pressable onPress={onPress}>
            {icon}
        </Pressable>
    )
}

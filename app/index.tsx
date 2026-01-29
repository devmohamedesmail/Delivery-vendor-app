import React from 'react'
import { View ,Text} from 'react-native'
import '../global.css'
import { useColorScheme } from 'nativewind'
import ThemeToggle from '@/components/ui/theme-toggle'

export default function index() {

  return (
    <View>
        <Text className='bg-green-600 dark:bg-red-600 mt-10 dark:text-text-dark text-text-light'>index</Text>
        <ThemeToggle />
    </View>
  )
}

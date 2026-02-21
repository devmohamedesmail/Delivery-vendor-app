import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { Switch, View } from 'react-native';

export default function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="flex-row items-center gap-1.5 px-2.5 py-1.5 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      {/* Sun icon pill */}
      <View className={`w-7 h-7 rounded-lg items-center justify-center ${!isDark ? 'bg-primary' : 'bg-transparent'}`}>
        <Ionicons
          name="sunny"
          size={15}
          color={!isDark ? '#ffffff' : '#6b7280'}
        />
      </View>

      <Switch
        value={isDark}
        onValueChange={toggleColorScheme}
        trackColor={{
          false: '#d1d5db',
          true: '#374151',
        }}
        thumbColor="#ffffff"
        ios_backgroundColor="#d1d5db"
        style={{ transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }] }}
      />

      {/* Moon icon pill */}
      <View className={`w-7 h-7 rounded-lg items-center justify-center ${isDark ? 'bg-primary' : 'bg-transparent'}`}>
        <Ionicons
          name="moon"
          size={14}
          color={isDark ? '#ffffff' : '#6b7280'}
        />
      </View>
    </View>
  );
}

import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React, { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';

export default function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Animation value: 0 for Light (left), 1 for Dark (right)
  const translateX = useSharedValue(isDark ? 1 : 0);

  useEffect(() => {
    translateX.value = withSpring(isDark ? 1 : 0, {
      damping: 15,
      stiffness: 150,
    });
  }, [isDark]);

  const handleToggle = () => {
    // Animate first
    translateX.value = withSpring(isDark ? 0 : 1);
    // Then toggle
    toggleColorScheme();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value * 36, // Move 36px
        },
      ],
    };
  });

  return (
    <Pressable
      onPress={handleToggle}
      className="flex-row items-center bg-gray-200 dark:bg-gray-800 rounded-full p-1 w-[80px] h-[36px] relative mb-2"
    >
      {/* Sliding Indicator */}
      <Animated.View
        className="absolute left-1 w-[34px] h-[28px] rounded-full shadow-sm flex items-center justify-center"
        style={[
          { backgroundColor: colors.light.tint },
          animatedStyle
        ]}
      />

      {/* Light Mode Icon (Sun) */}
      <View className="flex-1 items-center justify-center z-10">
        <Ionicons
          name="sunny"
          size={18}
          color={!isDark ? '#fff' : '#9CA3AF'} // White if active, gray if inactive
        />
      </View>

      {/* Dark Mode Icon (Moon) */}
      <View className="flex-1 items-center justify-center z-10">
        <Ionicons
          name="moon"
          size={16}
          color={isDark ? '#fff' : '#9CA3AF'} // White if active, gray if inactive
        />
      </View>
    </Pressable>
  );
}

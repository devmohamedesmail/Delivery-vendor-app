import { Ionicons } from '@expo/vector-icons'
import { useColorScheme } from 'nativewind'
import React, { useState } from 'react'
import { Animated, Pressable, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'

export default function TimePickerButton({
    label,
    value,
    onPress,
    error
}: {
    label: string
    value: string
    onPress: () => void
    error: string | undefined
}) {
    const { colorScheme } = useColorScheme()
    const [scaleAnim] = useState(new Animated.Value(1))
    const { t } = useTranslation()

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.97,
            useNativeDriver: true,
        }).start()
    }

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start()
    }

    const isDark = colorScheme === 'dark'

    return (
        <View className="mb-5">
            {/* Label with gradient accent */}
            <View className="flex-row items-center mb-3">
                <View className="w-1 h-4 bg-primary rounded-full mr-2" />
                <Text className="text-gray-800 dark:text-gray-200 font-semibold text-base">
                    {label}
                </Text>
            </View>

            {/* Animated Pressable Container */}
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <Pressable
                    onPress={onPress}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    className={`
                        relative overflow-hidden rounded-2xl
                        ${error ? 'border-2 border-red-500/50' : 'border border-gray-200 dark:border-gray-700'}
                    `}
                >
                    {/* Background with glassmorphism effect */}
                    <View className={`
                        p-4 flex-row items-center justify-between
                        ${isDark
                            ? 'bg-gray-800/80'
                            : 'bg-white/90'
                        }
                    `}>
                        {/* Left side - Time value with icon */}
                        <View className="flex-row items-center flex-1">
                            {/* Icon container with gradient background */}
                            <View className="mr-3 relative">
                                <View className={`
                                    w-11 h-11 rounded-xl items-center justify-center
                                    ${isDark
                                        ? 'bg-primary/20'
                                        : 'bg-primary/10'
                                    }
                                `}>
                                    <Ionicons
                                        name="time-outline"
                                        size={24}
                                        color={isDark ? '#ff6b35' : '#f54a00'}
                                    />
                                </View>
                                {/* Subtle glow effect */}
                                <View className="absolute inset-0 bg-primary/5 rounded-xl blur-sm" />
                            </View>

                            {/* Time display */}
                            <View className="flex-1">
                                <Text className={`
                                    text-base font-medium
                                    ${value
                                        ? 'text-gray-900 dark:text-white'
                                        : 'text-gray-400 dark:text-gray-500'
                                    }
                                `}>
                                    {value || t('store.selectTime')}
                                </Text>
                                {value && (
                                    <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                        {t('store.tapToChange')}
                                    </Text>
                                )}
                            </View>
                        </View>

                        {/* Right side - Chevron indicator */}
                        <View className={`
                            w-8 h-8 rounded-lg items-center justify-center
                            ${isDark
                                ? 'bg-gray-700/50'
                                : 'bg-gray-100'
                            }
                        `}>
                            <Ionicons
                                name="chevron-forward"
                                size={18}
                                color={isDark ? '#9ca3af' : '#6b7280'}
                            />
                        </View>
                    </View>

                    {/* Gradient accent line at bottom when selected */}
                    {value && !error && (
                        <View className="h-0.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
                    )}
                </Pressable>
            </Animated.View>

            {/* Error message with icon */}
            {error && (
                <View className="flex-row items-center mt-2 px-1">
                    <Ionicons name="alert-circle" size={14} color="#ef4444" />
                    <Text className="text-red-500 text-sm ml-1.5 flex-1">
                        {error}
                    </Text>
                </View>
            )}
        </View>
    )
}

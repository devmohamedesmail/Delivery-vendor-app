import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, TextInput, View } from 'react-native'

interface OTPInputProps {
    length?: number
    value: string
    onChange: (otp: string) => void
    error?: string
}

export default function OTPInput({ length = 6, value, onChange, error }: OTPInputProps) {
    const { i18n } = useTranslation()
    const inputRefs = useRef<(TextInput | null)[]>([])
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

    const handleChange = (text: string, index: number) => {
        // Only allow numbers
        const numericText = text.replace(/[^0-9]/g, '')

        if (numericText.length === 0) {
            // Handle deletion
            const newOTP = value.split('')
            newOTP[index] = ''
            onChange(newOTP.join(''))
            return
        }

        // Handle single digit input
        if (numericText.length === 1) {
            const newOTP = value.split('')
            newOTP[index] = numericText
            onChange(newOTP.join(''))

            // Auto-focus next input
            if (index < length - 1) {
                inputRefs.current[index + 1]?.focus()
            }
        }

        // Handle paste of multiple digits
        if (numericText.length > 1) {
            const digits = numericText.slice(0, length).split('')
            const newOTP = value.split('')

            digits.forEach((digit, i) => {
                if (index + i < length) {
                    newOTP[index + i] = digit
                }
            })

            onChange(newOTP.join(''))

            // Focus the next empty input or the last one
            const nextIndex = Math.min(index + digits.length, length - 1)
            inputRefs.current[nextIndex]?.focus()
        }
    }

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace') {
            if (!value[index] && index > 0) {
                // If current input is empty, focus previous input
                inputRefs.current[index - 1]?.focus()
            }
        }
    }

    const handleFocus = (index: number) => {
        setFocusedIndex(index)
    }

    const handleBlur = () => {
        setFocusedIndex(null)
    }

    return (
        <View className="w-full">
            <View
                className={`flex-row justify-between gap-2 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}
            >
                {Array.from({ length }).map((_, index) => {
                    const isFocused = focusedIndex === index
                    const hasValue = !!value[index]

                    return (
                        <View
                            key={index}
                            className={`flex-1 h-14 border-2 rounded-lg items-center justify-center
                ${isFocused ? 'border-primary bg-blue-50 dark:bg-blue-900/20' :
                                    hasValue ? 'border-gray-400 dark:border-gray-500' :
                                        'border-gray-300 dark:border-gray-600'}
                ${error ? 'border-red-500' : ''}
                bg-white dark:bg-gray-800
              `}
                        >
                            <TextInput
                                ref={(ref) => (inputRefs.current[index] = ref)}
                                className="w-full h-full text-center text-2xl font-bold text-black dark:text-white"
                                maxLength={1}
                                keyboardType="number-pad"
                                value={value[index] || ''}
                                onChangeText={(text) => handleChange(text, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                onFocus={() => handleFocus(index)}
                                onBlur={handleBlur}
                                selectTextOnFocus
                            />
                        </View>
                    )
                })}
            </View>

            {error && (
                <Text className="text-red-500 mt-2 text-sm text-center">
                    {error}
                </Text>
            )}
        </View>
    )
}

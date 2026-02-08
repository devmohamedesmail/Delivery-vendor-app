import GoogleLogin from '@/components/ui/google-login'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function SocialLoginSection() {
    const { t } = useTranslation()

    const handleGoogleLogin = () => {
        // TODO: Implement Google login
        console.log('Google login pressed')
    }

    const handleFacebookLogin = () => {
        // TODO: Implement Facebook login
        console.log('Facebook login pressed')
    }

    return (
        <View className="mt-8">
            {/* Divider with OR text */}
            <View className="flex-row items-center mb-6">
                <View className="flex-1 h-[1px] bg-gray-300 dark:bg-gray-700" />
                <Text className="mx-4 text-gray-500 dark:text-gray-400 font-medium">
                    {t('auth.or')}
                </Text>
                <View className="flex-1 h-[1px] bg-gray-300 dark:bg-gray-700" />
            </View>

            {/* Social Login Buttons */}
            <View className="gap-3">
                {/* Google Login Button */}
               <GoogleLogin />

                {/* Facebook Login Button */}
                {/* <TouchableOpacity
                    onPress={handleFacebookLogin}
                    activeOpacity={0.8}
                    className="flex-row items-center justify-center bg-[#1877F2] border-2 border-[#1877F2] rounded-xl py-4 px-6 shadow-sm"
                >
                    <Image
                        source={require('@/assets/icons/facebook.png')}
                        className="w-6 h-6 mr-3"
                        resizeMode="contain"
                    />
                    <Text className="text-white font-semibold text-base">
                        {t('auth.continueWithFacebook')}
                    </Text>
                </TouchableOpacity> */}
            </View>

            {/* Privacy Notice */}
            <Text className="text-xs text-gray-500 dark:text-gray-400 text-center mt-6 px-4">
                {t('auth.socialLoginPrivacy')}
            </Text>
        </View>
    )
}

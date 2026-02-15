// import * as Updates from 'expo-updates';
import colors from '@/constants/colors';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { I18nManager, Pressable, Text, View } from 'react-native';
import Animated, { useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';
import { saveLanguage } from '@/i18n/i18n';
import { useLanguage } from '@/hooks/useLangauge';

export default function LanguageToggle() {
    const { i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';
    const { toggleLanguage } = useLanguage();

    // Animation value: 0 for English (left), 1 for Arabic (right)
    const translateX = useSharedValue(isArabic ? 1 : 0);

    useEffect(() => {
        translateX.value = withSpring(isArabic ? 1 : 0, {
            damping: 15,
            stiffness: 150,
        });
    }, [isArabic]);

    // const toggleLanguage = async () => {
    //     const newLang = isArabic ? 'en' : 'ar';
    //     const isRTL = newLang === 'ar';

    //     i18n.changeLanguage(newLang);
    //     await saveLanguage(newLang);

    //     if (I18nManager.isRTL !== isRTL) {
    //         I18nManager.allowRTL(isRTL);
    //         I18nManager.forceRTL(isRTL);
    //     }

    //     //  await Updates.reloadAsync();
    // };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value * 36, // Move 36px (approx half width - padding)
                },
            ],
        };
    });

    const activeTextStyle = (isActive: boolean) =>
        `text-xs font-bold z-10 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`;

    return (
        <Pressable
            onPress={toggleLanguage}
            className="flex-row items-center bg-gray-200 dark:bg-gray-800 rounded-full p-1 w-[80px] h-[36px] relative mb-2"
        >
            {/* Sliding Indicator */}
            <Animated.View
                className="absolute left-1 w-[34px] h-[28px] rounded-full shadow-sm"
                style={[
                    { backgroundColor: colors.light.tint },
                    animatedStyle
                ]}
            />

            {/* English Text */}
            <View className="flex-1 items-center justify-center">
                <Text className={activeTextStyle(!isArabic)} style={{ marginTop: -1 }}>
                    EN
                </Text>
            </View>

            {/* Arabic Text */}
            <View className="flex-1 items-center justify-center">
                <Text className={activeTextStyle(isArabic)} style={{ marginTop: -2 }}>
                    ع
                </Text>
            </View>
        </Pressable>
    );
}

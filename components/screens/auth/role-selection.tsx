import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';

interface RoleSelectionProps {
    value?: number | string;
    onChange?: (roleId: number) => void;
    error?: string;
}

export default function RoleSelection({ formik }: any) {
    const { t, i18n } = useTranslation();

    const roles = [{
        id: 1,
        title_ar: "متجر",
        title_en: t('auth.store') || "Store Owner",
        icon: "storefront-outline",
        role_id: 3
    }, {
        id: 2,
        title_ar: "توصيل",
        title_en: t('auth.delivery') || "Delivery",
        icon: "bicycle-outline",
        role_id: 6
    }];

    const isRTL = i18n.language === 'ar';

    return (
        <View className="mt-4 mb-2">
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 ml-1 text-left">
                {t('auth.selectRole') || 'Select Role'}
            </Text>

            <View className="flex-row justify-between w-full gap-4">
                {roles.map((role) => {
                    const isSelected = formik.values.role_id === role.role_id;

                    return (
                        <Pressable
                            key={role.id}
                            onPress={() => {
                                formik.setFieldValue('role_id', role.role_id)
                            
                            }}
                            className={`flex-[0.5] flex-col items-center justify-center py-5 px-2 mb-2 rounded-2xl border-2 ${isSelected
                                    ? 'border-primary bg-primary/5'
                                    : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-card-dark'
                                }`}
                        >
                            <View className={`w-14 h-14 items-center justify-center rounded-full mb-3 ${isSelected ? 'bg-primary' : 'bg-gray-100 dark:bg-gray-800'}`}>
                                <Ionicons
                                    name={role.icon as any}
                                    size={28}
                                    color={isSelected ? 'white' : '#9ca3af'}
                                />
                            </View>
                            <Text className={`text-base font-semibold ${isSelected ? 'text-primary' : 'text-gray-600 dark:text-gray-400'}`}>
                                {isRTL ? role.title_ar : role.title_en}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
            {formik.touched.role_id && formik.errors.role_id && (
                <Text className="text-red-500 text-xs mt-1 ml-1">{formik.errors.role_id}</Text>
            )}
        </View>
    )
}

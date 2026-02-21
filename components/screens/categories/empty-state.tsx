import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
    onPress: () => void;
};

export default function CategoryEmptyState({ onPress }: Props) {
    const { t } = useTranslation();

    return (
        <View className="flex-1 items-center pt-20 px-8">
            <Ionicons name="grid-outline" size={60} color="#fd4a12" style={{ opacity: 0.35 }} />
            <Text className="text-lg font-bold text-center text-gray-600 dark:text-gray-300 mt-4">
                {t("categories.no_categories_yet")}
            </Text>
            <Text className="text-sm text-center text-gray-400 dark:text-gray-500 mt-2 leading-5">
                {t("categories.assign_categories_hint")}
            </Text>
            <TouchableOpacity
                onPress={onPress}
                className="mt-6 bg-primary px-6 py-3 rounded-xl"
            >
                <Text className="text-white font-bold text-sm">
                    {t("categories.assign_categories")}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

type Category = {
    id: number;
    name: string;
    description?: string;
    image?: string;
};

export default function AssignedCategoryCard({ category }: { category: Category }) {
    return (
        <View className="flex-1 m-1.5 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
            {category.image ? (
                <Image
                    source={{ uri: category.image }}
                    className="w-full h-28"
                    resizeMode="cover"
                />
            ) : (
                <View className="w-full h-28 items-center justify-center bg-gray-50 dark:bg-gray-800">
                    <Ionicons name="grid-outline" size={28} color="#fd4a12" />
                </View>
            )}
            <Text
                className="text-xs font-semibold text-center text-gray-800 dark:text-white px-2 py-2.5"
                numberOfLines={2}
            >
                {category.name}
            </Text>
        </View>
    );
}

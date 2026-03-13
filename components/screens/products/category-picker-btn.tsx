import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function CategoryPickerBtn({ formik, t, isDark, openCategorySheet, hasError, selectedCategory }: { formik: any, t: any, isDark: boolean, openCategorySheet: () => void, hasError: (field: string) => boolean, selectedCategory: any }) {
    return (
        <View className="mb-4">
            <Text
                className="text-sm font-semibold mb-2"
                style={{ color: isDark ? "#ccc" : "#374151" }}
            >
                {t("products.category")}
            </Text>

            <TouchableOpacity
                onPress={openCategorySheet}
                className={`flex-row items-center justify-between px-4 py-3 rounded-xl border ${hasError("category_id")
                    ? "border-red-400"
                    : isDark
                        ? "border-gray-700"
                        : "border-gray-200"
                    }`}
                style={{
                    backgroundColor: isDark ? "#1a1a1a" : "#fff",
                }}
            >
                <View className="flex-row items-center gap-2 flex-1">
                    {selectedCategory?.image ? (
                        <Image
                            source={{ uri: selectedCategory.image }}
                            className="w-8 h-8 rounded-lg"
                        />
                    ) : (
                        <View
                            className="w-8 h-8 rounded-lg items-center justify-center"
                            style={{ backgroundColor: isDark ? "#333" : "#fff4f0" }}
                        >
                            <Ionicons name="grid-outline" size={16} color="#fd4a12" />
                        </View>
                    )}
                    <Text
                        className="text-sm flex-1"
                        style={{
                            color: selectedCategory
                                ? isDark ? "#fff" : "#111"
                                : isDark ? "#666" : "#aaa",
                        }}
                    >
                        {selectedCategory
                            ? selectedCategory.name
                            : t("products.select_category")}
                    </Text>
                </View>
                <Ionicons
                    name="chevron-down"
                    size={18}
                    color={isDark ? "#666" : "#aaa"}
                />
            </TouchableOpacity>

            {hasError("category_id") && (
                <Text className="text-red-500 text-xs mt-1">
                    {formik.errors.category_id}
                </Text>
            )}
        </View>
    )
}

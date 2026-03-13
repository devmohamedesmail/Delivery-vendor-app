import React from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native'
import BottomPaper from '@/components/ui/bottom-paper'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { Category } from '@/@types/category'

export default function CategoriesBottomPaper({ categorySheetRef, filteredCategories, categorySearch, setCategorySearch, isLoadingCategories, selectedCategory, handleSelectCategory, isDark, t }: any) {
    return (
        <BottomPaper ref={categorySheetRef} snapPoints={["60%"]}>
            {/* Header + Search — fixed, not scrollable */}
            <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
                <View className="flex-row items-center justify-between mb-3">
                    <Text
                        className="text-lg font-bold"
                        style={{ color: isDark ? "#fff" : "#111" }}
                    >
                        {t("products.select_category")}
                    </Text>
                    <TouchableOpacity onPress={() => categorySheetRef.current?.close()}>
                        <AntDesign name="close" size={22} color={isDark ? "#ccc" : "#555"} />
                    </TouchableOpacity>
                </View>

                <View
                    className="flex-row items-center rounded-xl px-3 py-2 mb-3"
                    style={{ backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5" }}
                >
                    <Ionicons name="search" size={18} color="#fd4a12" style={{ marginRight: 8 }} />
                    <TextInput
                        value={categorySearch}
                        onChangeText={setCategorySearch}
                        placeholder="Search..."
                        placeholderTextColor={isDark ? "#666" : "#aaa"}
                        className="flex-1 text-sm"
                        style={{ color: isDark ? "#fff" : "#111" }}
                    />
                    {categorySearch.length > 0 && (
                        <TouchableOpacity onPress={() => setCategorySearch("")}>
                            <AntDesign name="close" size={16} color="#aaa" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Scrollable list — direct child of sheet */}
            {isLoadingCategories ? (
                <ActivityIndicator color="#fd4a12" style={{ marginTop: 20 }} />
            ) : (
                <BottomSheetFlatList
                    data={filteredCategories}
                    keyExtractor={(item: Category) => item.id.toString()}
                    contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
                    ListEmptyComponent={
                        <Text
                            className="text-center text-sm mt-6"
                            style={{ color: isDark ? "#666" : "#aaa" }}
                        >
                            No categories found. Assign categories to your store first.
                        </Text>
                    }
                    renderItem={({ item }: { item: Category }) => {
                        const isSelected = selectedCategory?.id === item.id;
                        return (
                            <TouchableOpacity
                                onPress={() => handleSelectCategory(item)}
                                className="flex-row items-center p-3 rounded-xl mb-2 border"
                                style={{
                                    backgroundColor: isSelected
                                        ? isDark ? "#2a1a15" : "#fff4f0"
                                        : isDark ? "#111" : "#fff",
                                    borderColor: isSelected
                                        ? "#fd4a12"
                                        : isDark ? "#222" : "#eee",
                                    borderWidth: 1.5,
                                }}
                            >
                                {item.image ? (
                                    <Image
                                        source={{ uri: item.image }}
                                        className="w-12 h-12 rounded-xl mr-3"
                                        style={{ resizeMode: "cover" }}
                                    />
                                ) : (
                                    <View
                                        className="w-12 h-12 rounded-xl mr-3 items-center justify-center"
                                        style={{ backgroundColor: isDark ? "#333" : "#f0f0f0" }}
                                    >
                                        <Ionicons name="grid-outline" size={20} color="#fd4a12" />
                                    </View>
                                )}
                                <View className="flex-1">
                                    <Text
                                        className="text-sm font-semibold"
                                        style={{ color: isDark ? "#fff" : "#111" }}
                                        numberOfLines={1}
                                    >
                                        {item.name}
                                    </Text>
                                    {item.description ? (
                                        <Text
                                            className="text-xs mt-0.5"
                                            style={{ color: isDark ? "#888" : "#aaa" }}
                                            numberOfLines={1}
                                        >
                                            {item.description}
                                        </Text>
                                    ) : null}
                                </View>
                                {isSelected && (
                                    <View className="w-6 h-6 rounded-full items-center justify-center bg-primary">
                                        <AntDesign name="check" size={13} color="#fff" />
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    }}
                />
            )}
        </BottomPaper>
    )
}

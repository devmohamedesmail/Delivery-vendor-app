import { useColorScheme } from "nativewind";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function OrdersFilterSection({
  tabs,
  activeTab,
  setActiveTab,
}: any) {
  const { colorScheme } = useColorScheme();
  return (
    <View className="bg-white dark:bg-gray-800 pt-12 pb-4 px-4 border-b border-gray-100 dark:border-gray-700">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row -mx-4 px-4"
      >
        {tabs.map((tab: any) => {
          const isActive = activeTab === tab.key;

          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              className={`mr-2 px-4 py-2 rounded-full border ${isActive
                  ? "bg-primary border-primary"
                  : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                }`}
            >
              <View className="flex-row items-center">
                <Text
                  className={`font-semibold ${isActive ? "text-white" : "text-black dark:text-gray-100"
                    }`}
                >
                  {tab.label}
                </Text>

              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

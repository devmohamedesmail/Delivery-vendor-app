import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

export default function OrdersFilterSection({
  tabs,
  activeTab,
  setActiveTab,
}: any) {
  return (
    <View className="bg-white pt-12 pb-4 px-4 border-b border-gray-100">
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
              className={`mr-2 px-4 py-2 rounded-full border ${
                isActive
                  ? "bg-primary border-primary"
                  : "bg-white border-gray-200"
              }`}
            >
              <View className="flex-row items-center">
                <Text
                  className={`font-semibold  ${
                    isActive ? "text-white" : "text-black"
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

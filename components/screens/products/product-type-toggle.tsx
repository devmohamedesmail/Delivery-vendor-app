import React from 'react'
import { View, Text, Switch } from 'react-native'

export default function ProductTypeToggle({ formik, t, isDark, setSelectedAttributeId, setAttributeValues }: { formik: any, t: any, isDark: boolean, setSelectedAttributeId: (id: string) => void, setAttributeValues: (values: Array<{ attribute_id: string; value: string; price: string }>) => void }) {
  return (
    <View
                    className="mb-6 p-4 rounded-xl border"
                    style={{
                      backgroundColor: isDark ? "#1a1a1a" : "#fff",
                      borderColor: isDark ? "#2a2a2a" : "#e5e7eb",
                    }}
                  >
                    <View className="flex-row items-center justify-between">
                      <View className="flex-1 pr-4">
                        <Text
                          className="text-base font-semibold mb-1"
                          style={{ color: isDark ? "#fff" : "#111827" }}
                        >
                          {t("products.simple_product")}
                        </Text>
                        <Text
                          className="text-xs"
                          style={{ color: isDark ? "#888" : "#6b7280" }}
                        >
                          {formik.values.is_simple
                            ? t("products.simple_product_description")
                            : t("products.variable_product_description")}
                        </Text>
                      </View>
                      <Switch
                        value={formik.values.is_simple}
                        onValueChange={(value) => {
                          formik.setFieldValue("is_simple", value);
                          if (!value) {
                            setSelectedAttributeId("");
                            setAttributeValues([]);
                            formik.setFieldValue("has_attributes", false);
                          }
                        }}
                        trackColor={{ false: "#3b82f6", true: "#10b981" }}
                        thumbColor="#ffffff"
                        ios_backgroundColor="#d1d5db"
                      />
                    </View>
                  </View>
  )
}

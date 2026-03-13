import React from 'react'
import Select from '@/components/ui/select'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Toast from 'react-native-toast-message'
import { Text, View } from 'react-native'




export default function ProductVariant({ formik, t, isDark, selectedAttributeId, setSelectedAttributeId, attributeValues, setAttributeValues, attributesData }: any) {
  return (
    <>
                      <View className="mb-4">
                        <Select
                          label={t("products.attribute")}
                          placeholder={t("products.select_attribute")}
                          options={(attributesData?.attributes || []).map(
                            (attr: any) => ({
                              label: attr.name,
                              value: attr.id.toString(),
                            })
                          )}
                          value={selectedAttributeId}
                          onSelect={(value: string) => {
                            setSelectedAttributeId(value);
                            setAttributeValues([]);
                            formik.setFieldValue("has_attributes", true);
                          }}
                        />
                      </View>
    
                      {selectedAttributeId && (
                        <View className="mb-4">
                          <Text
                            className="text-sm font-medium mb-2"
                            style={{ color: isDark ? "#ccc" : "#374151" }}
                          >
                            {t("products.attribute_values")}
                          </Text>
    
                          {attributeValues.map((attrValue:any, index:number) => (
                            <View
                              key={index}
                              className="mb-3 p-3 rounded-lg border"
                              style={{
                                backgroundColor: isDark ? "#1a1a1a" : "#fff",
                                borderColor: isDark ? "#2a2a2a" : "#e5e7eb",
                              }}
                            >
                              <View className="flex-row justify-between items-center mb-2">
                                <Text
                                  className="text-xs"
                                  style={{ color: isDark ? "#888" : "#6b7280" }}
                                >
                                  {t("products.value_item")} {index + 1}
                                </Text>
                                <Button
                                  title={t("products.remove")}
                                  onPress={() =>
                                    setAttributeValues((v:any) =>
                                      v.filter((_:any, i:number) => i !== index)
                                    )
                                  }
                                  className="bg-red-500 py-1 px-3"
                                />
                              </View>
                              <View className="mb-2">
                                <Input
                                  label={t("products.value")}
                                  placeholder={t("products.enter_value")}
                                  value={attrValue.value}
                                  onChangeText={(text) => {
                                    const newValues = [...attributeValues];
                                    newValues[index].value = text;
                                    setAttributeValues(newValues);
                                  }}
                                />
                              </View>
                              <Input
                                label={t("products.extra_price")}
                                placeholder={t("products.enter_extra_price")}
                                value={attrValue.price}
                                onChangeText={(text) => {
                                  const newValues = [...attributeValues];
                                  newValues[index].price = text;
                                  setAttributeValues(newValues);
                                }}
                                keyboardType="numeric"
                              />
                            </View>
                          ))}
    
                          <View
                            className="mb-3 p-3 rounded-lg"
                            style={{ backgroundColor: isDark ? "#111" : "#f9fafb" }}
                          >
                            <View className="mb-2">
                              <Input
                                label={t("products.value")}
                                placeholder={t("products.enter_value")}
                                value={formik.values.attribute_value}
                                onChangeText={formik.handleChange("attribute_value")}
                              />
                            </View>
                            <View className="mb-3">
                              <Input
                                label={t("products.price")}
                                placeholder={t("products.price")}
                                value={formik.values.attribute_price}
                                onChangeText={formik.handleChange("attribute_price")}
                                keyboardType="numeric"
                              />
                            </View>
                            <Button
                              title={t("products.add_value")}
                              onPress={() => {
                                if (
                                  formik.values.attribute_value &&
                                  formik.values.attribute_price
                                ) {
                                  setAttributeValues([
                                    ...attributeValues,
                                    {
                                      attribute_id: selectedAttributeId,
                                      value: formik.values.attribute_value,
                                      price: formik.values.attribute_price,
                                    },
                                  ]);
                                  formik.setFieldValue("attribute_value", "");
                                  formik.setFieldValue("attribute_price", "");
                                } else {
                                  Toast.show({
                                    type: "error",
                                    text1: t("products.fill_all_fields"),
                                  });
                                }
                              }}
                              className="bg-blue-500"
                            />
                          </View>
                        </View>
                      )}
                    </>
  )
}

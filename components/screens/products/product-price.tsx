import React from 'react'
import { View } from 'react-native'
import Input from '@/components/ui/input'

export default function ProductPrice({ formik, t }: { formik: any, t: any }) {
  return (
    <View className="mb-4">
      <Input
                        label={t("products.price")}
                        placeholder={t("products.enter_price")}
                        value={formik.values.price}
                        onChangeText={formik.handleChange("price")}
                        keyboardType="numeric"
                        error={
                          formik.touched.price && formik.errors.price
                            ? formik.errors.price
                            : ""
                        }
                      />
    
                      <Input
                        label={t("products.sale_price")}
                        placeholder={t("products.enter_sale_price")}
                        value={formik.values.sale_price}
                        onChangeText={formik.handleChange("sale_price")}
                        keyboardType="numeric"
                        error={
                          formik.touched.sale_price && formik.errors.sale_price
                            ? formik.errors.sale_price
                            : ""
                        }
                      />
                    </View>
  )
}

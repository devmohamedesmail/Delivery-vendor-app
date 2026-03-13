import React from 'react'
import { View } from 'react-native'
import Input from '@/components/ui/input'
import TextArea from '@/components/ui/textarea'
import CustomImagePicker from '@/components/ui/image-picker'
export default function ProductInfo({ formik, t }: { formik: any, t: any }) {
  return (
    <View>
      <View className="mb-4">
        <Input
          label={t("products.product_name")}
          placeholder={t("products.enter_product_name")}
          value={formik.values.name}
          onChangeText={formik.handleChange("name")}
          error={
            formik.touched.name && formik.errors.name
              ? formik.errors.name
              : ""
          }
        />
      </View>



      {/* Description */}
      <View className="mb-4">
        <TextArea
          label={t("products.product_description")}
          placeholder={t("products.enter_product_description")}
          value={formik.values.description}
          onChangeText={formik.handleChange("description")}
          error={
            formik.touched.description && formik.errors.description
              ? formik.errors.description
              : ""
          }
        />
      </View>

      {/* Product Image */}
      <View className="mb-6">
        <CustomImagePicker
          label={t("products.product_image")}
          value={formik.values.image}
          onImageSelect={(uri: string) =>
            formik.setFieldValue("image", uri)
          }
          placeholder={t("products.tap_to_select_image")}
        />
      </View>
    </View>
  )
}

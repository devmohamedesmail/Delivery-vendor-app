import Button from "@/components/ui/button";
import Header from "@/components/ui/header";
import CustomImagePicker from "@/components/ui/image-picker";
import Input from "@/components/ui/input";
import Layout from "@/components/ui/layout";
import Select from "@/components/ui/select";
import { config } from "@/constants/config";
import { AuthContext } from "@/context/auth-provider";
import ProductController from "@/controllers/products/controller";
import useFetch from "@/hooks/useFetch";
import { useStore } from "@/hooks/useStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFormik } from "formik";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

interface Category {
  id: number;
  name: string;
  description: string;
}

export default function Update() {
  const params = useLocalSearchParams();

  // Re-derive product whenever the params change (fixes "always shows last product" bug)
  const product = useMemo(
    () => (params.data ? JSON.parse(params.data as string) : null),
    [params.data]
  );

  const { t } = useTranslation();
  const { auth } = useContext(AuthContext);

  // Initialize attribute state from product
  const [attributeValues, setAttributeValues] = useState<Array<{ attribute_id: string; value: string; price: string }>>(() => {
    if (product?.attributes && product.attributes.length > 0) {
      const firstAttr = product.attributes[0];
      return firstAttr.values?.map((v: any) => ({
        attribute_id: firstAttr.id.toString(),
        value: v.value,
        price: v.price?.toString() || "0"
      })) || [];
    }
    return [];
  });

  const [selectedAttributeId, setSelectedAttributeId] = useState<string>(() => {
    return product?.attributes?.[0]?.id?.toString() || "";
  });

  // ── Re-sync formik + local state when product changes ──────────────────────
  useEffect(() => {
    if (!product) return;
    formik.resetForm({
      values: {
        name: product.name || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        sale_price: product.sale_price?.toString() || "",
        category_id: product.category_id?.toString() || "",
        image: product.image || "",
        attribute_value: "",
        attribute_price: "",
      },
    });
    if (product.attributes && product.attributes.length > 0) {
      const firstAttr = product.attributes[0];
      setSelectedAttributeId(firstAttr.id.toString());
      setAttributeValues(
        firstAttr.values?.map((v: any) => ({
          attribute_id: firstAttr.id.toString(),
          value: v.value,
          price: v.price?.toString() || "0",
        })) || []
      );
    } else {
      setSelectedAttributeId("");
      setAttributeValues([]);
    }
  }, [product?.id]); // keyed on product.id — fires only when a different product is opened

  const router = useRouter();
  const { store } = useStore()
  const { data: attributesData } = useFetch('/attributes');



  // Check if store exists
  // const storeId = profileData?.data?.store?.id || "";

  const { data: categoriesData } = useFetch(
    store?.id ? `/categories/store/${store.id}` : ""
  );

  const categoryOptions =
    categoriesData?.data?.map((cat: Category) => ({
      label: cat.name,
      value: cat.id.toString(),
    })) || [];

  const queryClient = useQueryClient();

  // 🔹 Update mutation
  const updateMutation = useMutation({
    mutationFn: ({
      productID,
      formData,
    }: {
      productID: number;
      formData: FormData;
    }) =>
      ProductController.updateProduct({
        productID,
        formData,
        token: auth.token,
      }),

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: t("products.product_updated_successfully"),
      })
      queryClient.invalidateQueries({
        queryKey: ["products", store?.id],
      });
      router.back();
    },

    onError: (error) => {
      Toast.show({
        type: "error",
        text1: t("products.failed_to_update_product"),
      })
    },
  });

  const formik = useFormik({
    initialValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price?.toString() || "",
      sale_price: product?.sale_price?.toString() || "",
      category_id: product?.category_id?.toString() || "",
      image: product?.image || "",
      attribute_value: "",
      attribute_price: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t("products.name_required")),
      price: Yup.number()
        .required(t("products.price_required"))
        .positive(t("products.price_positive")),
      sale_price: Yup.number()
        .nullable()
        .positive(
          t("products.price_positive", {
            defaultValue: "Price must be positive",
          })
        ),
      category_id: Yup.string().required(t("products.category_required")),
    }),
    onSubmit: async (values) => {
      try {
        if (!store?.id) return;

        // Create FormData for image upload
        const formData = new FormData();
        formData.append("store_id", store.id);
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("price", values.price);
        if (values.sale_price) {
          formData.append("sale_price", values.sale_price);
        }
        formData.append("category_id", values.category_id);

        // Add attributes and values
        if (selectedAttributeId && attributeValues.length > 0) {
          // Send as array notation for FormData
          formData.append("attributes[]", selectedAttributeId);

          // Send each value as separate entries
          attributeValues.forEach((av, index) => {
            formData.append(`values[${index}][attribute_id]`, av.attribute_id);
            formData.append(`values[${index}][value]`, av.value);
            formData.append(`values[${index}][price]`, av.price);
          });
        }

        // Add image file if exists
        if (values.image) {
          const uriParts = values.image.split(".");
          const fileType = uriParts[uriParts.length - 1];

          formData.append("image", {
            uri: values.image,
            name: `product.${fileType}`,
            type: `image/${fileType}`,
          } as any);
        }
        updateMutation.mutate({
          productID: product.id,
          formData,
        });



      } catch (error) {
        console.log("Error saving product:", error);
        Toast.show({
          type: "error",
          text1: t("products.failed_to_save_product"),
        });

      }
    },
  });
  return (
    <Layout>
      <Header title={t("products.update_product")} />
      <ScrollView>
        <View className="px-4 py-6">
          {/* Display Existing Product Attributes */}
          {product?.attributes && product.attributes.length > 0 && (
            <View className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Text className="text-lg font-bold text-blue-900 mb-3" >
                {t("products.existing_attributes")}
              </Text>
              {product.attributes.map((attr: any) => (
                <View key={attr.id} className="mb-3 p-3 bg-white rounded-lg">
                  <Text className="text-sm font-semibold text-gray-800 mb-2" >
                    {attr.name}
                  </Text>
                  {attr.values && attr.values.length > 0 ? (
                    <View className="space-y-1">
                      {attr.values.map((val: any, idx: number) => (
                        <View key={idx} className="flex-row justify-between items-center py-2 px-3 bg-gray-50 rounded-md">
                          <Text className="text-sm text-gray-700" >
                            {val.value}
                          </Text>
                          <Text className="text-sm font-medium text-green-600" >
                            {val.price ? `${val.price} ${config.CURRENCY}` : t("products.no_extra_price")}
                          </Text>
                        </View>
                      ))}
                    </View>
                  ) : (
                    <Text className="text-xs text-gray-500 italic" style={{ fontFamily: "Cairo_400Regular" }}>
                      {t("products.no_values", { defaultValue: "No values defined" })}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}
          {/* Product Name */}
          <View className="mb-4">
            <Input
              label={t("products.product_name")}
              placeholder={t("products.enter_product_name")}
              value={formik.values.name}
              onChangeText={formik.handleChange("name")}
              error={
                formik.touched.name && typeof formik.errors.name === "string"
                  ? formik.errors.name
                  : ""
              }
            />
          </View>



          {/* Price */}
          <View className="mb-4">
            <Input
              label={t("products.price")}
              placeholder={t("products.enter_price")}
              value={formik.values.price}
              onChangeText={formik.handleChange("price")}
              keyboardType="numeric"
              error={
                formik.touched.price && typeof formik.errors.price === "string"
                  ? formik.errors.price
                  : ""
              }
            />
          </View>



          {/* Category Dropdown */}
          <View className="mb-4">
            <Select
              label={t("products.category")}
              placeholder={t("products.select_category")}
              options={categoryOptions}
              value={formik.values.category_id}
              onSelect={(value: string) =>
                formik.setFieldValue("category_id", value)
              }
            />
            {formik.touched.category_id &&
              typeof formik.errors.category_id === "string" && (
                <Text
                  className="text-red-500 text-xs mt-1"
                  style={{ fontFamily: "Cairo_400Regular" }}
                >
                  {formik.errors.category_id}
                </Text>
              )}
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


          <View className="mb-4">
            <Select
              label={t("products.attribute")}
              placeholder={t("products.select_attribute")}
              options={(attributesData?.attributes || []).map((attr: any) => ({
                label: attr.name,
                value: attr.id.toString()
              }))}
              value={selectedAttributeId}
              onSelect={(value: string) => {
                setSelectedAttributeId(value);
                setAttributeValues([]);
              }}
            />
          </View>

          {/* Attribute Values Section */}
          {selectedAttributeId && (
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Cairo_400Regular" }}>
                {t("products.attribute_values", { defaultValue: "Attribute Values" })}
              </Text>

              {/* Dynamic Attribute Value Inputs */}
              {attributeValues.map((attrValue, index) => (
                <View key={index} className="mb-3 p-3 bg-white rounded-lg border border-gray-200">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-xs text-gray-600" style={{ fontFamily: "Cairo_400Regular" }}>
                      {t("products.value_item", { defaultValue: "Value" })} {index + 1}
                    </Text>
                    <Button
                      title={t("products.remove", { defaultValue: "Remove" })}
                      onPress={() => {
                        const newValues = attributeValues.filter((_, i) => i !== index);
                        setAttributeValues(newValues);
                      }}
                      className="bg-red-500 py-1 px-3"
                    />
                  </View>
                  <View className="mb-2">
                    <Input
                      label={t("products.value", { defaultValue: "Value" })}
                      placeholder={t("products.enter_value", { defaultValue: "Enter value (e.g., XL, Red)" })}
                      value={attrValue.value}
                      onChangeText={(text) => {
                        const newValues = [...attributeValues];
                        newValues[index].value = text;
                        setAttributeValues(newValues);
                      }}
                    />
                  </View>
                  <View>
                    <Input
                      label={t("products.extra_price", { defaultValue: "Extra Price" })}
                      placeholder={t("products.enter_extra_price", { defaultValue: "Enter extra price" })}
                      value={attrValue.price}
                      onChangeText={(text) => {
                        const newValues = [...attributeValues];
                        newValues[index].price = text;
                        setAttributeValues(newValues);
                      }}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              ))}

              {/* Add New Value Inputs */}
              <View className="mb-3 p-3 bg-gray-50 rounded-lg">
                <View className="mb-2">
                  <Input
                    label={t("products.value", { defaultValue: "Value" })}
                    placeholder={t("products.enter_value", { defaultValue: "Enter value (e.g., XL, Red)" })}
                    value={formik.values.attribute_value}
                    onChangeText={formik.handleChange("attribute_value")}
                  />
                </View>
                <View className="mb-3">
                  <Input
                    label={t("products.extra_price", { defaultValue: "Extra Price" })}
                    placeholder={t("products.enter_extra_price", { defaultValue: "Enter extra price" })}
                    value={formik.values.attribute_price}
                    onChangeText={formik.handleChange("attribute_price")}
                    keyboardType="numeric"
                  />
                </View>
                <Button
                  title={t("products.add_value", { defaultValue: "+ Add Value" })}
                  onPress={() => {
                    if (formik.values.attribute_value && formik.values.attribute_price) {
                      setAttributeValues([
                        ...attributeValues,
                        {
                          attribute_id: selectedAttributeId,
                          value: formik.values.attribute_value,
                          price: formik.values.attribute_price
                        }
                      ]);
                      formik.setFieldValue("attribute_value", "");
                      formik.setFieldValue("attribute_price", "");
                    } else {
                      Toast.show({
                        type: "error",
                        text1: t("products.fill_all_fields", { defaultValue: "Please fill all fields" }),
                      });
                    }
                  }}
                  className="bg-blue-500"
                />
              </View>
            </View>
          )}

          {/* Submit Button */}
          <Button
            title={
              formik.isSubmitting ? t("products.saving") : t("products.save")
            }
            onPress={formik.handleSubmit}
            disabled={formik.isSubmitting}
          />
        </View>
      </ScrollView>
    </Layout>
  );
}

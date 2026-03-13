import CategoriesBottomPaper from "@/components/screens/products/categories-bottom-paper";
import CategoryPickerBtn from "@/components/screens/products/category-picker-btn";
import ProductInfo from "@/components/screens/products/product-info";
import ProductPrice from "@/components/screens/products/product-price";
import ProductTypeToggle from "@/components/screens/products/product-type-toggle";
import ProductVariant from "@/components/screens/products/product-variant";
import Button from "@/components/ui/button";
import Header from "@/components/ui/header";
import Layout from "@/components/ui/layout";
import useAddProduct from "@/hooks/products/useAddProduct";
import React from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, View } from "react-native";


export default function AddProduct() {

  const {
    t,
    isDark,
    formik,
    createMutation,
    openCategorySheet,
    handleSelectCategory,
    hasError,
    isLoadingCategories,
    assignedCategories,
    filteredCategories,
    categorySheetRef,
    categorySearch,
    setCategorySearch,
    selectedCategory,
    setSelectedCategory,
    attributeValues,
    setAttributeValues,
    selectedAttributeId,
    setSelectedAttributeId,
    attributesData
  } = useAddProduct();

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >


        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Layout>
          <Header title={t("products.add_product")} />

          <ScrollView className="px-4 py-4">
            <View className="pb-24">
              {/* Product info */}
              <ProductInfo
                formik={formik}
                t={t}
              />

              {/* ── Category Picker ──────────────────────────────────── */}
              <CategoryPickerBtn
                formik={formik}
                t={t}
                isDark={isDark}
                openCategorySheet={openCategorySheet}
                hasError={hasError}
                selectedCategory={selectedCategory}
              />



              {/* Simple / Variable toggle */}
              <ProductTypeToggle
                formik={formik}
                t={t}
                isDark={isDark}
                setSelectedAttributeId={setSelectedAttributeId}
                setAttributeValues={setAttributeValues}
              />

              {/* Price / Attributes */}
              {formik.values.is_simple ? (
                <ProductPrice
                  formik={formik}
                  t={t}
                />
              ) : (
                <ProductVariant
                  formik={formik}
                  t={t}
                  isDark={isDark}
                  selectedAttributeId={selectedAttributeId}
                  setSelectedAttributeId={setSelectedAttributeId}
                  attributeValues={attributeValues}
                  setAttributeValues={setAttributeValues}
                  attributesData={attributesData}
                />
              )}

              {/* Submit */}

              <Button
                size="lg"
                title={
                  createMutation.isPending
                    ? t("products.saving")
                    : t("products.save")
                }
                onPress={formik.handleSubmit}
                disabled={createMutation.isPending}
              />
            </View>
          </ScrollView>
        </Layout>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>



      {/* ── Category Bottom Sheet ─────────────────────────────────────────── */}
      <CategoriesBottomPaper
        categorySheetRef={categorySheetRef}
        filteredCategories={filteredCategories}
        categorySearch={categorySearch}
        setCategorySearch={setCategorySearch}
        isLoadingCategories={isLoadingCategories}
        selectedCategory={selectedCategory}
        handleSelectCategory={handleSelectCategory}
        isDark={isDark}
        t={t}
      />
    </>
  );
}
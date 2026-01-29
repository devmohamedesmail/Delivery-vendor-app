import React from 'react'
import Layout from '@/components/ui/layout'
import { View ,Text,FlatList,RefreshControl} from 'react-native'
import Header from "@/components/ui/header";
import Button from "@/components/ui/button";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { useStore } from '@/hooks/useStore';
import { useAuth } from '@/hooks/useAuth';
import CategoryController from '@/controllers/categories/contoller';
import CategoryItem from '@/components/ui/category-item';
import Loading from '@/components/ui/loading';
import NoCategories from '@/components/ui/no-categories';

export default function Categories() {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const { store } = useStore();
  const queryClient = useQueryClient();
  const router = useRouter()

  const {
    data: categories = [],
    isLoading,
    refetch
  } = useQuery({
    queryKey: ["categories", store?.id],
    queryFn: () => CategoryController.fetchCategoriesByStore(store.id, auth.token),
    enabled: !!store?.id && !!auth?.token,
  });
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      t("categories.delete_category"),
      t("categories.delete_category_confirmation"),
      [
        { text: t("categories.cancel"), style: "cancel" },
        {
          text: t("categories.delete"),
          style: "destructive",
          onPress: () => deleteMutation.mutate(id),
        },
      ]
    );
  };

  const deleteMutation = useMutation({
    mutationFn: (categoryId: number) =>
      CategoryController.deleteCategory({ id: categoryId, token: auth?.token }),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: t("categories.category_deleted_successfully"),
      });
      queryClient.invalidateQueries({ queryKey: ["categories", store.id] });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: t("categories.failed_to_delete_category"),
      });
    },
  });

  return (
    <Layout>
      <Header title={t("categories.categories")} />
      <View className="flex flex-row justify-between items-center my-2 px-4">
        <Text className="text-2xl font-bold text-primary mt-1">
          {categories?.data?.length}
        </Text>
        <Button
          title={t("categories.add_category")}
          onPress={() => router.push("/categories/add")}
        />
      </View>




       <FlatList
        key={"2-columns"}
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item: category }) => (
          <CategoryItem category={category} handleDelete={handleDelete} />
        
        )}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#fd4a12"]}
          />
        }
        ListHeaderComponent={
          <>
            {isLoading && <Loading />}
            {!isLoading && categories?.length === 0 && (
              <NoCategories />
            )}
          </>
        }
      />
    </Layout>
  )
}

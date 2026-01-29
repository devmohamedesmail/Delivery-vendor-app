import { config } from "@/constants/config";
import axios from "axios";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";




interface CreateCategoryParams {
    store_id: number;
    name: string;
    description?: string;
    token: string;
}

export default class CategoryController {
    /**
     * Fetch categories by store
     * @param storeId - The store ID
     * @param token - Authorization token
     * @returns Array of categories
     */
    static async fetchCategoriesByStore(storeId: number, token: string) {
        const response = await axios.get(
            `${config.URL}/categories/store/${storeId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data.data;
    }

    /**
     * Create a new category
     * @param param0 
     * @returns 
     * 
     */
    static async createCategory({
        store_id,
        name,
        description,
        token }: CreateCategoryParams) {
        const payload = {
            store_id,
            name,
            description,
        };

        return axios.post(
            `${config.URL}/categories/create`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

    }

    /**
     * Delete a category
     * @returns
     * @param param0 
     */
    static async DeleteCategory({
        id,
        token,
        t,
        refetchCategories,
    }: {
        id: number;
        token: string;
        t: any;
        refetchCategories: () => void | Promise<void>;
    }) {
        Alert.alert(
            t("categories.delete_category"),
            t("categories.delete_category_confirmation"),
            [
                { text: t("categories.cancel"), style: "cancel" },
                {
                    text: t("categories.delete"),
                    style: "destructive",
                    onPress: async () => {
                        try {
                            console.log("Deleting category with id:", id);
                            await axios.delete(`${config.URL}/categories/${id}`);
                            Toast.show({
                                type: "success",
                                text1: t("categories.category_deleted_successfully"),
                            });
                            refetchCategories();
                        } catch (error: any) {
                            console.log("Error deleting category:", error);
                            Toast.show({
                                type: "error",
                                text1: t("categories.failed_to_delete_category"),
                            });
                        }
                    },
                },
            ]
        );
    }

    /**
     * Delete category (plain API call) — returns axios promise
     */
    static async deleteCategory({ id, token }: { id: number; token?: string }) {
        return axios.delete(`${config.URL}/categories/${id}`, {
            headers: token
                ? {
                      Authorization: `Bearer ${token}`,
                  }
                : undefined,
        });
    }


    /**
     * update a category
     * @param param0 
     */
    static async updateCategory({
        name,
        description,
        categoryId,
        token,
        storeId
    }: {
        name: string;
        description?: string;
        categoryId: number;
        token: string;
        storeId: number;
    }) {
        const payload = {
            store_id: storeId,
            name,
            description,
        };

        return await axios.put(
            `${config.URL}/categories/update/${categoryId}`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }



}

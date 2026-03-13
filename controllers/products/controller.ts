import axios from "axios";
import { config } from "@/constants/config";

interface CreateProductParams {
    formData: FormData;
    token: string;
}

interface DeleteProductParams {
    productId: number;
    token: string;
}

export default class ProductController {
    // 🔹 Fetch products by store
    static async fetchProductsByStore(storeId: number, token: string) {
        const response = await axios.get(
            `${config.URL}/stores/${storeId}/products`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data.data;
    }

    // 🔹 Create product
    static async createProduct({ formData, token }: CreateProductParams) {
        const response = await axios.post(
            `${config.URL}/products/create`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    }

    // 🔹 Delete product
    static async deleteProduct({ productId, token }: DeleteProductParams) {
        const response = await axios.delete(
            `${config.URL}/products/${productId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    }

    // 🔹 Update product
    static async updateProduct({
        productID,
        formData,
        token,
    }: {
        productID: number;
        formData: FormData;
        token: string;
    }) {
        const response = await axios.put(
            `${config.URL}/products/update/${productID}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    }
}

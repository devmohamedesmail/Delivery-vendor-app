import axios from "axios";
import { config } from "@/constants/config";

interface AcceptOrderParams {
    orderId: number;
    token: string;
}

interface CancelOrderParams {
    orderId: number;
    token: string;
}

export interface Order {
    id: number;
    user_id: number;
    restaurant_id: number;
    order: OrderItem[];
    status: OrderStatus;
    total_price: string;
    delivery_address: string;
    placed_at: string;
    delivered_at: string | null;
    phone: string | null;
    createdAt: string;
    updatedAt: string;
    restaurant: Restaurant;
    user?: User;
}

interface OrderItem {
    name: string;
    quantity: number;
    price: string;
}

interface Restaurant {
    id: number;
    name: string;
    address: string;
    phone: string;
}

interface User {
    id: number;
    name: string;
    email?: string;
    phone?: string;
}

export type OrderStatus =
    | "all"
    | "pending"
    | "accepted"
    | "preparing"
    | "on_the_way"
    | "delivered"
    | "cancelled";

export default class OrderController {
    /**
     * Fetch orders by store
     * @param storeId - The store ID
     * @param token - Authorization token
     * @returns Array of orders
     */
    static async fetchOrdersByStore(storeId: number, token: string): Promise<Order[]> {
        const response = await axios.get(
            `${config.URL}/orders/store/${storeId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data.data;
    }

    /**
     * Accept an order
     * @param orderId - The order ID
     * @param token - Authorization token
     * @returns Response data
     */
    static async acceptOrder({ orderId, token }: AcceptOrderParams) {
        const response = await axios.patch(
            `${config.URL}/orders/${orderId}/accept`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    }

    /**
     * Cancel an order
     * @param orderId - The order ID
     * @param token - Authorization token
     * @returns Response data
     */
    static async cancelOrder({ orderId, token }: CancelOrderParams) {
        const response = await axios.patch(
            `${config.URL}/orders/${orderId}/cancel`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    }
}

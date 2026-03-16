import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import axios from "axios";
import { config } from "@/constants/config";
import { useAuth } from "@/hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LOCATION_TASK = "background-location-task";

TaskManager.defineTask(LOCATION_TASK, async ({ data, error }) => {
    console.log("📍 Background location task trigg");
    if (error) {
        console.log('Error in location task:', error);
        return;
    }
    const token = await AsyncStorage.getItem('token');
console.log("🔑 Token:", token);
    if (data) {
        const { locations }: any = data;
        const location = locations[0];

        console.log("📌 Latitude:", location.coords.latitude);
        console.log("📌 Longitude:", location.coords.longitude);

        try {
            console.log("📍 Sending location to API...", token);
            const res = await axios.post(
                `https://tawsila-app.onrender.com/api/v1/delivery-locations/location`,
                {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("✅ Location sent successfully:", res.status);
        } catch (err) {
            console.log("❌ API error:", err);
        }
    }
});

export default LOCATION_TASK;
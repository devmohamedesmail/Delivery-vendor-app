import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { config } from "@/constants/config";

const LOCATION_TASK = "background-location-task";

TaskManager.defineTask(LOCATION_TASK, async ({ data, error }) => {
    
    if (error) return;
    
    let token = await AsyncStorage.getItem('token');
    if (token && token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1); 
    }
    if (data) {
        const { locations }: any = data;
        const location = locations[0];


        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;

        try {
            const addressResponse = await Location.reverseGeocodeAsync({
                latitude: latitude,
                longitude: longitude,
            });

            const address = addressResponse[0];

            const fullAddress = `${address.name || ""} ${address.street || ""}, ${address.city || ""}, ${address.country || ""}`;

            const res = await axios.post(
                `${config.URL}/delivery-locations/location`,
                {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    address: fullAddress,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
        } catch (err) {
            console.log("❌ API error:", err);
        }
    }
});

export default LOCATION_TASK;
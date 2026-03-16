import * as Location from "expo-location";
import LOCATION_TASK from "../tasks/locationTask";

export const startLocationTracking = async () => {

  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") return;

  const bg = await Location.requestBackgroundPermissionsAsync();
  if (bg.status !== "granted") return;

  await Location.startLocationUpdatesAsync(LOCATION_TASK, {
    accuracy: Location.Accuracy.High,
    timeInterval: 300000,
    distanceInterval: 0,
  });
};

export const stopLocationTracking = async () => {
  await Location.stopLocationUpdatesAsync(LOCATION_TASK);
};
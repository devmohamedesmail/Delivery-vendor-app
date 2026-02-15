import React from "react";
import { View } from "react-native";
import Skeleton from "../ui/skeleton";

export default function OrderSkeleton() {
  return (
    <View className="px-3 my-3">
      <Skeleton width={"100%"} height={200} className="mb-3" />
      <Skeleton width={"100%"} height={200} className="mb-3" />
      <Skeleton width={"100%"} height={200} className="mb-3" />
      <Skeleton width={"100%"} height={200} className="mb-3" />
      <Skeleton width={"100%"} height={200} className="mb-3" />
      <Skeleton width={"100%"} height={200} className="mb-3" />
      <Skeleton width={"100%"} height={200} className="mb-3" />

    </View>
  );
}

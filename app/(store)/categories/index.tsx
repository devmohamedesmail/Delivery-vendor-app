import BottomPaper from "@/components/ui/bottom-paper";
import FloatButton from "@/components/ui/float-button";
import Header from "@/components/ui/header";
import Layout from "@/components/ui/layout";
import Loading from "@/components/ui/loading";
import CategoryController from "@/controllers/categories/contoller";
import { useAuth } from "@/hooks/useAuth";
import { useStore } from "@/hooks/useStore";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useColorScheme } from "nativewind";
import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

// ─── Types ────────────────────────────────────────────────────────────────────
type Category = {
  id: number;
  name: string;
  description?: string;
  image?: string;
};

// ─── Assigned Category Card ───────────────────────────────────────────────────
function AssignedCategoryCard({ category }: { category: Category }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View
      style={[
        styles.assignedCard,
        { backgroundColor: isDark ? "#1a1a1a" : "#fff", borderColor: isDark ? "#2a2a2a" : "#f0f0f0" },
      ]}
    >
      {category.image ? (
        <Image source={{ uri: category.image }} style={styles.assignedCardImage} />
      ) : (
        <View style={[styles.assignedCardPlaceholder, { backgroundColor: isDark ? "#333" : "#f5f5f5" }]}>
          <Ionicons name="grid-outline" size={24} color="#fd4a12" />
        </View>
      )}
      <Text
        style={[styles.assignedCardName, { color: isDark ? "#fff" : "#111" }]}
        numberOfLines={2}
      >
        {category.name}
      </Text>
    </View>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({ onPress, isDark }: { onPress: () => void; isDark: boolean }) {
  return (
    <View style={styles.emptyContainer}>
      <Ionicons name="grid-outline" size={60} color="#fd4a12" style={{ opacity: 0.4 }} />
      <Text style={[styles.emptyTitle, { color: isDark ? "#ccc" : "#555" }]}>No categories assigned</Text>
      <Text style={[styles.emptySubtitle, { color: isDark ? "#888" : "#999" }]}>
        Tap the button below to pick categories for your store
      </Text>
      <TouchableOpacity style={styles.emptyButton} onPress={onPress}>
        <Text style={styles.emptyButtonText}>Assign Categories</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function Categories() {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const { store } = useStore();
  const queryClient = useQueryClient();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // ── 1. Fetch store's currently assigned categories ──────────────────────────
  const {
    data: assignedCategories = [],
    isLoading: isLoadingAssigned,
    refetch: refetchAssigned,
  } = useQuery<Category[]>({
    queryKey: ["store-categories", store?.id],
    queryFn: () => CategoryController.fetchAssignedCategories(store.id, auth.token),
    enabled: !!store?.id && !!auth?.token,
  });

  // ── 2. Fetch all categories for this store type ─────────────────────────────
  const {
    data: allCategories = [],
    isLoading: isLoadingAll,
  } = useQuery<Category[]>({
    queryKey: ["categories-by-type", store?.store_type_id],
    queryFn: () => CategoryController.fetchCategoriesByStoreType(store.store_type_id, auth.token),
    enabled: !!store?.store_type_id && !!auth?.token,
  });

  // ── 3. Assign mutation ──────────────────────────────────────────────────────
  const assignMutation = useMutation({
    mutationFn: (ids: number[]) =>
      CategoryController.assignCategoriesToStore(store.id, ids, auth.token),
    onSuccess: () => {
      Toast.show({ type: "success", text1: "Categories saved successfully" });
      queryClient.invalidateQueries({ queryKey: ["store-categories", store?.id] });
      bottomSheetRef.current?.close();
    },
    onError: () => {
      Toast.show({ type: "error", text1: "Failed to save categories" });
    },
  });

  // ── Filtered categories for search ─────────────────────────────────────────
  const filteredCategories = useMemo(
    () =>
      allCategories.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      ),
    [allCategories, search]
  );

  // ── Open sheet & pre-select already-assigned ids ────────────────────────────
  const openSheet = () => {
    setSearch("");
    setSelectedIds(assignedCategories.map((c) => c.id));
    bottomSheetRef.current?.expand();
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetchAssigned();
    } catch (e) {
      console.error(e);
    } finally {
      setRefreshing(false);
    }
  };

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <Layout>
        <Header title={t("categories.categories")} />

        {/* Count badge */}
        <View style={styles.topBar}>
          <View style={[styles.countBadge, { backgroundColor: isDark ? "#1a1a1a" : "#fff4f0" }]}>
            <Text style={styles.countText}>{assignedCategories.length}</Text>
            <Text style={[styles.countLabel, { color: isDark ? "#aaa" : "#888" }]}>assigned</Text>
          </View>
        </View>

        {/* Assigned categories grid */}
        {isLoadingAssigned ? (
          <Loading />
        ) : (
          <FlatList
            data={assignedCategories}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.grid}
            renderItem={({ item }) => <AssignedCategoryCard category={item} />}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#fd4a12"]}
              />
            }
            ListEmptyComponent={
              <EmptyState onPress={openSheet} isDark={isDark} />
            }
          />
        )}

        <FloatButton onPress={openSheet} />
      </Layout>

      {/* ── Bottom Sheet: pick categories ─────────────────────────────────── */}
      <BottomPaper ref={bottomSheetRef} snapPoints={["70%"]}>
        <View style={styles.sheetContainer}>
          {/* Sheet header */}
          <View style={styles.sheetHeader}>
            <Text style={[styles.sheetTitle, { color: isDark ? "#fff" : "#111" }]}>
              Assign Categories
            </Text>
            <TouchableOpacity onPress={() => bottomSheetRef.current?.close()}>
              <AntDesign name="close" size={22} color={isDark ? "#ccc" : "#555"} />
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View style={[styles.searchBar, { backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5" }]}>
            <Ionicons name="search" size={18} color="#fd4a12" style={{ marginRight: 8 }} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search categories..."
              placeholderTextColor={isDark ? "#666" : "#aaa"}
              style={[styles.searchInput, { color: isDark ? "#fff" : "#111" }]}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch("")}>
                <AntDesign name="close" size={16} color="#aaa" />
              </TouchableOpacity>
            )}
          </View>

          {/* Selection count */}
          {selectedIds.length > 0 && (
            <Text style={styles.selectionCount}>
              {selectedIds.length} selected
            </Text>
          )}

          {/* Categories list */}
          {isLoadingAll ? (
            <ActivityIndicator color="#fd4a12" style={{ marginTop: 20 }} />
          ) : (
            <FlatList
              data={filteredCategories}
              keyExtractor={(item) => item.id.toString()}
              style={{ flex: 1 }}
              contentContainerStyle={styles.sheetList}
              ListEmptyComponent={
                <Text style={{ textAlign: "center", color: "#aaa", marginTop: 24 }}>
                  No categories found
                </Text>
              }
              renderItem={({ item }) => {
                const isSelected = selectedIds.includes(item.id);
                return (
                  <TouchableOpacity
                    onPress={() => toggleSelect(item.id)}
                    style={[
                      styles.categoryRow,
                      {
                        backgroundColor: isSelected
                          ? isDark ? "#2a1a15" : "#fff4f0"
                          : isDark ? "#111" : "#fff",
                        borderColor: isSelected ? "#fd4a12" : isDark ? "#222" : "#eee",
                      },
                    ]}
                  >
                    {item.image ? (
                      <Image source={{ uri: item.image }} style={styles.categoryRowImage} />
                    ) : (
                      <View style={[styles.categoryRowPlaceholder, { backgroundColor: isDark ? "#333" : "#f0f0f0" }]}>
                        <Ionicons name="grid-outline" size={20} color="#fd4a12" />
                      </View>
                    )}
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[styles.categoryRowName, { color: isDark ? "#fff" : "#111" }]}
                        numberOfLines={1}
                      >
                        {item.name}
                      </Text>
                      {item.description ? (
                        <Text
                          style={[styles.categoryRowDesc, { color: isDark ? "#888" : "#aaa" }]}
                          numberOfLines={1}
                        >
                          {item.description}
                        </Text>
                      ) : null}
                    </View>
                    <View
                      style={[
                        styles.checkbox,
                        {
                          backgroundColor: isSelected ? "#fd4a12" : "transparent",
                          borderColor: isSelected ? "#fd4a12" : isDark ? "#444" : "#ccc",
                        },
                      ]}
                    >
                      {isSelected && (
                        <AntDesign name="check" size={14} color="#fff" />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}

          {/* Save button */}
          <TouchableOpacity
            style={[
              styles.saveButton,
              assignMutation.isPending && { opacity: 0.7 },
            ]}
            onPress={() => assignMutation.mutate(selectedIds)}
            disabled={assignMutation.isPending}
          >
            {assignMutation.isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveButtonText}>
                Save ({selectedIds.length})
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </BottomPaper>
    </>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  topBar: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  countBadge: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  countText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fd4a12",
  },
  countLabel: {
    fontSize: 13,
    fontWeight: "500",
  },
  grid: {
    padding: 12,
    paddingBottom: 100,
  },
  // Assigned card
  assignedCard: {
    flex: 1,
    margin: 6,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  assignedCardImage: {
    width: "100%",
    height: 110,
    resizeMode: "cover",
  },
  assignedCardPlaceholder: {
    width: "100%",
    height: 110,
    alignItems: "center",
    justifyContent: "center",
  },
  assignedCardName: {
    fontSize: 13,
    fontWeight: "600",
    padding: 10,
    textAlign: "center",
  },
  // Empty state
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 16,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
    lineHeight: 20,
  },
  emptyButton: {
    marginTop: 24,
    backgroundColor: "#fd4a12",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  // Sheet
  sheetContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  selectionCount: {
    fontSize: 12,
    color: "#fd4a12",
    fontWeight: "600",
    marginBottom: 6,
    marginLeft: 4,
  },
  sheetList: {
    paddingBottom: 16,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    marginBottom: 8,
    gap: 10,
  },
  categoryRowImage: {
    width: 48,
    height: 48,
    borderRadius: 10,
    resizeMode: "cover",
  },
  categoryRowPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryRowName: {
    fontSize: 14,
    fontWeight: "600",
  },
  categoryRowDesc: {
    fontSize: 12,
    marginTop: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButton: {
    backgroundColor: "#fd4a12",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 12,
    shadowColor: "#fd4a12",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

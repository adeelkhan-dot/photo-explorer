import React, { useCallback, useState } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import FavoriteItem from "./FavoriteItem";
import { useFavorites } from "../../hooks/useFavorites";
import Animated, { FadeIn } from "react-native-reanimated";


export default function FavoritesScreen() {
  const { favorites, loading, removeFavorite, loadFavorites } = useFavorites();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 900));
    await loadFavorites();
    setRefreshing(false);
  };

  const openPreview = (item:any) => {
console.log('Preview')
  };

  if (!loading && favorites.length === 0)
    return (
      <Animated.View
        entering={FadeIn.duration(300)}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ fontSize: 16, color: "#666" }}>No favorites yet</Text>
        <Text style={{ marginTop: 4, color: "#999" }}>
          Add some from your Feed
        </Text>
      </Animated.View>
    );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item, index }) => (
          <FavoriteItem
            item={item}
            index={index}
            onPress={() => openPreview(item)}
            onDelete={() => removeFavorite(item.id)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

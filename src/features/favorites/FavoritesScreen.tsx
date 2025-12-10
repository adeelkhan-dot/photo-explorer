import React, { useCallback, useState } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import FavoriteItem from "./FavoriteItem";
import { useFavorites } from "../../hooks/useFavorites";
import Animated, { FadeIn } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../constants/screen";
import { FavoriteItemType, RootStackParamList } from "../../types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { COLORS } from "../../constants/colors";

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function FavoritesScreen() {
  const navigation = useNavigation<Nav>();
  const { favorites, loading, removeFavorite, loadFavorites } = useFavorites();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 900));
    await loadFavorites();
    setRefreshing(false);
  };
  

  const openPreview = (item: FavoriteItemType) => {
    const photo = {
      id: item.id,
      author: item?.author || "Unknown",
      width: 0,
      height: 0,
      url: item.uri,
      download_url: item.uri,
    };
    navigation.navigate(SCREEN_NAMES.PHOTO_DETAIL_MODAL, { photo });
  };

  if (!loading && favorites.length === 0)
    return (
      <Animated.View
        entering={FadeIn.duration(300)}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ fontSize: 16, color: "#666" }}>No favorites yet</Text>
        <Text style={{ marginTop: 4, color:COLORS.TEXT_GRAY_LIGHTER }}>
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

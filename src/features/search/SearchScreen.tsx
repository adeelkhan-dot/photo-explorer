import React, { useCallback } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import SearchResultItem from "./SearchResultItem";
import { useSearch } from "../../hooks/useSearch";
import Animated, { FadeIn } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { PicsumPhoto } from "../../api/api";

export default function SearchScreen() {
  const navigation = useNavigation<any>();
  const { query, search, results, loading, searching, error, refetch } = useSearch();

  const onRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const openPreview = useCallback((item: PicsumPhoto) => {
    navigation.navigate("PhotoDetailModal", { photo: item });
  }, [navigation]);

  const renderItem = useCallback(({ item, index }: { item: PicsumPhoto; index: number }) => (
    <SearchResultItem
      item={item}
      index={index}
      onPress={() => openPreview(item)}
    />
  ), [openPreview]);

  const keyExtractor = useCallback((item: PicsumPhoto) => item.id, []);

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          value={query}
          onChangeText={search}
          placeholder="Search by author or ID..."
          placeholderTextColor="#999"
          style={styles.searchInput}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searching && (
          <ActivityIndicator
            size="small"
            color="#666"
            style={styles.searchLoader}
          />
        )}
      </View>

      {/* Error State */}
      {error && !loading && (
        <Animated.View entering={FadeIn} style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={refetch} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Empty Results */}
      {!loading && !error && results.length === 0 && query.trim() && (
        <Animated.View entering={FadeIn} style={styles.centerContainer}>
          <Text style={styles.emptyText}>No results found</Text>
          <Text style={styles.emptySubtext}>
            Try searching with a different term
          </Text>
        </Animated.View>
      )}

      {/* Empty State - No Search */}
      {!loading && !error && results.length === 0 && !query.trim() && (
        <Animated.View entering={FadeIn} style={styles.centerContainer}>
          <Text style={styles.emptyText}>Start searching</Text>
          <Text style={styles.emptySubtext}>
            Search by author name or photo ID
          </Text>
        </Animated.View>
      )}

      {/* Search Results */}
      <FlatList
        data={results}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        contentContainerStyle={[
          styles.listContent,
          results.length === 0 && styles.listContentEmpty,
        ]}
        ListEmptyComponent={null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  searchContainer: {
    position: "relative",
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: "#f0f0f0",
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    paddingRight: 50,
  },
  searchLoader: {
    position: "absolute",
    right: 16,
    top: 14,
  },
  errorContainer: {
    padding: 16,
    backgroundColor: "#fee",
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    color: "#c00",
    marginBottom: 12,
    fontSize: 14,
  },
  retryButton: {
    backgroundColor: "#c00",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  loadingText: {
    marginTop: 12,
    color: "#666",
    fontSize: 14,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  emptySubtext: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
  },
  listContent: {
    paddingBottom: 40,
  },
  listContentEmpty: {
    flexGrow: 1,
  },
});

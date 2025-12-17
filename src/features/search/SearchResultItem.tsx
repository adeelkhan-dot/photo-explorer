import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Image } from "expo-image";
import { PicsumPhoto } from "../../types/types";
import { COLORS } from "../../constants/colors";

type Props = {
  item: PicsumPhoto;
  index: number;
  onPress: (item: PicsumPhoto) => void;
};

function SearchResultItem({ item, index, onPress }: Props) {
  return (
    <Animated.View
      entering={FadeInUp.delay(index * 60).duration(500)}
      style={styles.container}
    >
      <TouchableOpacity onPress={()=>onPress(item)} activeOpacity={0.9}>
        <Image
          source={{ uri: item.download_url }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.author}>{item.author}</Text>
        <Text style={styles.id}>ID: {item.id}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: COLORS.WHITE,
    borderRadius: 14,
    overflow: "hidden",
    elevation: 3,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 220,
  },
  infoContainer: {
    padding: 12,
  },
  author: {
    fontWeight: "600",
    fontSize: 16,
  },
  id: {
    marginTop: 3,
    color: COLORS.TEXT_GRAY_MEDIUM,
    fontSize: 14,
  },
});

export default React.memo(SearchResultItem);

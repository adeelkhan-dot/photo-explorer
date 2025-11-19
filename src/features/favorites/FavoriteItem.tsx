import { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Animated, { FadeInUp, Keyframe, Easing, LinearTransition } from "react-native-reanimated";
import { Image } from "expo-image";
import type { FavoriteItem as Favorite } from "../../context/FavoritesContext";

type Props = {
  item: Favorite;
  onPress: () => void;
  onDelete: () => void;
  index: number;
};

export default function FavoriteItem({
  item,
  onPress,
  onDelete,
  index,
}: Props) {
  const [deleting, setDeleting] = useState(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    hasMounted.current = true;
  }, []);

  const handleDelete = () => {
    if (deleting) return;
    setDeleting(true);
    onDelete();
  };

  return (
    <Animated.View
      layout={LinearTransition.springify().damping(18).stiffness(180)}
      entering={
    hasMounted.current
      ? FadeInUp.delay(index * 50).duration(360).springify().damping(16)
      : FadeInUp.duration(220).easing(Easing.out(Easing.cubic))
      }
      exiting={removeExit}
      style={styles.card}
    >
      <TouchableOpacity onPress={onPress}>
        <Image
          source={{ uri: item.uri }}
          style={{ width: "100%", height: 220 }}
          contentFit="cover"
        />
      </TouchableOpacity>

      <View style={{ padding: 12 }}>
        <Text style={{ fontWeight: "600" }}>{item.author}</Text>
        <Text style={{ color: "#888", marginTop: 4 }}>
          Added: {new Date(item.createdAt).toLocaleDateString()}
        </Text>

        <TouchableOpacity
          onPress={handleDelete}
          disabled={deleting}
          style={[
            styles.removeButton,
            { opacity: deleting ? 0.35 : 1 },
          ]}
        >
          <Text style={styles.removeLabel}>
            Remove
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    elevation: 3,
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: "#ff4444",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  removeLabel: {
    color: "white",
    fontWeight: "700",
  },
});

const removeExit = new Keyframe({
  0: {
    opacity: 1,
    transform: [{ translateY: 0 }],
  },
  100: {
    opacity: 0,
    transform: [{ translateY: 2 }],
  },
}).duration(240);
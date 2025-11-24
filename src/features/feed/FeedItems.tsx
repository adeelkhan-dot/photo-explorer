import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { PicsumPhoto } from './types';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { useFavorites } from '../../hooks/useFavorites';
import { Ionicons } from '@expo/vector-icons';

type Props = { photo: PicsumPhoto; size: number; onPress: () => void };

export default function FeedItem({ photo, size, onPress }: Props) {
  const { addFavorite, removeFavorite, isFavorite, favorites } = useFavorites();
  const [liked, setLiked] = useState(isFavorite(photo.id));
  const scale = useSharedValue(1);

  useEffect(() => {
    const currentlyLiked = favorites.some(f => f.id === photo.id);
    setLiked(currentlyLiked);
  }, [favorites, photo.id]);

  const toggleLike = () => {
    scale.value = 1.5;
    scale.value = withSpring(1, { damping: 3, stiffness: 200 });
    const newLiked = !liked;
    setLiked(newLiked);
    if (newLiked) {
      addFavorite({ id: photo.id, uri: photo.download_url, author: photo.author, createdAt: new Date().toISOString() });
    } else {
      removeFavorite(photo.id);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const uri = `https://picsum.photos/id/${photo.id}/${Math.round(size)}/${Math.round(size)}`;
  return (
    <TouchableOpacity onPress={onPress} style={{ margin: 4 }}>
      <Image source={uri} style={{ width: size, height: size, borderRadius: 8 }} contentFit="cover" />
      <Animated.View style={[styles.heartContainer, animatedStyle]}>
        <TouchableOpacity onPress={toggleLike}>
          <Ionicons name={liked ? 'heart' : 'heart-outline'} size={24} color={liked ? 'red' : 'white'} />
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  heartContainer: { position: 'absolute', bottom: 8, right: 8 },
});

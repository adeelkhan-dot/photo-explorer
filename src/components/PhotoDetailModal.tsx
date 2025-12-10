import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import Animated, { SlideInUp } from 'react-native-reanimated';
import { Image } from 'expo-image';
import { fetchCommentsForPhoto } from '../api/api';
import { Comment, PicsumPhoto } from '../types/types';
import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');

type PhotoDetailModalRouteProp = RouteProp<
  { PhotoDetailModal: { photo: PicsumPhoto } },
  'PhotoDetailModal'
>;

export default function PhotoDetailModal() {
  const route = useRoute<PhotoDetailModalRouteProp>();
  const navigation = useNavigation();
  const { photo } = route.params;
  const [picsumPhoto, setPicsumPhoto] = useState<PicsumPhoto | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    (async () => {
      setPicsumPhoto(photo);
      if (photo) {
      const photoId = Number(photo.id);
      if (!isNaN(photoId)) {
        try {
          const c = await fetchCommentsForPhoto(photoId);
          setComments(c);
        } catch (error) {
          setComments([]);
        }
      } else {
        setComments([]);
        }
      }
    })();
  }, [photo]);

  if (!picsumPhoto)
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <Animated.View entering={SlideInUp.springify()} style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.closeButton}
      >
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>

      <Image source={{ uri: picsumPhoto.download_url }} style={styles.image} />

      <Text style={styles.authorText}>Author: {picsumPhoto.author}</Text>

      <FlatList
        data={comments}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Text style={styles.commentName}>{item.name}</Text>
            <Text style={styles.commentBody}>{item.body}</Text>
          </View>
        )}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.WHITE,  
    padding: 16 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  closeButtonText: {
    color: COLORS.SHADOW,
    fontSize: 18,
  },
  image: {
    width: width - 32,
    height: 320,
    borderRadius: 12,
  },
  authorText: {
    color: COLORS.SHADOW,
    fontSize: 16,
    marginTop: 8,
  },
  comment: { 
    paddingVertical: 6, 
    borderBottomColor: COLORS.BORDER,
    borderBottomWidth: 1 
  },
  commentName: { 
    color: COLORS.SHADOW,            
    fontWeight: '600' 
  },
  commentBody: { 
    color: COLORS.TEXT_SECONDARY,              
  },
});
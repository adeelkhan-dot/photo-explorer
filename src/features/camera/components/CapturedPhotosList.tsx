import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown, SlideInUp } from 'react-native-reanimated';
import { CapturedPhoto } from '../hooks/useCamera';

interface CapturedPhotosListProps {
  capturedPhotos: CapturedPhoto[];
  openPhotoDetail: (photo: CapturedPhoto) => void;
}

export default function CapturedPhotosList({ capturedPhotos, openPhotoDetail }: CapturedPhotosListProps) {
  if (capturedPhotos.length === 0) return null;

  return (
    <Animated.View entering={SlideInUp.springify()} style={styles.photosSection}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.photosScroll}>
        {capturedPhotos.map((photo, index) => (
          <Animated.View key={photo.id} entering={FadeInDown.delay(index * 50)}>
            <TouchableOpacity style={styles.photoThumbnail} onPress={() => openPhotoDetail(photo)}>
              <Image source={{ uri: photo.uri }} style={styles.thumbnailImage} contentFit="cover" />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  photosSection: { backgroundColor: '#1a1a1a', paddingTop: 5, paddingBottom: 50, borderTopWidth: 1, borderTopColor: '#333' },
  photosScroll: { paddingHorizontal: 16, gap: 12 },
  photoThumbnail: { width: 80, height: 80, borderRadius: 8, overflow: 'hidden', backgroundColor: '#2a2a2a' },
  thumbnailImage: { width: '100%', height: '100%' },
});

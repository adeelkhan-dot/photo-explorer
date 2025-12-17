import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../constants/colors';

interface GalleryProps {
  galleryPermission: any;
  handlePickFromGallery: () => void;
}

export default function GallerySection({ galleryPermission, handlePickFromGallery }: GalleryProps) {
  if (!galleryPermission?.granted) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Gallery Permission Required</Text>
      </View>
    );
  }

  return (
    <View style={styles.galleryContainer}>
      <View style={styles.galleryContent}>
        <Ionicons name="images-outline" size={64} color={COLORS.PRIMARY_IOS} />
        <Text style={styles.galleryTitle}>Select Photo from Gallery</Text>
        <Text style={styles.gallerySubtitle}>Choose a photo from your device's photo library</Text>

        <TouchableOpacity style={styles.galleryButton} onPress={handlePickFromGallery}>
          <Ionicons name="images-outline" size={24} color={COLORS.WHITE} />
          <Text style={styles.galleryButtonText}>Open Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  galleryContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.BACKGROUND_DARK },
  galleryContent: { alignItems: 'center', padding: 24 },
  galleryTitle: { marginTop: 24, color: COLORS.WHITE, fontSize: 20, fontWeight: '600', textAlign: 'center' },
  gallerySubtitle: { marginTop: 8, color: COLORS.TEXT_GRAY_LIGHTER, fontSize: 14, textAlign: 'center', marginBottom: 32 },
  galleryButton: { flexDirection: 'row', alignItems: 'center', backgroundColor:COLORS.PRIMARY_IOS, paddingVertical: 16, paddingHorizontal: 32, borderRadius: 12, gap: 12 },
  galleryButtonText: { color: COLORS.WHITE, fontSize: 16, fontWeight: '600' },

  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.BACKGROUND_DARK, padding: 24 },
  errorText: { color: COLORS.TEXT_GRAY_LIGHTER, fontSize: 14, textAlign: 'center', lineHeight: 20 },

});

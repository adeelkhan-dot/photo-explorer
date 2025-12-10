import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';

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
        <Ionicons name="images-outline" size={64} color="#007AFF" />
        <Text style={styles.galleryTitle}>Select Photo from Gallery</Text>
        <Text style={styles.gallerySubtitle}>Choose a photo from your device's photo library</Text>

        <TouchableOpacity style={styles.galleryButton} onPress={handlePickFromGallery}>
          <Ionicons name="images-outline" size={24} color="#fff" />
          <Text style={styles.galleryButtonText}>Open Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  galleryContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a' },
  galleryContent: { alignItems: 'center', padding: 24 },
  galleryTitle: { marginTop: 24, color: '#fff', fontSize: 20, fontWeight: '600', textAlign: 'center' },
  gallerySubtitle: { marginTop: 8, color: '#999', fontSize: 14, textAlign: 'center', marginBottom: 32 },
  galleryButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#007AFF', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 12, gap: 12 },
  galleryButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a', padding: 24 },
  errorText: { color: '#999', fontSize: 14, textAlign: 'center', lineHeight: 20 },

});

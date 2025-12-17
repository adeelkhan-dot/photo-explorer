import { View } from 'react-native';
import useCamera from './hooks/useCamera';
import { StyleSheet } from 'react-native';
import CameraTabs from './components/CameraTabs';
import CameraViewSection from './components/CameraViewSection';
import GallerySection from './components/GallerySection';
import CapturedPhotosList from './components/CapturedPhotosList';
import { COLORS } from '../../constants/colors';

export default function CameraScreen() {
  const {
    activeTab,
    setActiveTab,
    cameraProps,
    galleryProps,
    photosListProps
  } = useCamera();

  return (
    <View style={styles.container}>
      <CameraTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <View style={styles.contentContainer}>
        {activeTab === 'camera'
          ? <CameraViewSection {...cameraProps} />
          : <GallerySection {...galleryProps} />}
      </View>

      <CapturedPhotosList {...photosListProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.SHADOW },
  contentContainer: { flex: 1, marginBottom: 10 },
});

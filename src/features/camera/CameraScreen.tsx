import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { Image } from 'expo-image';
import Animated, { FadeIn, FadeInDown, SlideInUp } from 'react-native-reanimated';
import { useFavorites } from '../../hooks/useFavorites';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

type CapturedPhoto = {
  id: string;
  uri: string;
  author: string;
  createdAt: string;
};

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [galleryPermission, requestGalleryPermission] = ImagePicker.useMediaLibraryPermissions();
  const [capturedPhotos, setCapturedPhotos] = useState<CapturedPhoto[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [activeTab, setActiveTab] = useState<'camera' | 'gallery'>('camera');
  const cameraRef = useRef<CameraView>(null);
  const { addFavorite } = useFavorites();
  const navigation = useNavigation<any>();

  useEffect(() => {
    // Request permissions on mount
    if (!cameraPermission?.granted) {
      requestCameraPermission();
    }
    if (!galleryPermission?.granted) {
      requestGalleryPermission();
    }

    // Check if camera is available (emulators/simulators don't have cameras)
    // We'll detect this when trying to use the camera
    setIsCameraReady(false);
  }, []);

  // Reset camera ready state when switching to camera tab
  useEffect(() => {
    if (activeTab === 'camera') {
      setIsCameraReady(false);
    }
  }, [activeTab]);

  const savePhotoToStorage = async (uri: string): Promise<string> => {
    const fileName = `photo_${Date.now()}.jpg`;
    console.log('File system : ',FileSystem.documentDirectory)
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    await FileSystem.copyAsync({
      from: uri,
      to: fileUri,
    });
    return fileUri;
  };

  const handleTakePhoto = useCallback(async () => {
    if (!cameraRef.current) return;

    if (!cameraPermission?.granted) {
      Alert.alert(
        'Camera Permission Required',
        'Please allow camera access in settings to take photos.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => requestCameraPermission() },
        ]
      );
      return;
    }

    if (!isCameraReady) return;

    try {
      setIsCapturing(true);

      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
        skipProcessing: false,
      });

      if (photo?.uri) {
        const savedUri = await savePhotoToStorage(photo.uri);
        const newPhoto: CapturedPhoto = {
          id: `captured_${Date.now()}`,
          uri: savedUri,
          author: 'You',
          createdAt: new Date().toISOString(),
        };

        setCapturedPhotos(prev => [newPhoto, ...prev]);

        // Automatically add to favorites
        await addFavorite({
          id: newPhoto.id,
          uri: newPhoto.uri,
          author: newPhoto.author,
          createdAt: newPhoto.createdAt,
        });

        Alert.alert('Success', 'Photo captured and added to favorites!');
      }
    } catch (error: any) {
      console.error('Error taking photo:', error);
      const errorMessage = error?.message || 'Unknown error';

      // Check if camera is unavailable (common on emulators)
      if (errorMessage.includes('camera') || errorMessage.includes('not available') || errorMessage.includes('No camera')) {
        Alert.alert(
          'Camera Not Available',
          'Camera is not available on this device (emulators/simulators don\'t have cameras). Please use the Gallery tab to select photos.',
          [
            { text: 'OK', onPress: () => setActiveTab('gallery') },
          ]
        );
      } else {
        Alert.alert('Error', 'Failed to capture photo. Please try again.');
      }
    } finally {
      setIsCapturing(false);
    }
  }, [cameraPermission?.granted, isCameraReady, addFavorite]);


  const handlePickFromGallery = async () => {
    if (!galleryPermission?.granted) {
      const result = await requestGalleryPermission();
      if (!result.granted) {
        Alert.alert(
          'Gallery Permission Required',
          'Please allow photo library access in settings to select photos.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => requestGalleryPermission() },
          ]
        );
        return;
      }
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        const savedUri = await savePhotoToStorage(asset.uri);
        const newPhoto: CapturedPhoto = {
          id: `gallery_${Date.now()}`,
          uri: savedUri,
          author: 'You',
          createdAt: new Date().toISOString(),
        };

        setCapturedPhotos(prev => [newPhoto, ...prev]);

        await addFavorite({
          id: newPhoto.id,
          uri: newPhoto.uri,
          author: newPhoto.author,
          createdAt: newPhoto.createdAt,
        });

        Alert.alert('Success', 'Photo selected and added to favorites!');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to select photo. Please try again.');
    }
  };

  const toggleCameraFacing = () => {
    setIsCameraReady(false);
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const openPhotoDetail = (photo: CapturedPhoto) => {
    const photoForModal = {
      id: photo.id,
      author: photo.author,
      width: 0,
      height: 0,
      url: photo.uri,
      download_url: photo.uri,
    };
    navigation.navigate('PhotoDetailModal', { photo: photoForModal });
  };

  const renderCameraView = () => {
    if (!cameraPermission) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Checking camera permissions...</Text>
        </View>
      );
    }

    if (!cameraPermission.granted) {
      return (
        <Animated.View entering={FadeIn} style={styles.centerContainer}>
          <Ionicons name="camera-outline" size={64} color="#999" />
          <Text style={styles.errorTitle}>Camera Permission Required</Text>
          <Text style={styles.errorText}>
            Please allow camera access to take photos.
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestCameraPermission}
          >
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.permissionButton, styles.secondaryButton]}
            onPress={() => setActiveTab('gallery')}
          >
            <Text style={styles.secondaryButtonText}>Use Gallery Instead</Text>
          </TouchableOpacity>
        </Animated.View>
      );
    }

    return (
      <View style={styles.cameraContainer}>
        <CameraView
          key={facing}
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          onCameraReady={() => {
            setTimeout(() => {
              setIsCameraReady(true);
            }, 300);
          }}
          onMountError={(error) => {
            console.error('Camera mount error:', error);
            setIsCameraReady(false);
          }}
        >
          <View style={styles.cameraOverlay}>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={toggleCameraFacing}
            >
              <Ionicons name="camera-reverse-outline" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </CameraView>
        <View style={styles.cameraControls}>
          {!isCameraReady && (
            <View style={styles.readyIndicator}>
              <Text style={styles.readyText}>Preparing camera...</Text>
            </View>
          )}
          <TouchableOpacity
            style={[
              styles.captureButton,
              (isCapturing || !isCameraReady) && styles.captureButtonDisabled
            ]}
            onPress={handleTakePhoto}
            disabled={isCapturing || !isCameraReady}
          >
            {isCapturing ? (
              <ActivityIndicator color="white" />
            ) : (
              <View style={styles.captureButtonInner} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderGalleryView = () => {
    if (!galleryPermission) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Checking gallery permissions...</Text>
        </View>
      );
    }

    if (!galleryPermission.granted) {
      return (
        <Animated.View entering={FadeIn} style={styles.centerContainer}>
          <Ionicons name="images-outline" size={64} color="#999" />
          <Text style={styles.errorTitle}>Gallery Permission Required</Text>
          <Text style={styles.errorText}>
            Please allow photo library access to select photos.
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestGalleryPermission}
          >
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </Animated.View>
      );
    }

    return (
      <View style={styles.galleryContainer}>
        <Animated.View entering={FadeIn} style={styles.galleryContent}>
          <Ionicons name="images-outline" size={64} color="#007AFF" />
          <Text style={styles.galleryTitle}>Select Photo from Gallery</Text>
          <Text style={styles.gallerySubtitle}>
            Choose a photo from your device's photo library
          </Text>
          <TouchableOpacity
            style={styles.galleryButton}
            onPress={handlePickFromGallery}
          >
            <Ionicons name="images-outline" size={24} color="#007AFF" />
            <Text style={styles.galleryButtonText}>Open Gallery</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Tab Switcher */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'camera' && styles.tabActive]}
          onPress={() => setActiveTab('camera')}
        >
          <Ionicons
            name="camera"
            size={20}
            color={activeTab === 'camera' ? '#007AFF' : '#999'}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'camera' && styles.tabTextActive,
            ]}
          >
            Camera
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'gallery' && styles.tabActive]}
          onPress={() => setActiveTab('gallery')}
        >
          <Ionicons
            name="images"
            size={20}
            color={activeTab === 'gallery' ? '#007AFF' : '#999'}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'gallery' && styles.tabTextActive,
            ]}
          >
            Gallery
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        {activeTab === 'camera' ? renderCameraView() : renderGalleryView()}
      </View>

      {/* Captured Photos List */}
      {capturedPhotos.length > 0 && (
        <Animated.View entering={SlideInUp.springify()} style={styles.photosSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.photosScroll}
          >
            {capturedPhotos.map((photo, index) => (
              <Animated.View
                key={photo.id}
                entering={FadeInDown.delay(index * 50)}
              >
                <TouchableOpacity
                  style={styles.photoThumbnail}
                  onPress={() => openPhotoDetail(photo)}
                >
                  <Image
                    source={{ uri: photo.uri }}
                    style={styles.thumbnailImage}
                    contentFit="cover"
                  />
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 16,
    gap: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  tabActive: {
    backgroundColor: '#2a2a2a',
  },
  tabText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#007AFF',
  },
  contentContainer: {
    flex: 1,
    marginBottom: 10,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 16,
  },
  flipButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 24,
    padding: 12,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  readyIndicator: {
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
  },
  readyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#333',
  },
  captureButtonDisabled: {
    opacity: 0.6,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  galleryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  galleryContent: {
    alignItems: 'center',
    padding: 24,
  },
  galleryTitle: {
    marginTop: 24,
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  gallerySubtitle: {
    marginTop: 8,
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
  },
  galleryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    gap: 12,
  },
  galleryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 24,
  },
  loadingText: {
    marginTop: 16,
    color: '#999',
    fontSize: 14,
  },
  errorTitle: {
    marginTop: 24,
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorText: {
    marginTop: 8,
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  permissionButton: {
    marginTop: 24,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    marginTop: 12,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  photosSection: {
    backgroundColor: '#1a1a1a',
    paddingTop: 5,
    paddingBottom: 50,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  photosSectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    paddingHorizontal: 16,
  },
  photosScroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  photoThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#2a2a2a',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
});


import { useState, useRef, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { useFavorites } from '../../../hooks/useFavorites';
import { useNavigation } from '@react-navigation/native';
import { SCREEN_NAMES } from '../../../constants/screen';

export type CapturedPhoto = {
  id: string;
  uri: string;
  author: string;
  createdAt: string;
};

export default function useCamera() {
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
    if (!cameraPermission?.granted) requestCameraPermission();
    if (!galleryPermission?.granted) requestGalleryPermission();
    setIsCameraReady(false);
  }, []);

  useEffect(() => {
    if (activeTab === 'camera') setIsCameraReady(false);
  }, [activeTab]);

  const savePhotoToStorage = async (uri: string) => {
    const fileName = `photo_${Date.now()}.jpg`;
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    await FileSystem.copyAsync({ from: uri, to: fileUri });
    return fileUri;
  };

  const handleTakePhoto = useCallback(async () => {
    if (!cameraRef.current) return;

    if (!cameraPermission?.granted) {
      Alert.alert(
        'Camera Permission Required',
        'Please allow camera access.',
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

      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
      if (photo?.uri) {
        const savedUri = await savePhotoToStorage(photo.uri);
        const newPhoto: CapturedPhoto = {
          id: `captured_${Date.now()}`,
          uri: savedUri,
          author: 'You',
          createdAt: new Date().toISOString(),
        };

        setCapturedPhotos(prev => [newPhoto, ...prev]);

        await addFavorite(newPhoto);

        Alert.alert('Success', 'Photo captured and added to favorites!');
      }
    } catch (error: any) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to capture photo.');
    } finally {
      setIsCapturing(false);
    }
  }, [cameraPermission?.granted, isCameraReady, addFavorite]);

  const handlePickFromGallery = useCallback(async () => {
    if (!galleryPermission?.granted) {
      const result = await requestGalleryPermission();
      if (!result.granted) return;
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
        await addFavorite(newPhoto);
        Alert.alert('Success', 'Photo selected and added to favorites!');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to select photo.');
    }
  }, [galleryPermission?.granted, addFavorite]);

  const toggleCameraFacing = () => setFacing(current => (current === 'back' ? 'front' : 'back'));

  const openPhotoDetail = (photo: CapturedPhoto) => {
    const photoForModal = { id: photo.id, author: photo.author, width: 0, height: 0, url: photo.uri, download_url: photo.uri };
    navigation.navigate(SCREEN_NAMES.PHOTO_DETAIL_MODAL, { photo: photoForModal });
  };

  return {
    activeTab,
    setActiveTab,
    cameraProps: { cameraRef, facing, isCameraReady, isCapturing, handleTakePhoto, toggleCameraFacing, cameraPermission, setIsCameraReady },
    galleryProps: { galleryPermission, handlePickFromGallery },
    photosListProps: { capturedPhotos, openPhotoDetail },
  };
}

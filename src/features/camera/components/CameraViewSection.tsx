import React from 'react';
import { CameraView } from 'expo-camera';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';

interface CameraViewProps {
  cameraRef: React.RefObject<CameraView| null>;
  facing: 'back' | 'front';
  isCameraReady: boolean;
  isCapturing: boolean;
  handleTakePhoto: () => void;
  toggleCameraFacing: () => void;
  cameraPermission: any;
  setIsCameraReady: (ready: boolean) => void;
}

export default function CameraViewSection(props: CameraViewProps) {
  const { cameraRef, facing, isCameraReady, isCapturing, handleTakePhoto, toggleCameraFacing, cameraPermission, setIsCameraReady } = props;

  if (!cameraPermission?.granted) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Camera Permission Required</Text>
      </View>
    );
  }

  return (
    <View style={styles.cameraContainer}>
      <CameraView
        key={facing}
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        onCameraReady={() => setTimeout(() => setIsCameraReady(true), 300)}
      >
        <View style={styles.cameraOverlay}>
          <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
            <Ionicons name="camera-reverse-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>

      <View style={styles.cameraControls}>
        {!isCameraReady && <Text style={styles.readyText}>Preparing camera...</Text>}
        <TouchableOpacity
          style={[styles.captureButton, (!isCameraReady || isCapturing) && styles.captureButtonDisabled]}
          onPress={handleTakePhoto}
          disabled={!isCameraReady || isCapturing}
        >
          {isCapturing ? <ActivityIndicator color="white" /> : <View style={styles.captureButtonInner} />}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({


  cameraContainer: { flex: 1 },
  camera: { flex: 1 },
  cameraOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-start', alignItems: 'flex-end', padding: 16 },
  flipButton: { backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 24, padding: 12 },
  cameraControls: { position: 'absolute', bottom: 40, left: 0, right: 0, alignItems: 'center' },
  readyText: { color: '#fff', fontSize: 12, fontWeight: '500', marginBottom: 12 },
  captureButton: { width: 70, height: 70, borderRadius: 35, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: '#333' },
  captureButtonDisabled: { opacity: 0.6 },
  captureButtonInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'white' },

  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a', padding: 24 },
  errorText: { color: '#999', fontSize: 14, textAlign: 'center', lineHeight: 20 },
});

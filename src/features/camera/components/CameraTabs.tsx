import { StyleSheet } from 'react-native';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CameraTabsProps {
  activeTab: 'camera' | 'gallery';
  setActiveTab: (tab: 'camera' | 'gallery') => void;
}

export default function CameraTabs({ activeTab, setActiveTab }: CameraTabsProps) {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'camera' && styles.tabActive]}
        onPress={() => setActiveTab('camera')}
      >
        <Ionicons name="camera" size={20} color={activeTab === 'camera' ? '#007AFF' : '#999'} />
        <Text style={[styles.tabText, activeTab === 'camera' && styles.tabTextActive]}>Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === 'gallery' && styles.tabActive]}
        onPress={() => setActiveTab('gallery')}
      >
        <Ionicons name="images" size={20} color={activeTab === 'gallery' ? '#007AFF' : '#999'} />
        <Text style={[styles.tabText, activeTab === 'gallery' && styles.tabTextActive]}>Gallery</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: { flexDirection: 'row', backgroundColor: '#1a1a1a', padding: 8, paddingHorizontal: 16, gap: 8 },
  tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 8, gap: 6 },
  tabActive: { backgroundColor: '#2a2a2a' },
  tabText: { color: '#999', fontSize: 14, fontWeight: '500' },
  tabTextActive: { color: '#007AFF' },
});

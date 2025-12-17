import { StyleSheet } from 'react-native';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';

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
        <Ionicons name="camera" size={20} color={activeTab === 'camera' ? COLORS.PRIMARY_IOS : COLORS.TEXT_GRAY_LIGHTER} />
        <Text style={[styles.tabText, activeTab === 'camera' && styles.tabTextActive]}>Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === 'gallery' && styles.tabActive]}
        onPress={() => setActiveTab('gallery')}
      >
        <Ionicons name="images" size={20} color={activeTab === 'gallery' ?COLORS.PRIMARY_IOS : COLORS.TEXT_GRAY_LIGHTER} />
        <Text style={[styles.tabText, activeTab === 'gallery' && styles.tabTextActive]}>Gallery</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: { flexDirection: 'row', backgroundColor: COLORS.BACKGROUND_DARK, padding: 8, paddingHorizontal: 16, gap: 8 },
  tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 8, gap: 6 },
  tabActive: { backgroundColor: COLORS.BACKGROUND_DARK_SECONDARY },
  tabText: { color: COLORS.TEXT_GRAY_LIGHTER, fontSize: 14, fontWeight: '500' },
  tabTextActive: { color: COLORS.PRIMARY_IOS},
});

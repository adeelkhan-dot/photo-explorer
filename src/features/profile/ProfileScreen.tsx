import { View, ActivityIndicator, TouchableOpacity,Text, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import Animated, { FadeIn } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../../hooks/useProfile';
import { COLORS } from '../../constants/colors';

function ProfileField({ label, value }: { label: string; value: string | number }) {
  return (
    <View style={{ marginVertical: 8 }}>
      <Text style={{ fontSize: 12, color: COLORS.TEXT_GRAY_LIGHTER }}>{label}</Text>
      <Text style={{ fontSize: 16, fontWeight: "600" }}>{value}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user, loading, error, fetchUser, avatar, setAvatar } = useProfile();

  useEffect(() => {
    fetchUser();
  }, []);

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.6,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      await AsyncStorage.setItem('profile_avatar', result.assets[0].uri);
    }
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;
  if (error) return <View><Text>Error loading profile</Text></View>;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 20 }}
    >
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity onPress={pickAvatar}>
          <Image
            source={avatar || "https://i.pravatar.cc/150"}
            style={{ width: 120, height: 120, borderRadius: 60 }}
          />
        </TouchableOpacity>
      </View>

      <View style={{
        backgroundColor: COLORS.WHITE,
        padding: 20,
        borderRadius: 12,
        shadowColor: COLORS.SHADOW,
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
      }}>
        <ProfileField label="Name" value={user?.name} />
        <ProfileField label="Email" value={user?.email} />
        <ProfileField label="Phone" value={user?.phone} />
        <ProfileField label="Website" value={user?.website} />
      </View>
    </ScrollView>
  );
}


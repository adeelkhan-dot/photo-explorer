import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUserApi } from '../api/api';

export function useProfile() {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);

      const avatarStored = await AsyncStorage.getItem('profile_avatar');
      if (avatarStored) setAvatar(avatarStored);

      const res = await fetchUserApi();
      setUser(res);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, fetchUser, avatar, setAvatar };
}

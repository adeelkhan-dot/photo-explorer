import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type FavoriteItem = { id: string; uri: string; author?: string; createdAt: string };

type FavoritesContextType = {
  favorites: FavoriteItem[];
  loading:boolean;
  addFavorite: (item: FavoriteItem) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  loadFavorites: () => Promise<void>;
  isFavorite: (id: string) => boolean;
};

const KEY = '@photo_explorer_favorites_v1';
export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 
const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
 const [loading, setLoading] = useState(true);

  useEffect(() => {
  loadFavorites();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(KEY, JSON.stringify(favorites));
  }, [favorites]);

  const loadFavorites = async () => {
    const json = await AsyncStorage.getItem(KEY);
    if (json) setFavorites(JSON.parse(json));
    setLoading(false);
  };

  const addFavorite = async (item: FavoriteItem) => {
    setFavorites(prev => [item, ...prev]);
  };

  const removeFavorite = async (id: string) => {
    setFavorites(prev => prev.filter(x => x.id !== id));
  };

  const isFavorite = (id: string) => favorites.some(f => f.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites,loading,addFavorite, removeFavorite, isFavorite,loadFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

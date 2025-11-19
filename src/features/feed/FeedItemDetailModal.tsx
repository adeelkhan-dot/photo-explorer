// src/features/feed/FeedItemDetailModal.tsx
import  { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { PicsumPhoto } from './types';
import Animated, { SlideInUp } from 'react-native-reanimated';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');

export default function FeedItemDetailModal() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { photo } = route.params;
  const [picsumPhoto, setPicsumPhoto] = useState<PicsumPhoto | null>(null);
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    setPicsumPhoto(photo);
  }, [photo]);

  if (!picsumPhoto) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Loading...</Text></View>;

  return (
    <Animated.View entering={SlideInUp.springify()} style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignSelf: 'flex-end', marginBottom: 12 }}>
        <Text style={{ color: '#fff', fontSize: 18 }}>Close</Text>
      </TouchableOpacity>
      <Image source={{ uri: picsumPhoto.download_url }} style={{ width: width - 32, height: 300, borderRadius: 12 }} />
      <Text style={{ color: '#fff', fontSize: 16, marginTop: 8 }}>Author: {picsumPhoto.author}</Text>
      <FlatList
        data={comments}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Text style={styles.commentName}>{item.name}</Text>
            <Text style={styles.commentBody}>{item.body}</Text>
          </View>
        )}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  comment: { paddingVertical: 6, borderBottomColor: '#333', borderBottomWidth: 1 },
  commentName: { color: '#fff', fontWeight: '600' },
  commentBody: { color: '#ddd' },
});

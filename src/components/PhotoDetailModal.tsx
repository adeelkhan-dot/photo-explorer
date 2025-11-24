import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { PicsumPhoto } from '../api/api';
import Animated, { SlideInUp } from 'react-native-reanimated';
import { Image } from 'expo-image';
import { fetchCommentsForPhoto } from '../api/api';

const { width } = Dimensions.get('window');

export default function PhotoDetailModal() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { photo } = route.params;
  const [picsumPhoto, setPicsumPhoto] = useState<PicsumPhoto | null>(null);
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      setPicsumPhoto(photo);
      if (photo) {
        const photoId = Number(photo.id);
        if (!isNaN(photoId)) {
          try {
            const c = await fetchCommentsForPhoto(photoId);
            setComments(c);
          } catch (error) {
            setComments([]);
          }
        } else {
          setComments([]);
        }
      }
    })();
  }, [photo]);

  if (!picsumPhoto) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Loading...</Text></View>;

  return (
    <Animated.View entering={SlideInUp.springify()} style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignSelf: 'flex-end', marginBottom: 12 }}>
        <Text style={{ color: '#000', fontSize: 18 }}>Close</Text>
      </TouchableOpacity>
      <Image source={{ uri: picsumPhoto.download_url }} style={{ width: width - 32, height: 320, borderRadius: 12 }} />
      <Text style={{ color: '#000', fontSize: 16, marginTop: 8 }}>Author: {picsumPhoto.author}</Text>
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

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000', padding: 16 },
//   comment: { paddingVertical: 6, borderBottomColor: '#333', borderBottomWidth: 1 },
//   commentName: { color: '#fff', fontWeight: '600' },
//   commentBody: { color: '#ddd' },
// });
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff',  
    padding: 16 
  },
  comment: { 
    paddingVertical: 6, 
    borderBottomColor: '#ccc',
    borderBottomWidth: 1 
  },
  commentName: { 
    color: '#000',            
    fontWeight: '600' 
  },
  commentBody: { 
    color: '#444',              
  },
});
import React, { useCallback } from 'react';
import { FlatList, RefreshControl, Dimensions, View, Text } from 'react-native';
import Animated, { FadeInUp, Layout, LinearTransition } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import FeedItem from './FeedItems';
import { useFeed } from '../../hooks/useFeed';
import { SCREEN_NAMES } from '../../constants/screen';

const { width } = Dimensions.get('window');

export default function FeedScreen() {
    const { photos, loadPage, page, setPage, loading } = useFeed();
    const navigation = useNavigation<any>();

    const onRefresh = useCallback(async () => {
        await loadPage(1);
        setPage(1);
    }, []);

    const onEndReached = useCallback(() => {
        const nextPage = page + 1;
        setPage(nextPage);
        loadPage(nextPage);
    }, [page]);

    const renderItem = ({ item, index }: any) => (
        <Animated.View entering={FadeInUp.delay(index * 20)}>
            <FeedItem
                photo={item}
                size={width / 2 - 8}
                onPress={() => navigation.navigate(SCREEN_NAMES.FEED_DETAIL_MODAL, { photo: item })}
            />
        </Animated.View>
    );

    return (
        <FlatList
            data={photos}
            numColumns={2}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.1}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
            ListEmptyComponent={
                <View style={{ padding: 24, alignItems: 'center' }}>
                    <Text>No photos available — pull to refresh</Text>
                </View>
            }
        />
    );
}

import React from 'react';
import { FlatList, View,RefreshControl } from 'react-native'
import RenderItemAppearence from './RenderItemAppearence';

const ItemsFlatList = (props) => {
    const { items, navigation ,fetched,onRefresh} = props;
    return (
        <View>
            <FlatList
                refreshControl={
                    <RefreshControl refreshing={!fetched} onRefresh={onRefresh} />
                } initialNumToRender={3}
                numColumns={2}
                data={items}
                renderItem={(item) =>
                    <RenderItemAppearence
                        item={{
                            itemId: item.item.id,
                            itemName: item.item.title,
                            itemPoster: item.item.image,
                            itemType: item.item.type,
                            previosState: ''
                        }}
                        navigation={navigation}
                    />
                }
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )
}

export default ItemsFlatList;
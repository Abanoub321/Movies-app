import React from 'react';
import { FlatList, View } from 'react-native'
import RenderItemAppearence from './RenderItemAppearence';

const ItemsFlatList = (props) => {
    const { items, navigation } = props;
    return (
        <View>
            <FlatList
                initialNumToRender={3}
                horizontal
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
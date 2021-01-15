import React from 'react';
import { View, FlatList, Image } from 'react-native';
import { baseUrl } from '../../Env';
const RenderImages = ({ images }) => {

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                initialNumToRender={3}
                data={images}
                renderItem={({ item }) =>
                    <RenderImage item={item} />
                }
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}
const RenderImage = (image) => {
    return (
        <View style={{ marginRight: 15 }}>
            <Image source={{ uri: baseUrl + image.item.file_path }}
                style={{
                    height: 250,
                    aspectRatio: image.item.aspect_ratio,
                    width: 250
                }}
            />
        </View>
    )
}

export default RenderImages;
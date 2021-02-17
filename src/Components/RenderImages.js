import React from 'react';
import { View, FlatList, Image ,Dimensions} from 'react-native';
import { BASE_URL } from '@env';
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
            <Image source={{ uri: BASE_URL + image.item.file_path }}
                style={{
                    height: 250,
                    aspectRatio: image.item.aspect_ratio,
                    width:image.width,
                    maxWidth: Math.round(Dimensions.get('window').width) ,
                }}
            />
        </View>
    )
}

export default RenderImages;
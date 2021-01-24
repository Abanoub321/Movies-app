import React from 'react';
import { Rating } from 'react-native-ratings';

const RatingComponent = ({onPress}) => {
    return (
        <Rating
            ratingColor='#647FE5'
            ratingCount={10}
            imageSize={35}
            fractions={1}
            onFinishRating={onPress}
            style={{ paddingVertical: 10 }}
        />
    );
}

export default RatingComponent;
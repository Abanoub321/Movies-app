import React from 'react';
import StarRating from 'react-native-star-rating';

const RatingComponent = ({onPress,rating,itemID,userId,type}) => {
    return (
       <StarRating 
       disabled={false}
       emptyStar={'star-o'}
       halfStar={'star-half-empty'}
       fullStar={'star'}
       maxStars={10}
       rating={rating}
       halfStarEnabled={true}
       selectedStar={(rating)=>onPress(rating,itemID,userId,type)}
       starSize={35}
       />
    );
}

export default RatingComponent;
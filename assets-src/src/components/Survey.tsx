import React, { useState, Fragment, FC } from 'react'
import { Rating } from 'react-simple-star-rating'

interface SurveyProps {
    setSurveyValue: (value: boolean) => void
}

export const Survey: FC<SurveyProps> = ({ setSurveyValue }) => {

    const [ratingValue, setRatingValue] = useState(0)
    const Wrapper = Fragment;

    const handleRating = (rate: number) => {
        setRatingValue(rate);
        setSurveyValue(true);
    }

    return (
        <Wrapper>
            <Rating
                onClick={handleRating}
                ratingValue={ratingValue}
            />
        </Wrapper>
    );
};

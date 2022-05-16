import Rating from "@mui/material/Rating";
import React, {useState} from 'react'
import {Star, StarBorder} from "@mui/icons-material";

export default function Reponse(props){

    const [rating, setRating] = useState(0)
    const [hover, setHover] = React.useState(-1);

    const colors = {
        1: 'red',
        2: 'red',
        3: 'orange',
        4: 'orange',
        5: 'green',
    };

    function getColor(value) {
        return colors[value];
    }

    return(
        <div>
            <Rating
                value={rating}
                onChange={(event, newValue) => {
                    setRating(newValue);
                    props.getNote(props.id, newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                icon={<Star sx={{color: getColor(hover)}}/>}
                emptyIcon={<StarBorder/>}
            />
        </div>
    )
}

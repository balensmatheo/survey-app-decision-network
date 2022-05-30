import Rating from "@mui/material/Rating";
import React, {useState} from 'react'
import {Star} from "@mui/icons-material";

export default function Reponse(props){

    const [rating, setRating] = useState();
    const [hover, setHover] = useState(-1);

    const colors = {
        1: 'red',
        2: 'red',
        3: '#fa7457',
        4: '#f6b45e',
        5: '#00b11a',
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
                icon={<Star sx={{color: getColor(hover) || getColor(rating)}}/>}
            />
        </div>
    )
}

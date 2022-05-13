import Rating from "@mui/material/Rating";
import React, {useState} from 'react'

export default function Reponse(props){

    const [rating, setRating] = useState(0)
    return(
        <div>
            <Rating
                value={rating}
                onChange={(event, newValue) => {
                    setRating(newValue);
                    props.getNote(props.id, newValue);
                }}
            />
        </div>
    )
}

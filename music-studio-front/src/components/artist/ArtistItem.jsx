import React from 'react';
import {useHistory} from "react-router-dom";
import {useState} from "react";
import MyButton from "../UI/buttons/MyButton";

const ArtistItem = (props) => {
    const router = useHistory()
    const [showClients, setShowClients] = useState(false)
    return (
        <div className="post">
            <div className="post_content">
                <strong>{props.artist.id}. Type: {props.artist.stageName}</strong>
            </div>
            <div className="post_btns">
                <MyButton onClick={()=> props.openEditModal(props.artist.id)}>
                    Edit
                </MyButton>
                <MyButton onClick={()=> router.push(`/artists/${props.artist.id}`)}>
                    Open
                </MyButton>
                <MyButton onClick={() => props.remove(props.artist.id)}>
                    Remove
                </MyButton>
            </div>
        </div>
    );
};

export default ArtistItem;
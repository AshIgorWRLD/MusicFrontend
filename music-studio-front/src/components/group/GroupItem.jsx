import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import MyButton from "../UI/buttons/MyButton";

const GroupItem = (props) => {
    const router = useHistory()
    const [showArtists, setShowArtists] = useState(false)
    return (
        <div className="post">
            <div className="post_content">
                <strong>{props.group.id}. Name: {props.group.name}</strong>
            </div>
            <div className="post_btns">
                <MyButton onClick={()=> props.openEditModal(props.group.id)}>
                    Edit
                </MyButton>
                <MyButton onClick={()=> router.push(`/groups/${props.group.id}`)}>
                    Open
                </MyButton>
                <MyButton onClick={() => props.remove(props.group.id)}>
                    Remove
                </MyButton>
            </div>
        </div>
    );
};

export default GroupItem;
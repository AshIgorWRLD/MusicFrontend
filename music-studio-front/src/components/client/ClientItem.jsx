import React from 'react';
import {useHistory} from "react-router-dom";
import {useState} from "react";
import MyButton from "../UI/buttons/MyButton";

const ClientItem = (props) => {
    const router = useHistory()
    const [showUsers, setShowUsers] = useState(false)
    return (
        <div className="post">
            <div className="post_content">
                <strong>{props.client.id}. Name: {props.client.user?.name}, Type: {props.client.type}</strong>
            </div>
            <div className="post_btns">
                <MyButton onClick={()=> props.openEditModal(props.client.id)}>
                    Edit
                </MyButton>
                <MyButton onClick={()=> router.push(`/clients/${props.client.id}`)}>
                    Open
                </MyButton>
                <MyButton onClick={() => props.remove(props.client.id)}>
                    Remove
                </MyButton>
            </div>
        </div>
    );
};

export default ClientItem;
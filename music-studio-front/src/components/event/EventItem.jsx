import React from 'react';
import {useHistory} from "react-router-dom";
import MyButton from "../UI/buttons/MyButton";

const EventItem = (props) => {
    const router = useHistory()
    return (
        <div className="post">
            <div className="post_content">
                <strong>
                    {props.event.id}. Name: {props.event.eventName}
                </strong>
            </div>
            <div className="post_btns">
                <MyButton onClick={()=> props.openEditModal(props.event.id)}>
                    Edit
                </MyButton>
                <MyButton onClick={()=> router.push(`/events/${props.event.id}`)}>
                    Open
                </MyButton>
                <MyButton onClick={() => props.remove(props.event.id)}>
                    Remove
                </MyButton>
            </div>
        </div>
    );
};

export default EventItem;
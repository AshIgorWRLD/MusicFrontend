import React from 'react';
import {useEffect, useState} from "react";
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/buttons/MyButton";

const EventForm = ({create, edit, events, editedEventId}) => {

    const [event, setEvent] = useState({ eventName: '', audienceAmount: '',
    point: '', eventDate: '', timing: '', eventRank: ''})
    useEffect(() => {
        if(editedEventId) {
            setEvent(events.find((ev) => ev.id === editedEventId))
        }
        console.log(event)
    }, [editedEventId])


    const addNewEvent = (e) => {
        e.preventDefault()
        const newEvent = {
            ...event
        }
        create(newEvent)
        setEvent({ eventName: '', audienceAmount: '',
            point: '', eventDate: '', timing: '', eventRank: ''})
    }

    return (
        <form>
            <MyInput
                value={event.eventName}
                onChange={e => setEvent({...event, eventName: e.target.value})}
                type="text"
                placeholder="Event name"
            />
            <MyInput
                value={event.audienceAmount}
                onChange={e => setEvent({...event, audienceAmount: e.target.value})}
                type="text"
                placeholder="Event audience amount"
            />
            <MyInput
                value={event.point}
                onChange={e => setEvent({...event, point: e.target.value})}
                type="text"
                placeholder="Event point"
            />
            <MyInput
                value={event.eventDate}
                onChange={e => setEvent({...event, eventDate: e.target.value})}
                type="text"
                placeholder="Event date"
            />
            <MyInput
                value={event.timing}
                onChange={e => setEvent({...event, timing: e.target.value})}
                type="text"
                placeholder="Event timing"
            />
            <MyInput
                value={event.eventRank}
                onChange={e => setEvent({...event, eventRank: e.target.value})}
                type="text"
                placeholder="Event rank"
            />
            <MyButton onClick={editedEventId ? () => edit(event) : addNewEvent}>Push event</MyButton>
        </form>
    );
};

export default EventForm;
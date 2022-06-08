import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import Loader from "../../components/UI/loader/Loader";
import EventService from "../../API/EventService";

const EventIdPage = () => {
    const params = useParams()
    const [event, setEvent] = useState('')
    const [fetchEventById, isLoading, error] = useFetching(async () => {
        const response = await EventService.getById(params.id)
        setEvent(response.data)
    })


    useEffect(() => {
        fetchEventById(params.id)
    }, [])

    return (
        <div>
            <h1 style={{padding: 10}}>Event {params.id} page</h1>
            {isLoading
                ? <Loader/>
                :
                <div style={{padding: 10}}>{event.id}. Name:{event.eventName},
                    Audience: {event.audienceAmount}, Point: {event.point},
                    Date: {event.eventDate}, Timing: {event.timing},
                    Rank: {event.eventRank}
                </div>
            }
        </div>
    );
};

export default EventIdPage;
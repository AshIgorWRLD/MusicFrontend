import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useFetching} from "../../hooks/useFetching";
import {getPageCount} from "../../utils/pages";
import {useObserver} from "../../hooks/useObserver";
import MyButton from "../../components/UI/buttons/MyButton";
import MyModal from "../../components/UI/my_modal/MyModal";
import Loader from "../../components/UI/loader/Loader";
import Pagination from "../../components/UI/pagination/Pagination";
import {useEvents} from "../../hooks/useEvents";
import EventForm from "../../components/event/EventForm";
import EventFilter from "../../components/event/EventFilter";
import EventList from "../../components/event/EventList";
import EventService from "../../API/EventService";

const Events = () => {
    const [events, setEvents] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [editedEventId, setEditedEventId] = useState('')
    const sortedAndSearchedEvents = useEvents(events, filter.sort, filter.query);
    const observer = useRef()
    const lastElement = useRef()


    const [fetchEvents, isEventsLoading, eventError] = useFetching(async (limit, page) => {
        const response = await EventService.getAll(limit, page-1)
        console.log(response.data)
        setEvents([...events, ...response.data.content])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(response.data.totalElements, response.data.size))
    })

    useObserver(lastElement, page < totalPages, isEventsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchEvents(limit, page)
    }, [page, limit])

    const createEvent = async (newEvent) => {
        console.log(newEvent)
        await EventService.post(newEvent.eventName, newEvent.audienceAmount, newEvent.point,
            newEvent.eventDate, newEvent.timing, newEvent.eventRank)
        //fetchEvents(limit, page)
        setModal(false)
    }

    const openEditModal = (id) => {
        setModal(true)
        setEditedEventId(id)
    }

    const editEvent = async (editedEvent) => {
        await EventService.put(editedEvent.id, editedEvent.eventName, editedEvent.audienceAmount, editedEvent.point,
            editedEvent.eventDate, editedEvent.timing, editedEvent.eventRank)
        let newEvents = events.map((event) => editedEvent.id === event.id ? editedEvent : event)
        setEvents(newEvents)
    }

    const removeEvent = async (id) => {
        await EventService.delete(id)
        setEvents(events.filter(p => p.id !== id))
    }

    const changePage = (page) => {
        setPage(page)
        fetchEvents(limit, page)
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Add event
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <EventForm create={createEvent} edit={editEvent} events={events} editedEventId={editedEventId}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <EventFilter filter={filter} setFilter={setFilter}/>
            {eventError &&
                <h1>Произошла ошибка ${eventError}</h1>
            }
            <EventList
                remove={removeEvent}
                events={sortedAndSearchedEvents}
                title="Events"
                openEditModal={openEditModal}
            />
            <div ref={lastElement} style={{height: 20, background: 'darkcyan'}}/>
            {isEventsLoading
                &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
                    <Loader/>
                </div>
            }

            <Pagination page={page}
                        changePage={changePage}
                        totalPages={totalPages}
            />
        </div>
    );
};

export default Events;
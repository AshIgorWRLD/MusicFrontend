import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import EventItem from "./EventItem";

const EventList = ({events, title, remove, openEditModal}) => {

    if (!events.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                No events :(
            </h1>
        )
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            <TransitionGroup>
                {events.map((event, index) =>
                    <CSSTransition
                        key={event.id}
                        timeout={500}
                        classNames="post"
                    >
                        <EventItem remove={remove} number={index + 1} event={event} openEditModal={openEditModal}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default EventList;
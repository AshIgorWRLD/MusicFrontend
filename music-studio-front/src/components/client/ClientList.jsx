import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import ClientItem from "./ClientItem";

const ClientList = ({clients, title, remove, openEditModal}) => {

    if (!clients.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                No clients :(
            </h1>
        )
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            <TransitionGroup>
                {clients.map((client, index) =>
                    <CSSTransition
                        key={client.id}
                        timeout={500}
                        classNames="post"
                    >
                        <ClientItem
                            remove={remove}
                            number={index + 1}
                            client={client}
                            openEditModal={openEditModal}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default ClientList;
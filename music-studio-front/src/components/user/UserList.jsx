import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import UserItem from "./UserItem";

const UserList = ({users, title, remove, openEditModal}) => {

    if (!users.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                No users :(
            </h1>
        )
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            <TransitionGroup>
                {users.map((user, index) =>
                    <CSSTransition
                        key={user.id}
                        timeout={500}
                        classNames="post"
                    >
                        <UserItem remove={remove} number={index + 1} user={user} openEditModal={openEditModal}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default UserList;
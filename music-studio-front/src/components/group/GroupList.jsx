import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import GroupItem from "./GroupItem";

const GroupList = ({groups, title, remove, openEditModal}) => {

    if (!groups.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                No groups :(
            </h1>
        )
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            <TransitionGroup>
                {groups.map((group, index) =>
                    <CSSTransition
                        key={group.id}
                        timeout={500}
                        classNames="post"
                    >
                        <GroupItem remove={remove} number={index + 1} group={group} openEditModal={openEditModal}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default GroupList;
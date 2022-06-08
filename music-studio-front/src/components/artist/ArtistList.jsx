import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import ArtistItem from "./ArtistItem";

const ArtistList = ({artists, title, remove, openEditModal}) => {

    if (!artists.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                No artists :(
            </h1>
        )
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            <TransitionGroup>
                {artists.map((artist, index) =>
                    <CSSTransition
                        key={artist.id}
                        timeout={500}
                        classNames="post"
                    >
                        <ArtistItem
                            remove={remove}
                            number={index + 1}
                            artist={artist}
                            openEditModal={openEditModal}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default ArtistList;
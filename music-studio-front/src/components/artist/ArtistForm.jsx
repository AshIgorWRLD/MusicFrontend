import React from 'react';
import {useEffect, useState} from "react";
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/buttons/MyButton";

const ArtistForm = ({create, edit, artists, editedArtistId}) => {

    const [artist, setArtist] = useState({id: '', clientId: '', groupId: '',
        stageName: '', genre: '', creationDate: ''})

    useEffect(() => {
        if(editedArtistId) {
            const artist = artists.find((a) => a.id === editedArtistId)
            setArtist({...artist, clientId: artist.client?.user?.id, groupId: artist.group?.id})
        }
    }, [editedArtistId])


    const addNewArtist = (e) => {
        e.preventDefault()
        const newArtist = {
            ...artist
        }
        create(newArtist)
        setArtist({id: '', clientId: '', groupId: '',
            stageName: '', genre: '', creationDate: ''})
    }

    return (
        <form>
            <MyInput
                value={artist.clientId}
                onChange={e => setArtist({...artist, clientId: e.target.value})}
                type="text"
                placeholder="Client id"
            />
            <MyInput
                value={artist.groupId}
                onChange={e => setArtist({...artist, groupId: e.target.value})}
                type="text"
                placeholder="Group id"
            />
            <MyInput
                value={artist.stageName}
                onChange={e => setArtist({...artist, stageName: e.target.value})}
                type="text"
                placeholder="Stage name"
            />
            <MyInput
                value={artist.genre}
                onChange={e => setArtist({...artist, genre: e.target.value})}
                type="text"
                placeholder="Genre"
            />
            <MyInput
                value={artist.creationDate}
                onChange={e => setArtist({...artist, creationDate: e.target.value})}
                type="text"
                placeholder="Creation date"
            />
            <MyButton onClick={editedArtistId ? () => edit(artist) : addNewArtist}>Push artist</MyButton>
        </form>
    );
};

export default ArtistForm;
import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import Loader from "../../components/UI/loader/Loader";
import MyButton from "../../components/UI/buttons/MyButton";
import ArtistService from "../../API/ArtistService";

const ArtistIdPage = () => {
    const params = useParams()
    const [showClient, setShowClient] = useState(false)
    const [artist, setArtist] = useState('')
    const [fetchArtistById, isLoading, error] = useFetching(async () => {
        const response = await ArtistService.getById(params.id)
        setArtist(response.data)
    })


    useEffect(() => {
        fetchArtistById(params.id)
    }, [])

    console.log(artist)
    return (
        <div>
            <h1 style={{padding: 10}}>Client {params.id} page</h1>
            {isLoading
                ? <Loader/>
                :
                <div style={{padding: 10}}>{artist.id}. Group: {artist.group?.name},
                    Stage name: {artist.stageName}, Genre: {artist.genre},
                    CreationDate: {artist.creationDate}
                    <div style={{alignContent: "center", padding: 10}}>
                        <MyButton onClick={() => setShowClient(!showClient)}>
                            Show client
                        </MyButton>
                    </div>
                    {showClient &&
                        <div>
                            <h1>Client</h1>
                            <div>Client name: {artist.client?.user?.name}</div>
                            <div>Client type: {artist.client?.type}</div>
                        </div>}
                </div>
            }
        </div>
    );
};

export default ArtistIdPage;
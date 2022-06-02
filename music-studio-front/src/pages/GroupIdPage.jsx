import React from 'react';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/loader/Loader";
import GroupService from "../API/GroupService";
import MyButton from "../components/UI/buttons/MyButton";

const GroupIdPage = () => {
    const params = useParams()
    const [showArtists, setShowArtists] = useState(false)
    const [group, setGroup] = useState('')
    const [fetchGroupById, isLoading, error] = useFetching(async () => {
        const response = await GroupService.getById(params.id)
        setGroup(response.data)
    })


    useEffect(() => {
        fetchGroupById(params.id)
    }, [])

    return (
        <div>
            <h1>User {params.id} page</h1>
            {isLoading
                ? <Loader/>
                :
                <div>{group.id}. Name:{group.name} Creation Date:{group.creationDate}
                    <MyButton onClick={() => setShowArtists(!showArtists)}>
                        Show artists
                    </MyButton>
                    {showArtists &&
                        <div>
                            <h1>Members</h1>
                            {group.artists.map((artist) =>
                                <div>
                                    {artist.stageName}
                                </div>
                            )}
                        </div>}
                </div>
            }
        </div>
    );
};

export default GroupIdPage;
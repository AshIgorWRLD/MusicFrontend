import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/loader/Loader";
import UserService from "../API/UserService";
const UserIdPage = () => {
    const params = useParams()
    const [user, setUser] = useState('')
    const [fetchUserById, isLoading, error] = useFetching(async () => {
        const response = await UserService.getById(params.id)
        setUser(response.data)
    })


    useEffect(() => {
        fetchUserById(params.id)
    }, [])

    return (
        <div>
            <h1>User {params.id} page</h1>
            {isLoading
                ? <Loader/>
                : <div>{user.id}. Name:{user.name} Login:{user.login} Password:{user.password}</div>
            }
        </div>
    );
};

export default UserIdPage;
import React from 'react';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useFetching} from "../../hooks/useFetching";
import Loader from "../../components/UI/loader/Loader";
import MyButton from "../../components/UI/buttons/MyButton";
import ClientService from "../../API/ClientService";

const ClientIdPage = () => {
    const params = useParams()
    const [showUser, setShowUser] = useState(false)
    const [client, setClient] = useState('')
    const [fetchClientById, isLoading, error] = useFetching(async () => {
        const response = await ClientService.getById(params.id)
        setClient(response.data)
    })


    useEffect(() => {
        fetchClientById(params.id)
    }, [])

    console.log(client)
    return (
        <div>
            <h1 style={{padding: 10}}>Client {params.id} page</h1>
            {isLoading
                ? <Loader/>
                :
                <div style={{padding: 10}}>{client.id}. Type: {client.type} Name: {client.user?.name}
                    <div style={{alignContent: "center", padding: 10}}>
                        <MyButton onClick={() => setShowUser(!showUser)}>
                            Show user
                        </MyButton>
                    </div>
                    {showUser &&
                        <div>
                            <h1>User</h1>
                            <div>User name: {client.user?.name}</div>
                            <div>User login: {client.user?.login}</div>
                        </div>}
                </div>
            }
        </div>
    );
};

export default ClientIdPage;
import React from 'react';
import {useEffect, useState} from "react";
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/buttons/MyButton";

const ClientForm = ({create, edit, clients, editedClientId}) => {

    const [client, setClient] = useState({id: '', userId: '', type: ''})

    useEffect(() => {
        if(editedClientId) {
            const client = clients.find((cl) => cl.id === editedClientId)
            setClient({...client, userId: client.user?.id})
        }
    }, [editedClientId])


    const addNewClient = (e) => {
        e.preventDefault()
        const newClient = {
            ...client
        }
        create(newClient)
        setClient({id: '', userId: '', type: ''})
    }

    return (
        <form>
            <MyInput
                value={client.userId}
                onChange={e => setClient({...client, userId: e.target.value})}
                type="text"
                placeholder="User id"
            />
            <MyInput
                value={client.type}
                onChange={e => setClient({...client, type: e.target.value})}
                type="text"
                placeholder="Client type"
            />
            <MyButton onClick={editedClientId ? () => edit(client) : addNewClient}>Push client</MyButton>
        </form>
    );
};

export default ClientForm;
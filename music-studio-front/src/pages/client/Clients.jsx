import React, {useEffect, useRef, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import {getPageCount} from "../../utils/pages";
import {useObserver} from "../../hooks/useObserver";
import MyButton from "../../components/UI/buttons/MyButton";
import MyModal from "../../components/UI/my_modal/MyModal";
import Loader from "../../components/UI/loader/Loader";
import Pagination from "../../components/UI/pagination/Pagination";
import ClientService from "../../API/ClientService";
import ClientForm from "../../components/client/ClientForm";
import ClientFilter from "../../components/client/ClientFilter";
import ClientList from "../../components/client/ClientList";
import {useClients} from "../../hooks/useClients";

const Clients = () => {
    const [clients, setClients] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [editedClientId, setEditedClientId] = useState('')
    const sortedAndSearchedClients = useClients(clients, filter.sort, filter.query);
    const observer = useRef()
    const lastElement = useRef()


    const [fetchClients, isClientsLoading, clientError] = useFetching(async (limit, page) => {
        const response = await ClientService.getAll(limit, page-1)
        console.log(response.data)
        setClients([...clients, ...response.data.content])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(response.data.totalElements, response.data.size))
    })

    useObserver(lastElement, page < totalPages, isClientsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchClients(limit, page)
    }, [page, limit])

    const createClient = async (newClient) => {
        await ClientService.post(newClient.userId, newClient.type)
        fetchClients(limit, page)
        setModal(false)
    }

    const openEditModal = (id) => {
        setModal(true)
        setEditedClientId(id)
    }

    const editClient = async (editedClient) => {
        await ClientService.put(editedClient.id, editedClient.userId, editedClient.type)
        let newClients = clients.map((client) => editedClient.id === client.id ? editedClient : client)
        setClients(newClients)
    }

    const removeClient = async (id) => {
        await ClientService.delete(id)
        setClients(clients.filter(p => p.id !== id))
    }

    const changePage = (page) => {
        setPage(page)
        fetchClients(limit, page)
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Add client
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <ClientForm create={createClient} edit={editClient} clients={clients} editedClientId={editedClientId}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <ClientFilter filter={filter} setFilter={setFilter}/>
            {clientError &&
                <h1>Произошла ошибка ${clientError}</h1>
            }
            <ClientList
                remove={removeClient}
                clients={sortedAndSearchedClients}
                title="Clients"
                openEditModal={openEditModal}
            />
            <div ref={lastElement} style={{height: 20, background: 'darkcyan'}}/>
            {isClientsLoading
                &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
                    <Loader/>
                </div>
            }

            <Pagination page={page}
                        changePage={changePage}
                        totalPages={totalPages}
            />
        </div>
    );
};

export default Clients;
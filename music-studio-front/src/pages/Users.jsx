import React from 'react';
import MyButton from "../components/UI/buttons/MyButton";
import MyModal from "../components/UI/my_modal/MyModal";
import PostFilter from "../components/PostFilter";
import MySelect from "../components/UI/select/MySelect";
import Loader from "../components/UI/loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";
import {useEffect, useRef, useState} from "react";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import {useObserver} from "../hooks/useObserver";
import {useUsers} from "../hooks/UseUsers";
import UserForm from "../components/user/UserForm";
import UserList from "../components/user/UserList";
import UserService from "../API/UserService";

const Users = () => {

    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [editedUserId, setEditedUserId] = useState('')
    const sortedAndSearchedUsers = useUsers(users, filter.sort, filter.query);
    const observer = useRef()
    const lastElement = useRef()


    const [fetchUsers, isUsersLoading, userError] = useFetching(async (limit, page) => {
        const response = await UserService.getAll(limit, page-1)
        console.log(response.data)
        setUsers([...users, ...response.data.content])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(response.data.totalElements, response.data.size))
    })

    useObserver(lastElement, page < totalPages, isUsersLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchUsers(limit, page)
    }, [page, limit])

    const createUser = async (newUser) => {
        await UserService.post(newUser.name, newUser.login, newUser.password)
        fetchUsers(limit, page)
        setModal(false)
    }

    const openEditModal = (id) => {
        setModal(true)
        setEditedUserId(id)
    }

    const editUser = async (editedUser) => {
        await UserService.put(editedUser.id, editedUser.name, editedUser.login, editedUser.password)
        let newUsers = users.map((user) => editedUser.id === user.id ? editedUser : user)
        setUsers(newUsers)
    }

    const removeUser = async (id) => {
        await UserService.delete(id)
        setUsers(users.filter(p => p.id !== id))
    }

    const changePage = (page) => {
        setPage(page)
        fetchUsers(limit, page)
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Add user
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <UserForm create={createUser} edit={editUser} users={users} editedUserId={editedUserId}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            {userError &&
                <h1>Произошла ошибка ${userError}</h1>
            }
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Elements on page"
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: -1, name: 'Show all'}
                ]}
            />
            <UserList remove={removeUser} users={sortedAndSearchedUsers} title="Users" openEditModal={openEditModal}/>
            <div ref={lastElement} style={{height: 20, background: 'darkcyan'}}></div>
            {isUsersLoading
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

export default Users;
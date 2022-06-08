import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useFetching} from "../../hooks/useFetching";
import {getPageCount} from "../../utils/pages";
import {useObserver} from "../../hooks/useObserver";
import MyButton from "../../components/UI/buttons/MyButton";
import MyModal from "../../components/UI/my_modal/MyModal";
import MySelect from "../../components/UI/select/MySelect";
import Loader from "../../components/UI/loader/Loader";
import Pagination from "../../components/UI/pagination/Pagination";
import {useGroups} from "../../hooks/useGroups";
import GroupService from "../../API/GroupService";
import GroupList from "../../components/group/GroupList";
import GroupForm from "../../components/group/GroupForm";
import GroupFilter from "../../components/group/GroupFilter";

const Groups = () => {
    const [groups, setGroups] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [editedGroupId, setEditedGroupId] = useState('')
    const sortedAndSearchedGroups = useGroups(groups, filter.sort, filter.query);
    const observer = useRef()
    const lastElement = useRef()


    const [fetchGroups, isGroupsLoading, groupError] = useFetching(async (limit, page) => {
        const response = await GroupService.getAll(limit, page-1)
        console.log(response.data)
        setGroups([...groups, ...response.data.content])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(response.data.totalElements, response.data.size))
    })

    useObserver(lastElement, page < totalPages, isGroupsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchGroups(limit, page)
    }, [page, limit])

    const createGroup = async (newGroup) => {
        await GroupService.post(newGroup.name, newGroup.creationDate)
        fetchGroups(limit, page)
        setModal(false)
    }

    const openEditModal = (id) => {
        setModal(true)
        setEditedGroupId(id)
    }

    const editGroup = async (editedGroup) => {
        await GroupService.put(editedGroup.id, editedGroup.name, editedGroup.creationDate)
        let newGroups = groups.map((group) => editedGroup.id === group.id ? editedGroup : group)
        setGroups(newGroups)
    }

    const removeGroup = async (id) => {
        await GroupService.delete(id)
        setGroups(groups.filter(p => p.id !== id))
    }

    const changePage = (page) => {
        setPage(page)
        fetchGroups(limit, page)
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Add group
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <GroupForm create={createGroup} edit={editGroup} groups={groups} editedGroupId={editedGroupId}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <GroupFilter filter={filter} setFilter={setFilter}/>
            {groupError &&
                <h1>Произошла ошибка ${groupError}</h1>
            }
            <GroupList remove={removeGroup} groups={sortedAndSearchedGroups} title="Groups" openEditModal={openEditModal}/>
            <div ref={lastElement} style={{height: 20, background: 'darkcyan'}}></div>
            {isGroupsLoading
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
}

export default Groups;
import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useFetching} from "../../hooks/useFetching";
import {getPageCount} from "../../utils/pages";
import {useObserver} from "../../hooks/useObserver";
import MyButton from "../../components/UI/buttons/MyButton";
import MyModal from "../../components/UI/my_modal/MyModal";
import Loader from "../../components/UI/loader/Loader";
import Pagination from "../../components/UI/pagination/Pagination";
import {useArtists} from "../../hooks/useArtists";
import ArtistForm from "../../components/artist/ArtistForm";
import ArtistFilter from "../../components/artist/ArtistFilter";
import ArtistList from "../../components/artist/ArtistList";
import ArtistService from "../../API/ArtistService";

const Artists = () => {
    const [artists, setArtists] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [editedArtistId, setEditedArtistId] = useState('')
    const sortedAndSearchedArtists = useArtists(artists, filter.sort, filter.query);
    const observer = useRef()
    const lastElement = useRef()


    const [fetchArtists, isArtistsLoading, artistError] = useFetching(async (limit, page) => {
        const response = await ArtistService.getAll(limit, page-1)
        console.log(response.data)
        setArtists([...artists, ...response.data.content])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(response.data.totalElements, response.data.size))
    })

    useObserver(lastElement, page < totalPages, isArtistsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchArtists(limit, page)
    }, [page, limit])

    const createArtist = async (newArtist) => {
        await ArtistService.post(newArtist.clientId, newArtist.groupId, newArtist.stageName,
            newArtist.genre, newArtist.creationDate)
        fetchArtists(limit, page)
        setModal(false)
    }

    const openEditModal = (id) => {
        setModal(true)
        setEditedArtistId(id)
    }

    const editArtist = async (editedArtist) => {
        await ArtistService.put(editedArtist.id, editedArtist.clientId, editedArtist.groupId, editedArtist.stageName,
            editedArtist.genre, editedArtist.creationDate)
        let newArtists = artists.map((artist) => editedArtist.id === artist.id ? editedArtist : artist)
        setArtists(newArtists)
    }

    const removeArtist = async (id) => {
        await ArtistService.delete(id)
        setArtists(artists.filter(p => p.id !== id))
    }

    const changePage = (page) => {
        setPage(page)
        fetchArtists(limit, page)
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Add artist
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <ArtistForm create={createArtist} edit={editArtist} artists={artists} editedArtistId={editedArtistId}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <ArtistFilter filter={filter} setFilter={setFilter}/>
            {artistError &&
                <h1>Произошла ошибка ${artistError}</h1>
            }
            <ArtistList
                remove={removeArtist}
                artists={sortedAndSearchedArtists}
                title="Artists"
                openEditModal={openEditModal}
            />
            <div ref={lastElement} style={{height: 20, background: 'darkcyan'}}/>
            {isArtistsLoading
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

export default Artists;
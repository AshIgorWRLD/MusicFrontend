import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useFetching} from "../../hooks/useFetching";
import GroupService from "../../API/GroupService";
import Loader from "../../components/UI/loader/Loader";
import MyButton from "../../components/UI/buttons/MyButton";


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
            <h1 style={{padding: 10}}>User {params.id} page</h1>
            {isLoading
                ? <Loader/>
                :
                <div style={{padding: 10}}>{group.id}. Name:{group.name} Creation Date:{group.creationDate}
                    <div style={{alignContent: "center", padding: 10}}>
                        <MyButton onClick={() => setShowArtists(!showArtists)}>
                            Show artists
                        </MyButton>
                    </div>
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
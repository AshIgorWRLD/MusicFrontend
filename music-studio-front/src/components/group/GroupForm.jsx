import {useEffect, useState} from "react";
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/buttons/MyButton";


const GroupForm = ({create, edit, groups, editedGroupId}) => {

    const [group, setGroup] = useState({id: '',name: '', creationDate: '', artistId: ''})
    useEffect(() => {
        if(editedGroupId) {
            setGroup(groups.find((group) => group.id === editedGroupId))
        }
    }, [editedGroupId])


    const addNewGroup = (e) => {
        e.preventDefault()
        const newGroup = {
            ...group
        }
        create(newGroup)
        setGroup({id: '',name: '', creationDate: '', artistId: ''})
    }

    return (
        <form>
            <MyInput
                value={group.name}
                onChange={e => setGroup({...group, name: e.target.value})}
                type="text"
                placeholder="Group name"
            />
            <MyInput
                value={group.creationDate}
                onChange={e => setGroup({...group, creationDate: e.target.value})}
                type="text"
                placeholder="Group creation date"
            />
            <MyInput
                value={group.artistId}
                onChange={e => setGroup({...group, artistId: e.target.value})}
                type="text"
                placeholder="Artist id"
            />
            <MyButton onClick={editedGroupId ? () => edit(group) : addNewGroup}>Make group</MyButton>
        </form>
    );
};

export default GroupForm;
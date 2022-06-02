import React, {useEffect, useState} from 'react';
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/buttons/MyButton";

const UserForm = ({create, edit, users, editedUserId}) => {

    const [user, setUser] = useState({id: '',name: '', login: '', password: ''})
    useEffect(() => {
        if(editedUserId) {
            setUser(users.find((user) => user.id === editedUserId))
        }
    }, [editedUserId])


    const addNewUser = (e) => {
        e.preventDefault()
        const newUser = {
            ...user
        }
        create(newUser)
        setUser({id: '', name: '', login: '', password: ''})
    }

    return (
        <form>
            <MyInput
                value={user.name}
                onChange={e => setUser({...user, name: e.target.value})}
                type="text"
                placeholder="User name"
            />
            <MyInput
                value={user.login}
                onChange={e => setUser({...user, login: e.target.value})}
                type="text"
                placeholder="User login"
            />
            <MyInput
                value={user.password}
                onChange={e => setUser({...user, password: e.target.value})}
                type="text"
                placeholder="User password"
            />
            <MyButton onClick={editedUserId ? () => edit(user) : addNewUser}>Make post</MyButton>
        </form>
    );
};

export default UserForm;
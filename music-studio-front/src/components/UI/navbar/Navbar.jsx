import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../buttons/MyButton";
import {AuthContext} from "../../../context";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    return (
        <div className="navbar">
            <MyButton onClick={logout}>
                Logout
            </MyButton>
            <div className="navbar_links">
                <Link to="/about">About</Link>
                <a> | </a>
                <Link to="/users">Users</Link>
                <a> | </a>
                <Link to="/clients">Clients</Link>
                <a> | </a>
                <Link to="/artists">Artists</Link>
                <a> | </a>
                <Link to="/groups">Groups</Link>
                <a> | </a>
                <Link to="/events">Events</Link>
            </div>
        </div>
    );
};

export default Navbar;
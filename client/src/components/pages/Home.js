import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ToDoList from '../todos/ToDoList';

export default function Home() {
    const { userData } = useContext(UserContext);

    return <div style={{ textAlign: "center", paddingBottom: "1.5 rem" }}>
        {userData.user ?
            (<div>
                <h1 style={{ fontFamily: "Architects Daughter, cursive" }}> Welcome {userData.user.displayName}!</h1>
                <ToDoList />
            </div>
            ) :
            (<>
                <h2 style={{ paddingTop: "5rem" }}>You are not logged in.</h2>
                <Link className="home-login-button" to="/login">Login</Link>
            </>
            )}


    </div>
}
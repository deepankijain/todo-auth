import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from "axios";
import Home from "./components/pages/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Header from "./components/layout/Header";
import UserContext from "./components/context/UserContext";
import "./styles.css";

export default function App() {
    const [userData, setUserData] = useState({ token: undefined, user: undefined });
    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem('auth-token');
            if (token === null) {
                localStorage.setItem('auth-token', '');
                token = "";
            }
            const tokenRes = await Axios.post("/users/tokenIsValid", null, { headers: { "x-auth-token": token } });
            console.log(tokenRes.data);
            if (tokenRes.data) {
                const userRes = await Axios.get("/users/", {
                    headers: { "x-auth-token": token },
                });
                setUserData({
                    token,
                    user: userRes.data
                });
            }
        }

        checkLoggedIn();
    }, [])


    return <>
        <BrowserRouter>
            <UserContext.Provider value={{ userData, setUserData }}>
                <Header />
                <div className="container">
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/register' component={Register} />
                        <Route path='/login' component={Login} />
                    </Switch>
                </div>
            </UserContext.Provider>
        </BrowserRouter>
    </>
}
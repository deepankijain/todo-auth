import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import ErrorNotice from '../misc/ErrorNotice';

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const { setUserData } = useContext(UserContext);
    const history = useHistory();
    const submit = async (e) => {
        e.preventDefault();
        try {
            const loginUser = { email, password };
            const loginUserRes = await Axios.post('/users/login', loginUser);
            setUserData({
                token: loginUserRes.data.token,
                user: loginUserRes.data.user
            });
            localStorage.setItem("auth-token", loginUserRes.data.token);
            history.push('/')
        } catch (error) {
            error.response.data.msg && setError(error.response.data.msg);
        }
    }
    return <div className="page">
        <h2>Login</h2>
        {error && <ErrorNotice message={error} clearMessage={() => setError(undefined)} />}
        <form onSubmit={submit} className="form">
            <label htmlFor="login-email">Email</label>
            <input id="login-email" type="email" onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="login-password">Password</label>
            <input id="login-password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <input type="submit" value="Login" />
        </form>
    </div>
}
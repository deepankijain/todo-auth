import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import ErrorNotice from '../misc/ErrorNotice';

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();
  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  const submit = async (e) => {
    e.preventDefault();
    try {
      let newUser = { email, password, passwordCheck, displayName };
      await Axios.post('/users/register', newUser);
      const loginRes = await Axios.post('/users/login', { email, password });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem('auth-token', loginRes.data.token);
      history.push('/');
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className='page'>
      <h2>Register</h2>
      {error && (
        <ErrorNotice message={error} clearMessage={() => setError(undefined)} />
      )}
      <form onSubmit={submit} className='form'>
        <label htmlFor='register-display-name'>Name</label>
        <input
          id='register-display-name'
          type='text'
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <label htmlFor='register-email'>Email</label>
        <input
          id='register-email'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='register-password'>Password</label>
        <input
          id='register-password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type='password'
          placeholder='Confirm password'
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
        <input type='submit' value='Register' />
      </form>
    </div>
  );
}

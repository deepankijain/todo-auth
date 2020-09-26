import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import Axios from 'axios';


export default function InputArea(props) {
    const [item, setItem] = useState('');
    const { userData } = useContext(UserContext);
    const submit = async (e) => {
        e.preventDefault();
        const newItem = { item };
        await Axios.post('/todos/', newItem, {
            headers: { "x-auth-token": userData.token }
        });
        props.getItems();
        setItem('');

    }
    return <form onSubmit={submit}>
        <input className="itemInput" onChange={(e) => setItem(e.target.value)} type="text" value={item} />
        <button className="itemButton" type="submit"><span className="buttonSpan">Add</span></button>
    </form>
}
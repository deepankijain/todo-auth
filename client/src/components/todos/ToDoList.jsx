import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import UserContext from '../context/UserContext';
import InputArea from './InputArea';


export default function ToDoList() {
    const { userData } = useContext(UserContext);

    const [items, setItems] = useState([]);
    useEffect(() => {
        getItems();
    }, // eslint-disable-next-line
        []);
    ////Get request to get all the todo items.////
    const getItems = async () => {
        let response = await Axios.get("/todos/all",
            {
                headers: { "x-auth-token": userData.token }
            })
        let itemsRes = await response;
        setItems(itemsRes.data);
    }
    return <div className="todo-div" >
        <h2 className="heading">ToDos</h2>
        <InputArea getItems={getItems} />
        <ul>
            {items.map(item => {
                return <div key={item._id} onClick={() => {
                    const deleteItems = async () => {
                        await Axios.delete(`/todos/${item._id}`,
                            {
                                headers: { "x-auth-token": userData.token }
                            });
                        getItems();
                    }
                    deleteItems();
                }}>
                    <li>{item.item}</li>
                </div>
            })}
        </ul>
    </div>
} 
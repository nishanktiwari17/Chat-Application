import React, {useEffect, useState} from 'react';
import {Avatar} from "@material-ui/core";
import './SidebarChat.css';
import db from './firebase';
import {Link} from 'react-router-dom';
import form from './Form.js'
import Chat from './Chat.js'
import DeleteIcon from '@mui/icons-material/Delete';

function SidebarChat({ id, name, password, addNewChat }) {
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("");
    const [pass, setPass] = useState(false)

    useEffect(() => {
        if(id){
            db.collection('rooms')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp','desc')
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map((doc) => doc.data()))
            })
        }
    }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));        
    }, []);

    const deleteChat = () => {
        db.collection("rooms").doc(id).delete()
        //Link to nxt room\
    }

    const createChat = () => {
        const roomName = prompt("Please Enter Name for Chat");
        const password = prompt("Enter Password")

        if(roomName){
            db.collection("rooms").add({
                name: roomName,
                password: password
            })
        }
    };

    const checkPassword = () => {
        const password = prompt("Enter password for entering the room")
        if(id){
            db.collection('rooms')
            .doc(id)
            .onSnapshot(snapshot => {
                const existingPassword = snapshot.data().password
                if(password === existingPassword) {
                    <Link to={`/rooms/${id}`} key={id} ></Link>
                }
            })
        }
    }

    return !addNewChat ? (
            <div className="sidebarChat" >
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebarChat_info">
                    <h2 onClick={checkPassword} className='room_heading'>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h3 className="add-new-chat-title">Add New Chat</h3>
        </div>
    )
}

export default SidebarChat


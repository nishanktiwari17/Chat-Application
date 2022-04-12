import React, {useEffect, useState} from 'react';
import {Avatar} from "@material-ui/core";
import './SidebarChat.css';
import db from './firebase';
import {Link} from 'react-router-dom';
import form from './Form.js'
import DeleteIcon from '@mui/icons-material/Delete';

function SidebarChat({ id, name, addNewChat }) {
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("");

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
        //Link to nxt room
    }

    const createChat = () => {
        const roomName = prompt("Please Enter Name for Chat");

        if(roomName){
            db.collection("rooms").add({
                name: roomName
            })
        }
    };

    return !addNewChat ? (
            <div className="sidebarChat" >
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebarChat_info">
                <Link to={`/rooms/${id}`} key={id} >
                    <h2 className='room_heading'>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </Link>
                </div>
                <DeleteIcon className='delete' onClick = {deleteChat} />
            </div>
        
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h3 className="add-new-chat-title">Add New Chat</h3>
        </div>
    )
}

export default SidebarChat


import React, { useEffect, useState } from 'react'
import "./sidebar.css"
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from "@material-ui/core"
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import SidebarChat from "./SidebarChat"
import db from './firebase'
import {useStateValue, StateProvider, StateContext} from './StateProvider'

function Sidebar(){
    
    const [rooms,setRooms] = useState([]);
    const[{user}, dispatch] = useStateValue();

    useEffect(() => {
        //onSnapShot => For any change in firebase database 
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data(),
                }
            )

            ))
        ));

        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={user?.photoURL} />
                <h3 className= "user_name" >{user?.displayName}</h3>
                <div className="sidebar_headerRight">
                <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <ChatIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
                </div>
            </div>
            <div className="sidebar_searh">
                <div className="sidebar_searchContainer">
                    <SearchIcon />
                    <input type="text"  placeholder="Search or Start New chat" name="" id="" />
                </div>
            </div>
            <div className="sidebar_chat">
                    <SidebarChat addNewChat/>
                {rooms.map((room) => {
                    return (<SidebarChat key={room.id} id={room.id} name={room.data.name} />)
                })}
            </div>
        </div>
    )
}

export default Sidebar;

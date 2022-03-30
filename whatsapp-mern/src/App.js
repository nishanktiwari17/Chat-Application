import './App.css';
import Chat from './Chat';
import Sidebar from './sidebar';
import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from "./Login"
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();

  // Project Console: https://console.firebase.google.com/project/chat-application-5137c/overview
  // Hosting URL: https://chat-application-5137c.web.app
  return (

    <div className="app">
          
          {!user ? (
            <Login />
          ) : (
            <div className="app_body">
                  <Router>
                          <Sidebar/>
                          <Switch>
                            <Route path="/rooms/:roomId">
                              <Chat/>
                            </Route>
                            <Route path="/">
                              <Chat/>
                            </Route>              
                          </Switch>            
                  </Router>
            </div>
          )}
      
    </div>
  );
}

export default App;

import React, { useState, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import Lobby from './Lobby';
import Room from './Room';

const VideoChat = () => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);
  
  const handleUsernameChange = useCallback(event => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value.replace(/\s+/g,'-').toLowerCase());
  }, []);

  const handleSubmit = useCallback(async event => {
    // console.log(username, roomName);
    event.preventDefault();
    // roomName = roomName.replace(/\s+/g,'-').toLowerCase() // replace spaces with -
    const data = await fetch('http://localhost:3001/video/token', {
      method: 'POST',
      mode: 'cors', 
      body: JSON.stringify({
        identity: username,
        room: roomName
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
    setToken(data.token);
  }, [username, roomName]);

  // const data = await fetch('http://localhost:3001/api/greeting', {
  //   method: 'GET',
  //   mode: 'no-cors',
  //   headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       }).then(res => res.json();
  // })

  const handleLogout = useCallback(event => {
    setToken(null);
  }, []);

   let render;
  if (token) {
    render = (
        // <Room roomName={roomName} token={token} handleLogout={handleLogout} />
        <Redirect to={{
          pathname: '/'+roomName,
          state: { roomName: roomName,
                   token: token }
        }}/>
    );
  } else {
    render = (
      <Lobby
         username={username}
         roomName={roomName}
         handleUsernameChange={handleUsernameChange}
         handleRoomNameChange={handleRoomNameChange}
         handleSubmit={handleSubmit}
      />
    );
  }
  return render;
};

export default VideoChat;
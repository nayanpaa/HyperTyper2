import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client'
// mport { initializeSocket, disconnectSocket, getSocket } from './socketManager';


// TODO: need to handle room of people joining now, and double check new code

let socket;

const MultiPlayerPage = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [joined, setJoined] = useState(false);
  const [nickname, setNickname] = useState('');
  const [roomID, setRoomID] = useState('');

  useEffect(() => {
    // initializeSocket();

    try {
      socket = io('/', {
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionRelay: 1000,
      });

      socket.on('connect', async () => {
        console.log('connected to socket.io as', socket.id)
      })

      socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
      });

      socket.on('reconnect', (attemptNumber) => {
        console.log('Reconnected after', attemptNumber, 'attempts');
      });
      
      socket.on('reconnect_attempt', (attemptNumber) => {
        console.log('Attempting reconnection:', attemptNumber);
      });

    } catch (error) {
      console.error('ERROR setting up socket connection:', error)
    }
    

    return () => {
      // disconnectSocket();
      socket.disconnect();
    };
  }, []);

  const createGame = () => {
    setShowCreate(true);
  }

  const joinGame = () => {
    setShowJoin(true);
  }

  const handleNicknameInputChange = (e) => {
    setNickname(e.target.value);
  };

  const handleIDInputChange = (e) => {
    setRoomID(e.target.value);
  }

  const handleCreateSubmit = (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    if (nickname.trim()) { // Check if nickname is not just whitespace
      setJoined(true);
      setRoomID(String(Math.floor(Math.random() * 10000)).padStart(4, '0'));
      socket.emit('createRoom', roomID, nickname);
    }
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    if (nickname.trim() && roomID.trim()) { // Check if nickname is not just whitespace
      setJoined(true);
      socket.emit('joinRoom', roomID, nickname);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (joinGame) {
        handleJoinSubmit(e);
      }
      if (createGame) {
        handleCreateSubmit(e);
      }
    }
  };



  // Rest of your component logic...

  return (
    <div>
      { !showCreate && !showJoin
        ? <div> 
            <button onClick={createGame}>Create Game</button>
            <button onClick={joinGame}>Join Game</button>
          </div>
        : null
      }
      { showCreate
        ? <div>
            <form onSubmit={handleCreateSubmit}>
              <label htmlFor="nickname">Enter Your Nickname:</label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={handleNicknameInputChange}
                KeyboardEventHandler={handleKeyPress}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        : null
      }
      { showJoin
        ? <div>
            <form onSubmit={handleJoinSubmit} KeyboardEventHandler={handleKeyPress}>
              <label htmlFor="nickname">Enter Your Nickname:</label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={handleNicknameInputChange}
              />
              <input
                id="roomID"
                type="text"
                value={roomID}
                onChange={handleIDInputChange}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        : null
      }
      { joined
        ? <div> 
            <button onClick={createGame}>Create Game</button>
            <button onClick={joinGame}>Join Game</button>
          </div>
        : null
      }
    </div>
  );
}

export default MultiPlayerPage;
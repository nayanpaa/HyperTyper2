import React, { useEffect, useState, useCallback } from 'react';
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
  const [players, setPlayers] = useState([]);

  const setupSocketListeners = useCallback(() => {
    socket.on('connect', async () => {
      console.log('connected to socket.io as', socket.id);
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    socket.on('reconnect', (attemptNumber) => {
      console.log('Reconnected after', attemptNumber, 'attempts');
    });
    
    socket.on('reconnect_attempt', (attemptNumber) => {
      console.log('Attempting reconnection:', attemptNumber);
    });

    socket.on('playerJoined', ({ playerId, roomId }) => {
      console.log(`Player ${playerId} joined room ${roomId}`);
      setPlayers(prevPlayers => [...prevPlayers, playerId]);
    });

    socket.on('gameStarted', () => {
      console.log('Game started!');
    });
  }, []);

  useEffect(() => {
    try {
      socket = io('/', {
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
      });

      setupSocketListeners();
    } catch (error) {
      console.error('ERROR setting up socket connection:', error);
    }

    return () => {
      if (socket) socket.disconnect();
    };
  }, [setupSocketListeners]);

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
      const newRoomID = String(Math.floor(Math.random() * 10000)).padStart(4, '0')
      setJoined(true);
      setRoomID(newRoomID);
      setPlayers(prevPlayers => [...prevPlayers, nickname]);
      socket.emit('createRoom', newRoomID, nickname);
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

  const startGame = () => {
    socket.emit('startGame', roomID);
    //what happens
  }


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
                onKeyPress={handleKeyPress}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        : null
      }
      { showJoin
        ? <div>
            <form onSubmit={handleJoinSubmit} onKeyPress={handleKeyPress}>
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
            Waiting Room
            <h3>Players in Room:</h3>
            <ul>
              {players.map((playerId, index) => (
                <li key={index}>{playerId}</li>
              ))}
            </ul>
            <div>
              { showCreate
                ? <button onClick={startGame} type="submit">Start Game</button>
                : null
              }
            </div>
          </div>
        : null
      }
    </div>
  );
}

export default MultiPlayerPage;
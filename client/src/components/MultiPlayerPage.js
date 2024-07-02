import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client'
// mport { initializeSocket, disconnectSocket, getSocket } from './socketManager';


/*
  someone comes in and is given the choice to create a room or join a room
  

*/

let socket;

const MultiPlayerPage = () => {
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

  // Rest of your component logic...
}

export default MultiPlayerPage;
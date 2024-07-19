import React from 'react';
//import Button from './Button';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div>
      <div>
        <Link className="link" to='/play/ghost'>
          <button className="button-46">
            Race Ghost
          </button>
        </Link>
      </div>
      <div>
        <button className="button-46">Training Mode</button>
      </div>
      <div>
        <Link className="link" to='/play/multiplayer'>
          <button className="button-46">
            Play Friends
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;


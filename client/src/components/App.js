import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import GhostPage from './GhostPage';
import Dashboard from './Dashboard';
import './App.css';


//const TrainPage = () => <h2>TrainPage</h2>

class App extends Component {
  //fetch current user when the app mounts
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <style>{'body { background-color: rgb(47, 47, 47); padding-top: 80px; }'}</style>
          <BrowserRouter>
            <div className="container-fluid">
              <Header />
              <Route exact path="/" component={Landing}/>
              <Route exact path="/home" component={Dashboard}/>
              <Route path="/play/ghost" component={GhostPage}/>
            </div>
          </BrowserRouter>
      </div>  
    );
  };
};

export default connect(null, actions)(App);
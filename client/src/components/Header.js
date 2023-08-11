import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.css';
import hypertyperLogo from '../icons/logofinal.png';

class Header extends Component {
  renderContent() {
    switch(this.props.auth) {
      case null:
        return;
      case false:
        return (
          <a className="google-link" href="/auth/google">Login With Google</a>
        )
      default:
        return <a className="google-link" href="/api/logout">Logout</a>
    }
  }

  render() {
    return (
      
      <div className="nav-wrapper">
        <div className="left">
          <Link 
            to={this.props.auth ? '/home': '/'} 
            className="left-brand-logo"
          >
            <img className="logo" src={hypertyperLogo} alt="hypertyper logo"/>
          </Link>
        </div>
        <div className="right">
          {this.renderContent()}
        </div>
        
      </div>
    );
  }
}

function mapStateToProps({auth}) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
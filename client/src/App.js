import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import Header from './components/layouts/Header'
import Notification from './components/layouts/Notification'
import Routes from './Routes'
import {userInfo} from './Helpers'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: false,
      notification: {
        type: '',
        messages: []
      }
    };
    this.auth = this.auth.bind(this);
    this.notification = this.notification.bind(this);
    userInfo(this.auth)
  }

  auth(user){
    this.setState({user})
  }

  notification(notification){
    this.setState({notification})
  }

  render() {
    return (
      <Router>
          <div className="container">
            <Header user={this.state.user} />
            <Notification notification = {this.state.notification} notificationShow={this.notification} />
            <Routes auth={this.auth} user={this.state.user} notificationShow={this.notification} />
          </div>
      </Router>
    );
  }
}

export default App;

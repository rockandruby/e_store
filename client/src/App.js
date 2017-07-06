import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import Header from './components/layouts/Header'
import Routes from './Routes'
import {userInfo} from './Helpers'

class App extends Component {

  constructor(){
    super();
    this.state = {
      user: false
    };
    this.auth = this.auth.bind(this)
  }

  auth(user){
    this.setState({user})
  }

  componentDidMount(){
    userInfo(this.auth)
  }

  render() {
    return (
      <Router>
          <div className="container">
            <Header user={this.state.user} />
            <Routes auth={this.auth} user={this.state.user} />
          </div>
      </Router>
    );
  }
}

export default App;

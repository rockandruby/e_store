import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import Header from './components/layouts/Header'
import Error from './components/layouts/Error'
import Routes from './Routes'
import {userInfo} from './Helpers'

class App extends Component {

  constructor(){
    super();
    this.state = {
      user: false,
      errors: []
    };
    this.auth = this.auth.bind(this);
    this.errorsShow = this.errorsShow.bind(this)
  }

  auth(user){
    this.setState({user})
  }

  errorsShow(errors){
    this.setState({errors: [].concat(errors)})
  }

  componentDidMount(){
    userInfo(this.auth)
  }

  render() {
    return (
      <Router>
          <div className="container">
            <Header user={this.state.user} />
            <Error errors = {this.state.errors} errorsShow={this.errorsShow} />
            <Routes auth={this.auth} user={this.state.user} errorsShow={this.errorsShow} />
          </div>
      </Router>
    );
  }
}

export default App;

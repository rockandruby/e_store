import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import Sidebar from './../layouts/Sidebar';
import Orders from './Orders'
import Order from './Order'
import Info from './Info'

class Profile extends Component{

  render(){
    return(
      <Sidebar>
        {
          Object.is(this.props.location.pathname, '/profile') &&
          <h3>Welcome, {this.props.user.name}</h3>
        }
        <Route path={`${this.props.path}/info`} render={(props) => (<Info {...Object.assign(props, this.props)} />)} />
        <Route exact path={`${this.props.path}/orders`} render={(props) => (<Orders {...Object.assign(props, this.props)} />)} />
        <Route path={`${this.props.path}/orders/:id`} component={Order}/>
      </Sidebar>
    )
  }

}

export default Profile

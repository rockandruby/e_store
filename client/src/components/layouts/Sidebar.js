import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './sidebar_profile.css'

class Sidebar extends Component{
  render(){
    return(
      <div id="wrapper">

        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            <li className="sidebar-brand">
              <Link to="/profile">Menu</Link>
            </li>
            <li>
              <Link to="/profile/info">Profile info</Link>
            </li>
            <li>
              <Link to="/profile/orders">Orders</Link>
            </li>
          </ul>
        </div>

        <div id="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Sidebar;
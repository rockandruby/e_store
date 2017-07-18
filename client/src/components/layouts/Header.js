import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Header extends Component{

  render(){
    return(
      <div>
        <ul className="nav nav-tabs">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          {
            this.props.user ? (
              [
                <li key="1"><Link to="/profile">Profile</Link></li>,
                <li key="2" className="pull-right"><Link to="/sign_out">Sign out</Link></li>
              ]
              ) : (
                [
                  <li key="1" className="pull-right"><Link to="/sign_up">Sign up</Link></li>,
                  <li key="2" className="pull-right"><Link to="/sign_in">Sign in</Link></li>
                ]
              )
          }
          <li className="pull-right"><Link to="/cart"><i className="glyphicon glyphicon-shopping-cart"/></Link></li>
        </ul>
      </div>
    )
  }

}

export default Header
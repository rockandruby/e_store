import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import * as Components from './Components'
import {Redirect} from 'react-router-dom'

class Routes extends Component{
  render(){
    return(
      <div>
        <Route exact path="/" component={Components.Home} />
        <Route path="/products" component={Components.Products} />
        <Route path="/sign_in" render={() => (<Components.SignIn user={this.props.user} auth={this.props.auth} />)} />
        <Route path="/sign_up" render={() => (<Components.SignUp user={this.props.user} auth={this.props.auth} />)} />
        <PrivateRoute auth={this.props.auth} user={this.props.user} path="/sign_out" component={Components.SignOut} />
        <PrivateRoute auth={this.props.auth} user={this.props.user} path="/profile" component={Components.Profile} />
      </div>
    )
  }
}

class PrivateRoute extends Component{

  render(){
    return(
        <Route path={this.props.path} render={()=>(
          this.props.user ? (
              <this.props.component auth={this.props.auth} user={this.props.user} />
            ) : (
              <Redirect to={{pathname: '/sign_in'}}/>
          )
        )}
        />
    )
  }

}

export default Routes

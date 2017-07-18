import React, { Component } from 'react';
import {Route, Redirect, Switch} from 'react-router-dom'
import * as Components from './Components'

class Routes extends Component{

  render(){
    return(
      <Switch>
        <Route exact path="/" component={Components.Home} />
        <Route exact path="/products" component={Components.Products} />
        <Route path="/products/:id" render={(props) => (<Components.Product {...Object.assign(props, this.props)} />)} />
        <Route path="/sign_in" render={(props) => (<Components.SignIn {...Object.assign(props, this.props)} />)} />
        <Route path="/sign_up" render={(props) => (<Components.SignUp {...Object.assign(props, this.props)} />)} />
        <Route path="/cart" render={(props) => (<Components.Cart {...Object.assign(props, this.props)} />)} />

        <PrivateRoute {...this.props} path="/sign_out" component={Components.SignOut} />
        <PrivateRoute {...this.props} path="/profile" component={Components.Profile} />
      </Switch>
    )
  }
}

class PrivateRoute extends Component{

  render(){
    return(
        <Route path={this.props.path} render={(props)=>(
          this.props.user ? (
              <this.props.component {...Object.assign(props, this.props)} />
            ) : (
              <Redirect to={{pathname: '/sign_in', state: { from: props.location.pathname } }}/>
          )
        )}
        />
    )
  }

}

export default Routes

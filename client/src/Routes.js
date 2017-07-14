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
        <Route path="/sign_in" render={(props) => (<Components.SignIn {...Object.assign(props, this.props)} />)} />
        <Route path="/sign_up" render={(props) => (<Components.SignUp {...Object.assign(props, this.props)} />)} />

        <PrivateRoute {...this.props} path="/sign_out" component={Components.SignOut} />
        <PrivateRoute {...this.props} path="/profile" component={Components.Profile} />
        <PrivateRoute {...this.props} path="/orders" component={Components.Orders} />
      </div>
    )
  }
}

class PrivateRoute extends Component{

  render(){
    return(
        <Route path={this.props.path} render={(props)=>(
          this.props.user ? (
              <this.props.component {...this.props} />
            ) : (
              <Redirect to={{pathname: '/sign_in', state: { from: props.location.pathname } }}/>
          )
        )}
        />
    )
  }

}

export default Routes

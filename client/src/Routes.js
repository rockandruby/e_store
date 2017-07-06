import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import * as Components from './Components'

class Routes extends Component{
  render(){
    return(
      <div>
        <Route exact path="/" component={Components.Home} />
        <Route path="/products" component={Components.Products} />
      </div>
    )
  }
}

export default Routes
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'

class SignOut extends Component{

  componentDidMount() {
    if(this.props.user){
      fetch('/api/v1/sessions',{
        method: 'DELETE',
        headers: {
          "Authorization": `Token token=${localStorage.getItem('token')}`
        },
      }).then(()=> {
        localStorage.removeItem('token');
        this.props.auth(false)
      }).catch((e)=> console.log(e))
    }
  }

  render(){
    return(
      <div>
        <Redirect to={{pathname: '/sign_in'}} />
      </div>
    )
  }

}

export default SignOut
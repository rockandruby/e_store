import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {userInfo} from './../../Helpers'
import Facebook from './Fb'

class SignIn extends Component{

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault();
    fetch('/api/v1/sessions',{
      method: "POST",
      body: JSON.stringify({email: this.state.email, password: this.state.password}),
      headers: {
        "Content-Type": "application/json"
      },
    }).then((data)=> data.json())
      .then((response)=>{
        if(response.error){
          this.props.notificationShow({type: 'error', messages: [].concat(response.error)})
        }else{
          localStorage.setItem('token', response.token);
          userInfo(this.props.auth);
        }
      })
      .catch((e)=> {console.log(e)})
  }

  render(){
    const redirect = this.props.location.state ? this.props.location.state.from : '/profile';
    if(this.props.user){
      return <Redirect to={{pathname: redirect}}/>
    }
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Email address:</label>
          <input onChange={this.handleChange} type="email" className="form-control" name="email" />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input onChange={this.handleChange} type="password" className="form-control" name="password" />
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
        <Facebook callback={this.props.auth} />
      </form>
    )
  }

}

export default SignIn
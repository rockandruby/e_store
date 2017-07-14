import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import Facebook from './Fb'

class SignUp extends Component{

  constructor(){
    super();
    this.state = {
      name: '',
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
    fetch('/api/v1/users',{
      method: "POST",
      body: JSON.stringify({user: {email: this.state.email, password: this.state.password, name: this.state.name}}),
      headers: {
        "Content-Type": "application/json"
      },
    }).then((data)=> data.json())
      .then((response)=>{
        if(response.error){
          this.props.errorsShow(response.error)
        }else{
          localStorage.setItem('token', response.token);
          this.props.auth(response);
        }
      })
      .catch((e)=> {console.log(e)})
  }

  render(){
    if(this.props.user){
      return <Redirect to={{pathname: '/profile'}}/>
    }

    return(
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input onChange={this.handleChange} type="text" className="form-control" name="name" />
        </div>
        <div className="form-group">
          <label>Email address:</label>
          <input onChange={this.handleChange} type="email" className="form-control" name="email"/>
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input onChange={this.handleChange} type="password" className="form-control" name="password"/>
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
        <Facebook callback={this.props.auth} />
      </form>
    )
  }

}

export default SignUp
import React, { Component } from 'react';

class SignUp extends Component{

  render(){
    return(
      <form>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" className="form-control" name="name" />
        </div>
        <div className="form-group">
          <label>Email address:</label>
          <input type="email" className="form-control" name="email"/>
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" className="form-control" name="password"/>
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    )
  }

}

export default SignUp
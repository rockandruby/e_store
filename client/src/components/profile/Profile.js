import React, { Component } from 'react';

class Profile extends Component{

  render(){
    return(
      <div>
        Hello, {this.props.user.name}
      </div>
    )
  }

}

export default Profile

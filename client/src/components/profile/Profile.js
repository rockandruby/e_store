import React, { Component } from 'react';
import Dropzone from 'react-dropzone'

class Profile extends Component{

  constructor(){
    super();
    this.state = {
      avatar: ''
    };
    this.onDrop = this.onDrop.bind(this)
  }

  componentDidMount(){
    this.setState({avatar: this.props.user.avatar})
  }

  onDrop(acceptedFiles, rejectedFiles){
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      fetch('/api/v1/users/upload', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token token=${localStorage.getItem('token')}`
        },
        method: "POST",
        body: JSON.stringify({
          file: event.target.result,
          type: file['type']
        })
      }).then((response) => response.json()).then((data) => {
        this.setState({avatar: data.avatar})
      });
    };
    reader.readAsDataURL(file);
  }

  render(){
    return(
      <div>
        Hello, {this.props.user.name}
        <Dropzone maxSize={500000} accept="image/*" onDrop={this.onDrop}>
          <img style={{width: '197px'}} src={this.state.avatar}/>
        </Dropzone>
      </div>
    )
  }

}

export default Profile

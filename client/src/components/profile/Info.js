import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class Info extends Component{
  constructor(props){
    super(props);
    this.state = {
      avatar: '',
      edit: false,
      data: {
        name: props.user.name,
        address: props.user.address
      }
    };
    this.onDrop = this.onDrop.bind(this);
    this.edit = this.edit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    this.setState({avatar: this.props.user.avatar})
  }

  onDrop(acceptedFiles, rejectedFiles){
    const file = acceptedFiles[0],
          reader = new FileReader();
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

  handleChange(e){
    const key = e.target.name,
          value = e.target.value;
    this.setState((prev, props) => {
      return ({
        data: Object.assign(prev.data, {[key]: value})
      })
    })
  }

  handleSubmit(e){
    e.preventDefault();
    fetch('/api/v1/users/0', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token token=${localStorage.getItem('token')}`
      },
      method: "PATCH",
      body: JSON.stringify(this.state.data)
    }).then((response) => response.json()).then((data) => {
      if(data.error){
        this.props.notificationShow({type: 'error', messages: data.error})
      }else{
        this.props.auth(data);
        this.setState({edit: false})
      }
    });
  }

  edit(){
    this.setState((prev, props) => {
      return {edit: !prev.edit}
    })
  }

  render(){
    return(
    <div className="row">
      <div className="col-lg-3">
        <Dropzone maxSize={500000} accept="image/*" onDrop={this.onDrop}>
          {
            this.state.avatar ? <img alt="" style={{width: '197px'}} src={this.state.avatar}/> : 'Click to upload avatar'
          }
        </Dropzone>
      </div>
      <div className="col-lg-3">
        {
          this.state.edit ?
            (<form onSubmit={this.handleSubmit} className="form">
              <div className="form-group">
                <input onChange={this.handleChange} value={this.state.data.name} type="text" name="name" placeholder="Name"/>
              </div>
              <div className="form-group">
                <textarea onChange={this.handleChange} value={this.state.data.address || ''} name="address" placeholder="Shipping address" />
              </div>
              <button type="submit" className="btn btn-success">Save</button>
            </form>) : (<div>
              <div><b>Name: </b>{this.props.user.name}</div>
              <div><b>Address: </b>{this.props.user.address}</div>
            </div>)
        }
      </div>
      <div className="col-lg-1">
        <i onClick={this.edit} className="glyphicon glyphicon-pencil" />
      </div>
    </div>
    )
  }
}

export default Info;

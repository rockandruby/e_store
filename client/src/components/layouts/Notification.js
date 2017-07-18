import React, { Component } from 'react';

class Notification extends Component{

  constructor(props){
    super(props);
    this.color = {
      error: 'red',
      success: 'green'
    }
  }

  componentWillReceiveProps(nextProps){
    if(Object.is(this.props.notification, nextProps.notification)){
      this.props.notificationShow({type: '', messages: []})
    }
  }

  render(){
    return(
      <div>
        {
          this.props.notification.type &&
          <ul>
            {
              this.props.notification.messages.map((el, i) => {
                return <li key={i} style={{color: this.color[this.props.notification.type]}}>{el}</li>
              })
            }
          </ul>

        }
      </div>
    )
  }

}

export default Notification
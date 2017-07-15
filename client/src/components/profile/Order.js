import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import Moment from 'react-moment';

class Order extends Component {

  constructor(props){
    super(props);
    this.state = {
      order: {},
      redirect: false
    }
  }

  componentDidMount(){
    fetch('/api/v1/orders/' + this.props.match.params.id,{
      headers: {
        "Authorization": `Token token=${localStorage.getItem('token')}`
      },
    }).then((data)=> data.json())
      .then((order)=>{
        if(order){
          this.setState({order})
        }else{
          this.setState({redirect: true})
        }
      })
      .catch((e)=> {console.log(e)})
  }

  render(){
    return(
      <div>
        {
          this.state.redirect ?
            (<Redirect to="/profile" />) :
            (
              <div>
                <div><b>Order ID: </b>{this.state.order.id}</div>
                <div><b>Order Amount: </b>{this.state.order.amount}</div>
                <div><b>Order Date: </b><Moment format="YYYY/MM/DD">{this.state.order.created_at}</Moment></div>
              </div>
            )
        }
      </div>
    )
  }

}

export default Order
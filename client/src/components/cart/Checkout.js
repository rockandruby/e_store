import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'

class Checkout extends Component{

  constructor(props){
    super(props);
    this.state = {
      success: false,
      address: props.user.address
    };
    this.placeOrder = this.placeOrder.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    this.total = 0;
    Object.keys(this.cart).map((k) => {
      this.total += this.cart[k].price * this.cart[k].qty
    });
  }

  handleChange(e){
    this.setState({address: e.target.value})
  }

  placeOrder(e){
    e.preventDefault();
    if(this.state.address.length < 1){
      return this.props.notificationShow({type: 'error', messages: ["Address can't be blank"]})
    }
    fetch('/api/v1/orders',{
      method: "POST",
      body: JSON.stringify({cart: this.cart, address: this.state.address}),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token token=${localStorage.getItem('token')}`
      },
    }).then((data)=> data.json())
      .then((response)=>{
        if(response.error){
          this.props.notificationShow({type: 'error', messages: [].concat(response.error)})
        }else{
          localStorage.removeItem('cart');
          this.setState({success: true})
        }
      })
      .catch((e)=> {console.log(e)})
  }

  render(){
    if(this.state.success){
      return <Redirect to={{pathname: "/profile/orders", state: {success: true} }} />
    }else if(this.cart.length < 1){
      return <Redirect to="/products"/>
    }

    return(
      <div>
        <b>Total: {this.total}</b>
        <form onSubmit={this.placeOrder}>
          <div className="form-group">
            <label>Shipping address:</label>
            <textarea onChange={this.handleChange} className="form-control" name="address" value={this.state.address} />
          </div>
          <button type="submit" className="btn btn-success">Confirm</button>
        </form>
      </div>
    )
  }
}

export default Checkout
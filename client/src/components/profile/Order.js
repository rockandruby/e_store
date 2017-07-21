import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import Moment from 'react-moment';

class Order extends Component {

  constructor(props){
    super(props);
    this.state = {
      order: {},
      items: [],
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
          this.setState({order: order, items: order.items})
        }else{
          this.setState({redirect: true})
        }
      })
      .catch((e)=> {console.log(e)})
  }

  render(){
    let total = 0,
      item_total = 0;
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
                <table className="table">
                  <thead>
                  <tr>
                    <td>Item</td>
                    <td>Details</td>
                    <td>Qty</td>
                    <td>Price $</td>
                    <td>Total $</td>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.items.map((i, k) => {
                      let item_info = JSON.parse(i.item_info),
                          details = JSON.parse(i.details);
                      item_total = (item_info.price * i.qty).toFixed(2);
                      total += +item_total;
                      return <tr key={k}>
                        <td>{item_info.title}</td>
                        <td>
                          {
                            Object.keys(details).map((v, k) => {
                              return(
                                <div key={k}>{v}: {details[v]}</div>
                              )
                            })
                          }
                        </td>
                        <td>{i.qty}</td>
                        <td>{item_info.price}</td>
                        <td>{item_total}</td>
                      </tr>
                    })
                  }
                  </tbody>
                </table>
              </div>
            )
        }
      </div>
    )
  }

}

export default Order
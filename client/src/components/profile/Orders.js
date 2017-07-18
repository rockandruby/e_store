import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';

class Orders extends Component{

  constructor(props){
    super(props);
    this.state = {
      orders: []
    }
  }

  componentDidMount(){
    fetch('/api/v1/orders',{
      headers: {
        "Authorization": `Token token=${localStorage.getItem('token')}`
      },
    }).then((data)=> data.json())
      .then((orders)=>{
        this.setState({orders})
      })
      .catch((e)=> {console.log(e)})
  }

  render(){
    return(
      <div>
        {
          this.state.orders.length > 0 &&
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>AMOUNT</th>
                <th>DATE</th>
                <th>DETAILS</th>
              </tr>
            </thead>
            <tbody>
            {this.state.orders.map((o)=>{
              return (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.amount}</td>
                  <td><Moment format="YYYY/MM/DD">{o.created_at}</Moment></td>
                  <td><Link to={`${this.props.location.pathname}/${o.id}`}>Show</Link></td>
                </tr>
              )
            })}
            </tbody>
          </table>
        }
      </div>
    )
  }
}

export default Orders

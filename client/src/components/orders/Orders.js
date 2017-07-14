import React, { Component } from 'react';

class Orders extends Component{
  render(){
    return(
      <div>
        Orders
        {
          this.props.orders &&
          <table className="table">
            <thead>
              <th>ID</th>
              <th>AMOUNT</th>
              <th>DATE</th>
            </thead>
            <tbody>
            {this.props.orders.map((o)=>{
              return (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.sum}</td>
                  <td>{o.created_at}</td>
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

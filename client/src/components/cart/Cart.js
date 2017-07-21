import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Cart extends Component{

  componentWillMount(){
    this.items = [];
    if(localStorage.getItem('cart')){
      this.items = JSON.parse(localStorage.getItem('cart'))
    }
    this.state = {
      qty: 0,
      remove: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.removeEmpty = this.removeEmpty.bind(this);
  }

  handleChange(e){
    this.items[e.target.dataset['item']]['qty'] = e.target.value;
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.setState({qty: e.target.value})
  }

  removeEmpty(e){
    if(e.target.value < 1) this.handleRemove(e)
  }

  handleRemove(e){
    this.items.splice(e.target.dataset['item'], 1);
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.setState({remove: true})
  }

  render(){
    let total = 0,
        item_total = 0;
    return(
      <div>
        {
          this.items.length < 1 ? (
              <h3>Cart is empty</h3>
            ) : (
            <div>
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
                  this.items.map((i, k) => {
                    item_total = (i.price * i.qty).toFixed(2);
                    total += +item_total;
                    return <tr key={k}>
                      <td>{i.title}</td>
                      <td>
                        {
                          Object.keys(i.details).map((v, k) => {
                            return(
                              <div key={k}>{v}: {i.details[v]}</div>
                            )
                          })
                        }
                      </td>
                      <td><input data-item={k} onMouseLeave={this.removeEmpty} onChange={this.handleChange} type="number" name="qty" value={i.qty} />
                        <i data-item={k} onClick={this.handleRemove} className="glyphicon glyphicon-remove" />
                      </td>
                      <td>{i.price}</td>
                      <td>{item_total}</td>
                    </tr>
                  })
                }
                </tbody>
              </table>
              <b>Total: </b> {total.toFixed(2)} $
              <div>
                <Link to='/checkout' className="btn btn-success">Place order</Link>
              </div>
            </div>
            )
        }
      </div>
    )
  }

}

export default Cart
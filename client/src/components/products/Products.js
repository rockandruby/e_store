import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Products extends Component{

  constructor(props){
    super(props);
    this.state = {
      products: []
    }
  }

  componentDidMount(){
    fetch('/api/v1/products').then((data)=> data.json())
      .then((products)=> this.setState({products}))
      .catch((e)=> {console.log(e)})
  }

  render(){
    return(
      <div className="row">
        {
          this.state.products.map((p) => {
            return (
            <Link key={p.id} to={`/products/${p.id}`}>
              <div className="col-lg-3 thumbnail">
                <div><b>{p.item.title}</b></div>
                <div><b>Price: </b>{p.item.price} $</div>
              </div>
            </Link>

            )
          })
        }
      </div>
    )
  }

}

export default Products
import React, { Component } from 'react';
import Product from './Product'

class Products extends Component{

  constructor(){
    super();
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
    const products = this.state.products.map((item)=> <Product key={item.id} price={item.price} title={item.title}/>);
    return(
      <div>
        {products}
      </div>
    )
  }

}

export default Products
import React, { Component } from 'react';

class Products extends Component{

  constructor(){
    super();
    this.state = {
      products: []
    }
  }

  componentDidMount(){
    fetch('/api/v1/products',{
      headers: {
        'Authorization': 'Token token=srMbV8ibxWeFvsakgsF8SEVf'
      }
    }).then((data)=> data.json())
      .then((products)=> this.setState({products}))
      .catch((e)=> {console.log(e)})
  }

  render(){
    console.log(this.state);
    return(
      <div>
        Products
      </div>
    )
  }

}

export default Products
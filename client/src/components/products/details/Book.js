import React, { Component } from 'react';

class Book extends Component{
  render(){
    const product = this.props.product;

    return(
      <div>
        <div><b>Description: </b>{product.item.description}</div>
      </div>
    )
  }
}

export default Book;
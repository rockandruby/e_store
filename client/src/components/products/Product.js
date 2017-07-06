import React, { Component } from 'react';

class Product extends Component{

  render(){
    return(
      <div className="col-lg-3">
        <a href="#" className="thumbnail">
          {this.props.title} {this.props.price}$
        </a>
      </div>
    )
  }

}

export default Product
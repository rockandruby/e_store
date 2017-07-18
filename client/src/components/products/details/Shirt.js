import React, { Component } from 'react';

class Shirt extends Component{

  componentWillMount(){
    this.props.validator({
      size: ['S', 'M', 'L', 'XL'],
      color: ['Red', 'White', 'Black']
    })
  }

  render(){
    const product = this.props.product;

    return(
      <div>
        <div><b>Brand: </b>{product.item.brand}</div>
        <form className="form">
          <div className="form-group">
            <label>Size</label>
            <select onChange={this.props.handleProductParams} type="text" className="form-control" name="size">
              <option></option>
              <option value='S'>S</option>
              <option value='M'>M</option>
              <option value='L'>L</option>
              <option value='XL'>XL</option>
            </select>
            <label>Color</label>
            <select onChange={this.props.handleProductParams} type="text" className="form-control" name="color">
              <option></option>
              <option value='Red'>Red</option>
              <option value='White'>White</option>
              <option value='Black'>Black</option>
            </select>

          </div>
        </form>
      </div>
    )
  }
}

export default Shirt;
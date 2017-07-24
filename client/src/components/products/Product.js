import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import * as Details from './Details'

class Product extends Component{

  constructor(props){
    super(props);
    this.rules = {
      qty: 'number'
    };
    this.state = {
      product: {},
      product_params: {
        details: {}
      },
      redirect: false
    };
    this.handleProductParams = this.handleProductParams.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setValidator = this.setValidator.bind(this)
  }

  componentDidMount(){
    fetch('/api/v1/products/' + this.props.match.params.id).then((data)=> data.json())
      .then((product)=>{
        if(product.product){
          this.product_info = Details[product.product.productable_type];
          this.setState({product})
        }else{
          this.setState({redirect: true})
        }
      })
      .catch((e)=> {console.log(e)})
  }

  setValidator(rules) {
    this.rules = Object.assign(rules, this.rules)
  }

  validate(){
    const errors = [],
          product_params = Object.assign(this.state.product_params, this.state.product_params.details);
    Object.keys(this.rules).map((k) => {
      if(!product_params.hasOwnProperty(k)){
        errors.push(k)
      }else if(Array.isArray(this.rules[k])){
        if(!this.rules[k].includes(product_params[k])) errors.push(k)
      }else{
        if(this.rules[k] === 'number'){
          if(this.rules[k] !== typeof +product_params[k] || +product_params[k] < 1){
            errors.push(k)
          }
        }
      }
    });
    return errors.map((v) => `${v.toUpperCase()} INVALID`);
  }

  handleProductParams(e){
    const key = e.target.name,
      value = e.target.value;
    this.setState((prev) => {
      return ({
        product_params: Object.assign(prev.product_params, {details: Object.assign(prev.product_params.details, {[key]: value})})
      })
    });
  }

  handleChange(e){
    const key = e.target.name,
      value = e.target.value;
    this.setState((prev) => {
      return ({
        product_params: Object.assign(prev.product_params, {[key]: value})
      })
    });
  }

  handleSubmit(e){
    e.preventDefault();
    const errors = this.validate();
    if(errors.length > 0){
      this.props.notificationShow({type: 'error', messages: errors})
    }else{
      const item = Object.assign(this.state.product_params, {id: this.state.product.product.id, price: this.state.product.item.price,
                    title: this.state.product.item.title}),
            cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
      cart.push(item);
      localStorage.setItem('cart', JSON.stringify(cart));
      this.props.notificationShow({type: 'success', messages: ['Item added to cart']})
    }
  }

  render(){
    return(
      <div>
        {
          Object.keys(this.state.product).length > 0 &&
            <div className="row">
              <div className="col-lg-2">
                <div><b>Title: </b>{this.state.product.item.title}</div>
                <div><b>Price: </b>{this.state.product.item.price}</div>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>Quantity</label>
                    <input onChange={this.handleChange} type="number" className="form-control" name="qty" />
                  </div>
                  <button type="submit" className="btn btn-success">Submit</button>
                </form>
              </div>
              <div className="col-lg-6">
                <this.product_info handleProductParams={this.handleProductParams} validator={this.setValidator} product = {this.state.product} />
              </div>
            </div>
        }

        {
          this.state.redirect &&
            <Redirect to="/products" />
        }
      </div>
    )
  }

}

export default Product
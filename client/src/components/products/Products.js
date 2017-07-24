import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Products extends Component{

  constructor(props){
    super(props);
    this.state = {
      products: [],
      filter: {}
    };
    this.sortByPrice = this.sortByPrice.bind(this);
    this.filterByPrice = this.filterByPrice.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearFilter = this.clearFilter.bind(this)
  }

  componentDidMount(){
    fetch('/api/v1/products').then((data)=> data.json())
      .then((products)=> {
        this.setState({products});
        this.products = products
      })
      .catch((e)=> {console.log(e)})
  }

  handleChange(e){
    const key = e.target.name,
      value = e.target.value;
    this.setState((prev, props) => {
      return ({
        filter: Object.assign(prev.filter, {[key]: value})
      })
    })
  }

  filterByPrice(e){
    e.preventDefault();
    const from = +this.state.filter.from || 0,
          to = +this.state.filter.to || 1000000;

    const products = this.products.filter((el) => {
      return +el.item.price >= from && +el.item.price <= to
    });

    this.setState({products})
  }

  sortByPrice(e){
    let products = [];
    if(e.target.dataset['flow'] === 'desc'){
      products = this.state.products.sort((a, b) => {
        if(+a.item.price > +b.item.price) return -1;
        if(+a.item.price < +b.item.price) return 1;
        return 0
      });
    }else{
      products = this.state.products.sort((a, b) => {
        if(+a.item.price < +b.item.price) return -1;
        if(+a.item.price > +b.item.price) return 1;
        return 0
      });
    }

    this.setState({products})
  }

  clearFilter(){
    this.setState({products: this.products})
  }

  render(){
    return(
      <div className="row">
        <div className="col-lg-12">
          <div className="col-lg-3">
            <span>Sort by price: <a onClick={this.sortByPrice} data-flow="asc">Asc</a> <a onClick={this.sortByPrice} data-flow="desc">Desc</a></span>
          </div>
          <div className="col-lg-6">
            <form className="form-inline" onSubmit={this.filterByPrice}>
              <div className="form-group">
                <label>From</label>
                <input onChange={this.handleChange} type="number" name="from" className="form-control" />
              </div>
              <div className="form-group">
                <label>To</label>
                <input onChange={this.handleChange} type="number" name="to" className="form-control" />
              </div>
              <button type="submit" className="btn btn-default">Filter</button>
            </form>
          </div>
          <div className="col-lg-1"><a onClick={this.clearFilter}>Clear filter</a></div>
        </div>
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
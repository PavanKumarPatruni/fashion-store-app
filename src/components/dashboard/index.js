import React, { Component } from 'react'

import products_list from '../../data/products.json';

import ProductList from './products/products';

import './dashboard.scss';

class Dashboard extends Component {

  constructor (context, props) {
    super(context, props);

    this.state = {
      loading : true,
      products : []
    };

  }
  
  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    this.setState({
      loading : false,
      products : products_list.products
    });
  }

  render() {

    var content = <div className="no-products">
    { this.state.loading ? 'LOADING' :  'NO PRODUCTS' }
    </div>

    if (this.state.products.length > 0) {
      content = <div className="products">
        <div className="product-list">
          <ProductList products={this.state.products} />
        </div>
      </div>
    }

    return (
        <React.Fragment>
          <div className="dashboard">
          { content }
          </div>
        </React.Fragment>
    );
  }
}

export default Dashboard;
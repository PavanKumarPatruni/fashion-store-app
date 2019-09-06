import React, { Component } from 'react';
import { connect } from 'react-redux';

import CartList from './cart_items/cart_list';
import Billing from './billing';

import store from '../../redux/store';

import './cart.scss';

class Cart extends Component {

  constructor(context, props) {
    super(context, props);

    this.state = {
        loading: true,
        cart: []
    };
  }

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem('fashion-store-data'));
    if (data) {
      this.setState({
        cart: data.cart
      });
    }

    store.subscribe(() => {
      this.setState({
          cart: this.props.cart,
          loading: false
      });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    let { cart } = this.state;

    let content = null;
    if (cart && cart.length > 0) {

      content = ( <div className="cart">
        <div className="cart-data">
          <div className="cart-list">
            <CartList cart={cart} />
          </div>
          <div className="bill-data">
            <Billing cart={cart} />
          </div>
        </div>
      </div> );
    } else {
      content = ( <div className="no-products">
          EMPTY CART
      </div> );
    }

    return (
        <React.Fragment>
            <div className="dashboard cart">
              <span className="section-title">Cart - {cart && cart.length > 0 ? cart.length : 0}</span>
              { content }
            </div>
        </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { cart: state.cart};
}

const mapDispatchToProps = (dispatch) => {
  return {  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
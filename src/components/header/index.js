import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import store from '../../redux/store';

import './header.scss';

class Header extends Component {

  constructor(context, props) {
    super(context, props);

    this.state = {
        cart: [],
        wishlist: []
    };
  }

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem('fashion-store-data'));
    if (data) {
      this.setState({
        cart: data.cart,
        wishlist: data.wishlist
      });
    }

    store.subscribe(() => {
      this.setState({
          cart: this.props.cart,
          wishlist: this.props.wishlist
      });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    let { cart, wishlist } = this.state;

    let cartComponent = null;
    if (cart && cart.length > 0) {
      cartComponent = (<span className="badge">{cart.length}</span>);
    }

    let wishlistComponent = null;
    if (wishlist && wishlist.length > 0) {
      wishlistComponent = (<span className="badge">{wishlist.length}</span>);
    }

    return (
        <header>
          <div className="header-wrapper">
            <h3><Link to={'/store'} >Fashion Store</Link></h3>
            <div className="header-options">
              <ul>
                <li>
                  <Link to={'/wishlist'} >Wishlist</Link>
                  { wishlistComponent }
                </li>
                <li>
                  <Link to={'/cart'} >Cart</Link>
                  { cartComponent }
                </li>
              </ul>
            </div>
          </div>
        </header>
    );
  
  }
}

const mapStateToProps = (state) => {
  return { cart: state.cart, wishlist: state.wishlist };
}

const mapDispatchToProps = (dispatch) => {
  return {
      
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
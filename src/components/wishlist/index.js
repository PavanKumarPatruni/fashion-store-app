import React, { Component } from 'react';
import { connect } from 'react-redux';

import WishlistList from './wishlist_items/wishlist_list';

import store from '../../redux/store';

import './wishlist.scss';

class Wishlist extends Component {

  constructor(context, props) {
    super(context, props);

    this.state = {
        loading: true,
        wishlist: []
    };
  }

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem('fashion-store-data'));
    if (data) {
      this.setState({
        wishlist: data.wishlist
      });
    }

    store.subscribe(() => {
      this.setState({
          wishlist: this.props.wishlist,
          loading: false
      });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    let { wishlist } = this.state;

    var content = null;

    if (wishlist && wishlist.length > 0) {
      content = ( <div className="wishlist">
        <div className="wishlist-items">
          <WishlistList wishlist={wishlist}/>
        </div>
      </div> );
    } else {
      content = (<div className="no-products">
          EMPTY WISHLIST
      </div>);
    }

    return (
        <React.Fragment>
            <div className="dashboard cart">
              <span className="section-title">Wishlist - {wishlist && wishlist.length > 0 ? wishlist.length : 0}</span>
              { content }
            </div>
        </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { wishlist: state.wishlist };
}

const mapDispatchToProps = (dispatch) => {
  return {  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
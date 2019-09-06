import React, { Component } from 'react';
import { connect } from 'react-redux';

import { removeFromWishlist, addToCart } from '../../../redux/actions';

import '../wishlist.scss';

class WishlistItem extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            product: props.product
        };
    }

    removeFromWishlist() {
        this.props.removeProductFromWishlist(this.state.product.id);
    }

    addToCart() {
        this.props.addProductToCart(this.state.product);
    }

    render() {
        let {product} = this.state;

        let productSizesListComponent = [];
        let productSizesComponent = null;
        let freeShippingComponent = null;

        if (product) {
            if (product.availableSizes && product.availableSizes.length > 0) {
                product.availableSizes.map((size, idx) => {
                    return productSizesListComponent.push(<span className="size" key={idx}>{size}</span>);
                });

                productSizesComponent = <div className="available-sizes">
                    <span className="sizes-title">Available sizes</span>
                    <div className="sizes-list">
                        {productSizesListComponent}
                    </div>
                </div>
            }

            freeShippingComponent = <span className="free-shipping"><sup>*</sup>{product.isFreeShipping ? 'free shipping available' : 'shipping charges apply' }</span>;
        }

        return (
            <React.Fragment>
                <div className="cart-item wishlist-item">
                    <img className="pic" alt={product.pic} src={product.pic}/>
                    <div className="details">
                        <span className="title">{product.title}</span>
                        <span className="desc">{product.style}</span>
                        <span className="price">{product.currencyFormat}{product.price}</span>
                        { productSizesComponent }
                        <div className="cart-details">
                            <button className="transparent-button" onClick={() => this.removeFromWishlist()}>REMOVE FROM WISHLIST</button>
                            <button className="cart-button" onClick={() => this.addToCart()}>ADD TO CART</button>
                        </div>
                        { freeShippingComponent }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
 
const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeProductFromWishlist(productId) {
            dispatch(removeFromWishlist(productId))
        },
        addProductToCart(productId) {
            dispatch(addToCart(productId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishlistItem);
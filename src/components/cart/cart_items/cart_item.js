import React, { Component } from 'react';
import { connect } from 'react-redux';

import { quanityChange, removeFromCart, addToWishlist } from '../../../redux/actions';

import './cart_item.scss';

class CartItem extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            product: props.product,
            count: props.product.count
        };

        this.onQuantityChange = this.onQuantityChange.bind(this);
    }

    onQuantityChange(e) {
        let count = e.target.value;
        if (!count && count < 1) { 
            count = 1;
        }

        let {product} = this.state;
        product.count = count;

        this.setState({
            product: product,
            count: count
        });

        this.props.productQuantityChange(this.state.product);
    }

    addToWishlist() {
        this.props.addProductToWishlist(this.state.product);
    }

    removeToCart() {
        this.props.removeProductToCart(this.state.product.id);
    }

    render() {
        let {product, count} = this.state;

        if (!count && count < 1) { 
            count = 1;
        }

        let productSizesListComponent = [];
        product.availableSizes.map((size, idx) => {
            return productSizesListComponent.push(<span className="size" key={idx}>{size}</span>);
        });

        let productSizesComponent = null;
        if (product.availableSizes.length > 0) {
            productSizesComponent = <div className="available-sizes">
                <span className="sizes-title">Available sizes</span>
                <div className="sizes-list">
                    {productSizesListComponent}
                </div>
            </div>
        }

        let quantityCountComponent = <span className="quantity-count">Quantity: <input type="number" value={count} min="1" onChange={this.onQuantityChange} /></span>;

        let freeShippingComponent = <span className="free-shipping"><sup>*</sup>{product.isFreeShipping ? 'free shipping available' : 'shipping charges apply' }</span>;

        return (
            <React.Fragment>
                <div className="cart-item">
                    <img className="pic" alt={product.pic} src={product.pic}/>
                    <div className="details">
                        <span className="title">{product.title}</span>
                        <span className="desc">{product.style}</span>
                        <span className="price">{product.currencyFormat}{product.price}</span>
                        { productSizesComponent }
                        { quantityCountComponent }
                        <div className="cart-details">
                            <button className="transparent-button" onClick={() => this.addToWishlist()}>ADD TO WISHLIST</button>
                            <button className="cart-button" onClick={() => this.removeToCart()}>REMOVE TO CART</button>
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
        productQuantityChange(product) {
            dispatch(quanityChange(product))
        },
        removeProductToCart(productId) {
            dispatch(removeFromCart(productId))
        },
        addProductToWishlist(productId) {
            dispatch(addToWishlist(productId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
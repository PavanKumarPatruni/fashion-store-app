import React, { Component } from 'react';
import { connect } from 'react-redux';

import { removeFromWishlist, addToCart } from '../../../redux/actions';

import '../wishlist.scss';

import history from '../../../components/history';

class WishlistItem extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            product: props.product,
            showSizeAlert: false
        };
    }

    removeFromWishlist(e) {
        e.stopPropagation();
        this.props.removeProductFromWishlist(this.state.product.id);
    }

    addToCart(e) {
        e.stopPropagation();
        this.props.addProductToCart(this.state.product);
    }

    onItemClick() {
        history.push('/item/'+this.state.product.id);
    }

    onSizeClick(e) {
        if (e.target.nodeName === 'SPAN') {
            let { product } = this.state;
            let val = e.target.innerHTML;
            if (val === product.selectedSize) {
                product.selectedSize = "";
            } else {
                product.selectedSize = val;
            }

            this.setState({
                product
            });
        }
        e.stopPropagation();
    }

    render() {
        let {product, showSizeAlert} = this.state;

        let productSizesListComponent = [];
        let productSizesComponent = null;
        let freeShippingComponent = null;

        if (product) {
            if (product.availableSizes && product.availableSizes.length > 0) {
                product.availableSizes.map((size, idx) => {
                    return productSizesListComponent.push(<span className={"size " + (product.selectedSize === size ? 'selected' : '')} key={idx}>{size}</span>);
                });

                productSizesComponent = <div className="available-sizes">
                    <span className="sizes-title">Available sizes</span>
                    <div className="sizes-list" onClick={(e) => this.onSizeClick(e)}>
                        {productSizesListComponent}
                    </div>
                </div>
            }

            freeShippingComponent = <span className="free-shipping"><sup>*</sup>{product.isFreeShipping ? 'free shipping available' : 'shipping charges apply' }</span>;
        }

        return (
            <React.Fragment>
                <div className="cart-item wishlist-item" onClick={() => this.onItemClick()}>
                    <img className="pic" alt={product.pic} src={product.pic}/>
                    <div className="details">
                        <span className="title">{product.title}</span>
                        <span className="desc">{product.style}</span>
                        <span className="price">{product.currencyFormat}{product.price}</span>
                        { productSizesComponent }
                        <div className="cart-details">
                            <button className="transparent-button" onClick={(e) => this.removeFromWishlist(e)}>REMOVE FROM WISHLIST</button>
                            <button className="cart-button" onClick={(e) => this.addToCart(e)}>ADD TO CART</button>
                        </div>
                        { freeShippingComponent }
                    </div>
                    <div className={"alert-size " + (showSizeAlert ? 'show' : '')}>
                        Please select size to add to cart
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
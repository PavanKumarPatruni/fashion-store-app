import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addToCart, addToWishlist } from '../../../redux/actions';

import './product.scss';

class Product extends Component {

    constructor(props) {
        super(props);

        this.state = {
            product: props.product
        };
    }

    addToWishlist() {
        this.props.addProductToWishlist(this.state.product);
    }

    addToCart() {
        let {product} = this.state;

        if (!product.count) {
            product.count = 0;
        }

        this.setState({
            product
        });

        this.props.addProductToCart(this.state.product);
    }

    render() {
        let {product} = this.state;

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

        let freeShippingComponent = <span className="free-shipping"><sup>*</sup>{product.isFreeShipping ? 'free shipping available' : 'shipping charges apply' }</span>;

        return (
            <React.Fragment>
                <div className="product">
                    <img className="pic" alt={product.pic} src={product.pic}/>
                    <div className="details">
                        <span className="title">{product.title}</span>
                        <span className="desc">{product.style}</span>
                        <span className="price">{product.currencyFormat}{product.price}</span>
                        { productSizesComponent }
                        <div className="cart-details">
                            <button className="transparent-button" onClick={() => this.addToWishlist()}>WISHLIST</button>
                            <button className="cart-button" onClick={() => this.addToCart()}>ADD TO CART</button>
                        </div>
                        { freeShippingComponent }
                    </div>
                </div>
            </React.Fragment>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addProductToCart(product) {
            dispatch(addToCart(product))
        },
        addProductToWishlist(product) {
            dispatch(addToWishlist(product))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
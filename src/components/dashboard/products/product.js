import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addToCart, addToWishlist } from '../../../redux/actions';

import './product.scss';

let timeout = null;

class Product extends Component {

    constructor(props) {
        super(props);

        this.state = {
            product: props.product,
            showSizeAlert: false
        };
    }

    addToWishlist(e) {
        e.stopPropagation();

        let {showSizeAlert} = this.state;
        if (!showSizeAlert) {
            this.props.addProductToWishlist(this.state.product);
        }
    }

    addToCart(e) {
        e.stopPropagation();

        let {product, showSizeAlert} = this.state;
        if (!showSizeAlert) {
            if (!product.selectedSize) {
                showSizeAlert = true;

                this.setState({
                    showSizeAlert
                });
                timeout = setTimeout(function() {
                    showSizeAlert = !showSizeAlert;
                    this.setState({
                        showSizeAlert
                    });
                    clearTimeout(timeout);
                }.bind(this), 1500);
                return;
            }

            if (!product.count) {
                product.count = 0;
            }

            this.setState({
                product
            });

            this.props.addProductToCart(this.state.product);
        }
    }

    onItemClick() {
        this.props.history.push('/item/'+this.state.product.id);
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
        product.availableSizes.map((size, idx) => {
            return productSizesListComponent.push(<span className={"size " + (product.selectedSize === size ? 'selected' : '')} key={idx}>{size}</span>);
        });

        let productSizesComponent = null;
        if (product.availableSizes.length > 0) {
            productSizesComponent = <div className="available-sizes">
                <span className="sizes-title">Available sizes</span>
                <div className="sizes-list" onClick={(e) => this.onSizeClick(e)}>
                    {productSizesListComponent}
                </div>
            </div>
        }

        let freeShippingComponent = <span className="free-shipping"><sup>*</sup>{product.isFreeShipping ? 'free shipping available' : 'shipping charges apply' }</span>;

        return (
            <React.Fragment>
                <div className="product" onClick={() => this.onItemClick()}>
                    <img className="pic" alt={product.pic} src={product.pic}/>
                    <div className="details">
                        <span className="title">{product.title}</span>
                        <span className="desc">{product.style}</span>
                        <span className="price">{product.currencyFormat}{product.price}</span>
                        { productSizesComponent }
                        <div className="cart-details">
                            <button className="transparent-button" onClick={(e) => this.addToWishlist(e)}>WISHLIST</button>
                            <button className="cart-button" onClick={(e) => this.addToCart(e)}>ADD TO CART</button>
                        </div>
                        { freeShippingComponent }
                    </div>
                    <div className={"alert-size " + (showSizeAlert ? 'show' : '')}>
                        Please select size to add to cart
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product));
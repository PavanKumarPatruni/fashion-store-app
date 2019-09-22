import React from 'react';

import Price from './price.js';

const Billing = ({ cart }) => {

    let deliveryPerItem = 1;

    let productsBills = 0;
    let currencyFormat = '';
    let gst = 0;
    let deliveryCharges = 0;
    let noFreeShipping = 0;

    let totalBill = 0;

    let billingItems = [];
    if (cart && cart.length > 0) {
      billingItems.push(
        cart.map(p => {
          let count = p.count ? p.count : 1;
          let price = p.count * p.price;

          productsBills += price;
          currencyFormat = p.currencyFormat;

          if (!p.isFreeShipping) {
            noFreeShipping++;
          }

          return (
            <div className="billing-ind-item" key={p.id}>
              <span className="name">{ p.title } ({p.selectedSize}) (x{count})</span>
              <Price format={p.currencyFormat} amount={price} />
            </div>
          )
        })
      );
    };

    if (productsBills > 0) {
      gst = productsBills * (9/100);
      gst = gst.toFixed(2);
    }

    if (noFreeShipping > 0) {
      deliveryCharges = deliveryPerItem * noFreeShipping;
      deliveryCharges = deliveryCharges.toFixed(2);
    }

    totalBill = parseFloat(productsBills) + parseFloat(gst) + parseFloat(deliveryCharges);
    totalBill = totalBill.toFixed(2);

    let content = null;
    if (cart && cart.length > 0) {
      content = ( <div className="billing-data">
        <span className="title">Bill</span>
        { billingItems }
        <div className="billing-ind-item total-item">
          <span>Item Total</span>
          <Price format={currencyFormat} amount={productsBills} />
        </div>
        <div className="billing-ind-item">
          <span>GST</span>
          <Price format={currencyFormat} amount={gst} />
        </div>
        <div className="billing-ind-item">
          <span>Delivery Charges {noFreeShipping > 0 ? '(x' + {noFreeShipping} + ')' : '' }</span>
          <Price format={currencyFormat} amount={deliveryCharges} />
        </div>
        <div className="billing-ind-item total-item">
          <span>To Pay</span>
          <Price format={currencyFormat} amount={totalBill} />
        </div>

        <button className="order-button">ORDER</button>

      </div> );
    } else {
      content = (<div className="no-products">
          EMPTY CART
      </div>);
    }

    return (
        <React.Fragment>
          { content }
        </React.Fragment>
    );

}

export default Billing;
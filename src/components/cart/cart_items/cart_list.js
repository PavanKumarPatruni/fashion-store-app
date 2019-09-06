import React from 'react';

import CartItem from './cart_item';

const CartList = ({ cart }) => {
  
  return cart.map(p => {
    return ( <CartItem product={p} key={p.id} />);
  });
  
};

export default CartList;

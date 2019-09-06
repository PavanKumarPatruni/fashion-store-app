import React from 'react';

import WishlistItem from './wishlist_item';

const WishlistList = ({ wishlist }) => {
  
  return wishlist.map(p => {
    return ( <WishlistItem product={p} key={p.id} />);
  });
  
};

export default WishlistList;

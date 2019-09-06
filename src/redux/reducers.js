import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    ADD_TO_WISHLIST,
    REMOVE_FROM_WISHLIST,
    QUANITY_CHANGE
} from './actions';

let initState = {
    cart: [],
    cartIds: [],
    wishlist: [],
    wishlistIds: []
};

const data = JSON.parse(localStorage.getItem('fashion-store-data'));
if (data) {
    initState = { cart: data.cart, cartIds: data.cartIds, wishlist: data.wishlist, wishlistIds: data.wishlistIds };
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_TO_CART : {
            let {product} = action;
            let {cart, cartIds} = state;

            let index = cartIds.indexOf(product.id);

            console.log(index);

            if (index < 0) {
                product.count = 1;
                cart.push(product);
                cartIds.push(product.id);
            } else {
                product.count += 1;
                cart[index] = product;
            }

            state = Object.assign({}, state, { cart, cartIds });

            console.log(state);

            localStorage.setItem('fashion-store-data', JSON.stringify(state));

            return state;
        }
        case ADD_TO_WISHLIST : {
            let {product} = action;
            let {wishlist, wishlistIds} = state;

            let index = wishlistIds.indexOf(product.id);
            if (index < 0) {
                wishlist.push(product);
                wishlistIds.push(product.id);
            }

            state = Object.assign({}, state, { wishlist, wishlistIds });

            localStorage.setItem('fashion-store-data', JSON.stringify(state));

            return state;
        }
        case REMOVE_FROM_CART: {
            let {id} = action;
            let {cart, cartIds} = state;

            let index = cartIds.indexOf(id);

            if (index > -1) {
                cartIds.splice(index, 1);
                cart.splice(index, 1);
            }

            state = Object.assign({}, state, { cart, cartIds });

            localStorage.setItem('fashion-store-data', JSON.stringify(state));

            return state;
        }
        case REMOVE_FROM_WISHLIST: {
            let {id} = action;
            let {wishlist, wishlistIds} = state;

            let index = wishlistIds.indexOf(id);
            if (index > -1) {
                wishlistIds.splice(index, 1);
                wishlist.splice(index, 1);
            }

            state = Object.assign({}, state, { wishlist, wishlistIds });

            localStorage.setItem('fashion-store-data', JSON.stringify(state));

            return state;
        }
        case QUANITY_CHANGE: {
            let {product} = action;
            let {cart, cartIds} = state;

            let index = cartIds.indexOf(product.id);
            if (index > -1) {
                cart[index] = product;
            }

            state = Object.assign({}, state, { cart, cartIds });

            localStorage.setItem('fashion-store-data', JSON.stringify(state));

            return state;
        }
        default:
            return state;
    }
};

export default reducer;
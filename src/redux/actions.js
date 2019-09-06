const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
const REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST";
const QUANITY_CHANGE = "QUANITY_CHANGE";

function addToCart (product) {
    return {
        type: ADD_TO_CART,
        product
    };
}

function addToWishlist (product) {
    return {
        type: ADD_TO_WISHLIST,
        product
    };
}

function removeFromCart (productId) {
    return {
        type: REMOVE_FROM_CART,
        id: productId
    }
}

function removeFromWishlist (productId) {
    return {
        type: REMOVE_FROM_WISHLIST,
        id: productId
    }
}

function quanityChange (product) {
    return {
        type: QUANITY_CHANGE,
        product
    }
}

export {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    ADD_TO_WISHLIST,
    REMOVE_FROM_WISHLIST,
    QUANITY_CHANGE,

    addToCart,
    addToWishlist,
    removeFromCart,
    removeFromWishlist,
    quanityChange
};
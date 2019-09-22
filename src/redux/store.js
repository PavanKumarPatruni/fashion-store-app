import { createStore } from 'redux';

import { loadState, saveState } from './../components/storage';
import setupReducer  from './reducers';

const persistedState = loadState();

const store = createStore(
    setupReducer,
    persistedState);

store.subscribe(() => {
    saveState({
        cart: store.getState().cart,
        cartIds: store.getState().cartIds,
        wishlist: store.getState().wishlist,
        wishlistIds: store.getState().wishlistIds
    });
});

export default store;


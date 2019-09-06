import { createStore } from 'redux';

import setupReducer  from './reducers';

const store = createStore(setupReducer);

export default store;
import { configureStore } from '@reduxjs/toolkit';
import bookReducer from '../Reducers/Bookreducer';

const rootReducer = {
    books: bookReducer,

};

const store = configureStore({
    reducer: rootReducer,

});

export default store;
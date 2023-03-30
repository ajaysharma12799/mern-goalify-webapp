import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';

const Store = configureStore({
    reducer: {
        auth: authReducer,
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export default Store;

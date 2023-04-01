import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import goalReducer from '../features/goals/goalSlice';

const Store = configureStore({
    reducer: {
        auth: authReducer,
        goal: goalReducer,
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export default Store;

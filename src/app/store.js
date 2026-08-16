import { configureStore } from '@reduxjs/toolkit';
import composerReducer from '../features/composer/composerSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
    reducer: {
        composer: composerReducer,
        auth: authReducer,
    },
});

export default store;
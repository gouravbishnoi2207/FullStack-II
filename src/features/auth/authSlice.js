import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    error: '',
};

const getStoredAuth = () => {
    if (typeof window === 'undefined') {
        return initialState;
    }

    const token = window.localStorage.getItem('jwt_token');
    if (!token) {
        return initialState;
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(token.split('.')[1].length / 4) * 4, '=')));
        return {
            isAuthenticated: true,
            user: payload,
            token,
            error: '',
        };
    } catch {
        return initialState;
    }
};

const savedAuth = getStoredAuth();

const authSlice = createSlice({
    name: 'auth',
    initialState: savedAuth,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = '';
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('jwt_token', action.payload.token);
            }
        },
        loginFailure: (state, action) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.error = '';
            if (typeof window !== 'undefined') {
                window.localStorage.removeItem('jwt_token');
            }
        },
    },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
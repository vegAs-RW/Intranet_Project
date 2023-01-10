import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../features/userSlice';

const store = configureStore({
    reducer: {
        // Slices features
        user: userReducer
    }
});

export default store;
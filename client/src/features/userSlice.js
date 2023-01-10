import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',

    initialState: {
        token: null,
        user: null
    },

    reducers: {
        setUserToken(state, action) {
            state.token = action.payload;
        },

        setUser(state, action) {
            state.user = action.payload;
        },

        resetUser(state) {
            state = {
                token: null,
                user: null
            }
        }
    }
});

export const { setUserToken, setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;

/*

{
    token: null,
    user: null
}

{
    token: "coucou",
    user: null
}

{
    token: "coucou",
    user: { id: ... }
} */
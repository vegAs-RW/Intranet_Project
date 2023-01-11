import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',

    initialState: {
        token: null,
        user: null, 
        randomUser: null
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
        },
        setRandomUser(state, action) {
            state.randomUser = action.payload;
        }
    }
});

export const { setUserToken, setUser, resetUser, setRandomUser } = userSlice.actions;

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
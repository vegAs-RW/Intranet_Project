import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    token: null,
    user: null,
    randomUser: null,
    allUser: null,
    userToModify: null,
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
        user: null,
      };
    },
    setRandomUser(state, action) {
      state.randomUser = action.payload;
    },
    setAllUser(state, action) {
      state.allUser = action.payload;
    },
    setAllUser(state, action) {
      state.allUser = action.payload;
    },
    setUserToModifyId(state, action) {
      state.userToModify = action.payload;
    },
  },
});

export const {
  setUserToken,
  setUser,
  resetUser,
  setRandomUser,
  setAllUser,
  setUserToModifyId,
} = userSlice.actions;

export default userSlice.reducer;

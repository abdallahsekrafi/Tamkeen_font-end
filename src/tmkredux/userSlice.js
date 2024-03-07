import { createSlice } from "@reduxjs/toolkit";

// insialState for the user
const initialState = {
  user: null,
  token: null,
};
// User reducer to manage the curent user and get the authorization and authentication
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    updateUser(state, action) {
      state.user = action.payload.user;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});
// export the differents methode
export const { login, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;

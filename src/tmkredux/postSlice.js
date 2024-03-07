import { createSlice } from "@reduxjs/toolkit";

// inisialState for the posts
const initialState = {
  posts: [],
};
// Post reducer for the user and his frends post
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    clearPosts(state, action) {
      state.posts = [];
    },
  },
});

export const { setPosts, clearPosts } = postSlice.actions;

export default postSlice.reducer;

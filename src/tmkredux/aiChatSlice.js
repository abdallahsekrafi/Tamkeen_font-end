import { createSlice } from "@reduxjs/toolkit";

// inisialState for the aiChats
const initialState = {
  aiChats: [],
};
// aiChats reducer for the user
const aiChatSlice = createSlice({
  name: "aiChat",
  initialState,
  reducers: {
    setAiChats(state, action) {
      state.aiChats = action.payload;
    },
  },
});

export const { setAiChats } = aiChatSlice.actions;

export default aiChatSlice.reducer;

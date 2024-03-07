import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import postSlice from "./postSlice";
import modeSlice from "./modeSlice";
import aiChatSlice from "./aiChatSlice";

// combine the user,mode and post reducer
const rootReducer = combineReducers({
  user: userSlice,
  mode: modeSlice,
  posts: postSlice,
  aiChats: aiChatSlice,
});

export { rootReducer };

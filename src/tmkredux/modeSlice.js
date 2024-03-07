import { createSlice } from "@reduxjs/toolkit";

// inisialState for mode
const initialState = {
  mode: "light",
};
// Mode reducer to swith mode light => dark
const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = modeSlice.actions;
export default modeSlice.reducer;

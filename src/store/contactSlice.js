// store/contactSlice.js
import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contacts",
  initialState: [],
  reducers: {
    addContact: (state, action) => {
      state.push(action.payload);
    },
    removeContact: (state, action) => {
      state.splice(action.payload, 1); // Remove by index
    },
  },
});

export const { addContact, removeContact } = contactSlice.actions;
export default contactSlice.reducer;

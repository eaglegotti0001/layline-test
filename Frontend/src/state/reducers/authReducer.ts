import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialState = {
  isAuthed: boolean;
};

const initialState: InitialState = {
  isAuthed: false,
};

export const isAuthenticated = createSlice({
  name: 'isAuthenticated',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      return { ...state, isAuthed: action.payload };
    },
  },
});

export const { setAuthenticated } = isAuthenticated.actions;
export default isAuthenticated.reducer;

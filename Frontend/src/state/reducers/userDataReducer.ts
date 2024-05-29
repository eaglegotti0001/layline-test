import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type UserData = {
  email: string;
  name: string;
};

type InitialState = {
  userData?: UserData | null;
};

const initialState: InitialState = {
  userData: null,
};

export const userData = createSlice({
  name: 'setUserData',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      return { ...state, userData: action.payload };
    },
  },
});

export const { setUserData } = userData.actions;
export default userData.reducer;

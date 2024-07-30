import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: User | null;
  isAuth: boolean;
}
interface User {
  id: string;
  Username: string;
  Passcode: string;
}

const initialState: UserState = {
  user: {
    id: "",
    Username: "",
    Passcode: "",
  },
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.user = {
        id: "",
        Username: "",
        Passcode: "",
      };
      state.isAuth = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;

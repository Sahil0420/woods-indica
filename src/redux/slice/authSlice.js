import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from '../../firebase/config'; // Adjust the import path as needed
import { onAuthStateChanged, getIdTokenResult } from 'firebase/auth';

const initialState = {
  isUserLoggedIn: false,
  email: null,
  userName: null,
  userId: null,
  isAdmin: false,
  loading: true,
};

export const initializeAuth = createAsyncThunk(
  'auth/initializeAuth',
  async (_, { dispatch }) => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const tokenResult = await getIdTokenResult(user, true);
          dispatch(setActiveUser({
            email: user.email,
            userName: user.displayName,
            userId: user.uid,
            isAdmin: !!tokenResult.claims.admin
          }));
        } else {
          dispatch(removeActiveUser());
        }
        resolve();
      });
    });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      const { email, userName, userId, isAdmin } = action.payload;
      state.isUserLoggedIn = true;
      state.email = email;
      state.userName = userName;
      state.userId = userId;
      state.isAdmin = isAdmin;
      state.loading = false;
    },
    removeActiveUser: (state) => {
      state.isUserLoggedIn = false;
      state.email = null;
      state.userName = null;
      state.userId = null;
      state.isAdmin = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeAuth.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const selectAuthSlice = (store) => store.auth;
export const { setActiveUser, removeActiveUser } = authSlice.actions;
export default authSlice.reducer;
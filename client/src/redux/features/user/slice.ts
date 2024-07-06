import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "@/types/user";

type TInitialState = {
    currUser: null | TUser;
    isAuth: boolean;
    allUsers: TUser[];
    loading: boolean;
};

const initialState: TInitialState = {
    currUser: null,
    isAuth: false,
    allUsers: [],
    loading: false,
};

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setCurrUser: (state, action: PayloadAction<null | TUser>) => {
            state.currUser = action.payload;
        },
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        setAllUsers: (state, action: PayloadAction<TUser[]>) => {
            state.allUsers = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    },
});

export const { setAllUsers, setCurrUser, setLoading, setIsAuth } =
    uiSlice.actions;

export default uiSlice.reducer;
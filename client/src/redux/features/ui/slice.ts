import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
    isCommentPopup: boolean;
};

const initialState: TInitialState = {
    isCommentPopup: false,
};

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setCommentPopup: (state, action: PayloadAction<boolean>) => {
            state.isCommentPopup = action.payload;
        },
    },
});

export const { setCommentPopup } =
    uiSlice.actions;

export default uiSlice.reducer;
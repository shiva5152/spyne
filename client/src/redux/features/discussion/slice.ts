import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TDiscussion } from "@/types/discussion";

type TInitialState = {
    currDiscussion: null | TDiscussion;
    discussions: TDiscussion[];
    loading: boolean;
};

const initialState: TInitialState = {
    currDiscussion: null,
    discussions: [],
    loading: false,
};

export const uiSlice = createSlice({
    name: "discussion",
    initialState,
    reducers: {
        setCurrDiscussion: (state, action: PayloadAction<null | TDiscussion>) => {
            state.currDiscussion = action.payload;
        },
        setDiscussions: (state, action: PayloadAction<TDiscussion[]>) => {
            state.discussions = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        toggleLike: (state, action: PayloadAction<TDiscussion>) => {
            state.discussions = state.discussions.map((discussion) => {
                if (discussion._id === action.payload._id) {
                    return action.payload;
                }
                return discussion;
            });
        }
    }
});

export const { setCurrDiscussion, setDiscussions, setLoading, toggleLike } =
    uiSlice.actions;

export default uiSlice.reducer;
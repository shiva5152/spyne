import { configureStore } from '@reduxjs/toolkit';
import userSlice from '@/redux/features/user/slice';
import uiSlice from './features/ui/slice';
import discussionSlice from './features/discussion/slice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        ui: uiSlice,
        discussion: discussionSlice,
    },

})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
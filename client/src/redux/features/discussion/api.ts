import type { AppDispatch } from "@/redux/store";
import instance from "@/utils/axios";
import { setDiscussions, setLoading, toggleLike } from "./slice";
import type { AxiosError } from "axios";

type ErrorRes = {
    isSuccess: boolean;
    message: string;
}

export const getDiscussions = async (dispatch: AppDispatch) => {
    dispatch(setLoading(true))
    try {
        const { data } = await instance.get('/discussion');

        dispatch(setDiscussions(data.discussions));
        dispatch(setLoading(false))
    } catch (e) {
        console.error(e);
        dispatch(setLoading(false))
    }
}

export const toggleLikeApi = async (dispatch: AppDispatch, discussionId: string) => {
    dispatch(setLoading(true))
    try {
        const { data } = await instance.patch(`/discussion/like/${discussionId}`);

        dispatch(toggleLike(data.discussion));
        dispatch(setLoading(false))
    } catch (e) {
        console.error(e);
        dispatch(setLoading(false))
    }
}

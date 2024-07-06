import type { AppDispatch } from "@/redux/store";
import instance from "@/utils/axios";
import { setCurrUser, setLoading } from "./slice";
import type { AxiosError } from "axios";

type ErrorRes = {
    isSuccess: boolean;
    message: string;
}

export const getUser = async (dispatch: AppDispatch) => {
    dispatch(setLoading(true))
    try {
        const { data } = await instance.get('/user/me');
        const user = data.user;
        dispatch(setCurrUser(user));
        dispatch(setLoading(false))
    } catch (e) {
        console.error(e);
        dispatch(setLoading(false))
    }
}
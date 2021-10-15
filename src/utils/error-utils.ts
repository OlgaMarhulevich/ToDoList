import {setAppErrorAC, setAppStatusAC} from "../store/appReducer";
import {Dispatch} from "react";
import {ResponseType} from "../API/todolist-api";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppStatusAC({status: "failed"}))
    dispatch(setAppErrorAC({error: data.messages[0] || 'Some error occurred. Please, try again.'}))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppStatusAC({status: "failed"}))
    dispatch(setAppErrorAC({error: error.message || 'Some error occurred. Please, try again.'}))
}

type ErrorUtilsDispatchType = Dispatch<any>
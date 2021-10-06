import {setAppErrorAC, SetAppErrorAT, setAppStatusAC, SetAppStatusAT} from "../store/appReducer";
import {Dispatch} from "react";
import {ResponseType} from "../API/todolist-api";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppStatusAC("failed"))
    dispatch(setAppErrorAC(data.messages[0] || 'Some error occurred. Please, try again.'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppStatusAC("failed"))
    dispatch(setAppErrorAC(error.message || 'Some error occurred. Please, try again.'))
}

type ErrorUtilsDispatchType = Dispatch<SetAppErrorAT | SetAppStatusAT>
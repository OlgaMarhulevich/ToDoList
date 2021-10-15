import React, {Dispatch} from "react";
import {AppDispatch} from "./store";
import {authAPI, LoginParamsType} from "../API/auth-api";
import {tasksAPI, TaskType} from "../API/tasks-api";
import {ResponseStatusCode} from "../API/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {addTaskAC} from "./tasksReducer";
import {clearTodosDataAC} from "./todoListsReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppInitializingAC, setAppStatusAC} from "./appReducer";

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

//thunk
export const loginTC = (data: LoginParamsType) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === ResponseStatusCode.success) {
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError<{ id: number, email: string, login: string }>(res.data, dispatch)
            }
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}
export const logoutTC = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === ResponseStatusCode.success) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
                dispatch(clearTodosDataAC())
            } else {
                handleServerAppError<{}>(res.data, dispatch)
            }
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}
export const initializeAppTC = () => (dispatch: Dispatch<any>) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}));
            } else {
                dispatch(setIsLoggedInAC({value: false}));
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(() =>
            dispatch(setAppInitializingAC({value: true})))
}


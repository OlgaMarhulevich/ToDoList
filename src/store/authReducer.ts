import {AppThunkCreatorsType} from "./store";
import {authAPI, LoginParamsType} from "../API/auth-api";
import {SetAppErrorAT, setAppInitializingAC, SetAppInitializingAT, setAppStatusAC, SetAppStatusAT} from "./appReducer";
import {tasksAPI, TaskType} from "../API/tasks-api";
import {ResponseStatusCode} from "../API/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {addTaskAC} from "./tasksReducer";
import {clearTodosDataAC} from "./todoListsReducer";

const initialState = {
    isLoggedIn: false
}

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

export type AuthActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusAT | SetAppErrorAT | SetAppInitializingAT

export const setIsLoggedInAC = (value: boolean) => ({type: 'LOGIN/SET-IS-LOGGED-IN', value} as const)

export const loginTC = (data: LoginParamsType): AppThunkCreatorsType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === ResponseStatusCode.success) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError<{ id: number, email: string, login: string }>(res.data, dispatch)
            }
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}
export const logoutTC = (): AppThunkCreatorsType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === ResponseStatusCode.success) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(clearTodosDataAC())
            } else {
                handleServerAppError<{}>(res.data, dispatch)
            }
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}
export const initializeAppTC = (): AppThunkCreatorsType => dispatch => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === ResponseStatusCode.success) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError<{ id: number, email: string, login: string }>(res.data, dispatch)
            }
        })
        .catch(error => handleServerNetworkError(error, dispatch))
        .finally(() => dispatch(setAppInitializingAC(true)))
}

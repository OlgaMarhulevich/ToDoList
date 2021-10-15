import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasksReducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {appReducer} from "./appReducer";
import {authReducer} from "./authReducer";
import {configureStore} from "@reduxjs/toolkit";
import { todoListsReducer } from "./todoListsReducer";

export const reducers = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: authReducer,
})

export const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppDispatch = typeof store.dispatch

export type AppStateType = ReturnType<typeof reducers>

// @ts-ignore
window.state = store.getState()
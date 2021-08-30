import {combineReducers, createStore } from "redux";
import {tasksReducer} from "./tasksReducer";
import {todoListReducer} from "./todoListReducer";

export const reducers = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer
})

export const store = createStore(reducers)

export type AppStateType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store
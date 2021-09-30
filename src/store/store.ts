import {combineReducers, createStore } from "redux";
import {tasksReducer} from "./tasksReducer";
import {todoListsReducer} from "./todoListsReducer";

export const reducers = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

export const store = createStore(reducers)

export type AppStateType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store
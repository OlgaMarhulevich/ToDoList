import {applyMiddleware, combineReducers, createStore } from "redux";
import {tasksReducer, TasksReducerActionType} from "./tasksReducer";
import {TodoListReducerActionType, todoListsReducer} from "./todoListsReducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";

export const reducers = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

export const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export type AppStateType = ReturnType<typeof reducers>
export type AppActionType = TodoListReducerActionType | TasksReducerActionType
export type AppThunkCreatorsType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionType>

// @ts-ignore
window.store = store
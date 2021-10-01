import { v1 } from "uuid";
import {todolistAPI, TodoListType} from "../API/todolist-api";
import {AppThunkType} from "./store";
import {addTaskAC} from "./tasksReducer";

export const ADD_TODOLIST = 'ADD-TODOLIST'
export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'
export const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
export const SET_TODOLISTS = 'SET-TODOLISTS'

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListDomainType = TodoListType & {filter: FilterValuesType}

const initialState: Array<TodoListDomainType> = []

export const todoListsReducer = (state = initialState, action: TodoListReducerActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return [{
                id: action.todoListID,
                title: action.title,
                filter: "all",
                addedDate: '',
                order: 0
            }, ...state]
        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.todoListID)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(t => t.id === action.todoListID ? {...t, filter: action.filter} : t)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(t => t.id === action.todoListID ? {...t, title: action.title} : t)
        case "SET-TODOLISTS":
            return action.todos.map(t => ({...t, filter: "all"}))
        default:
            return state
    }
}

//Action type
export type TodoListReducerActionType =
    AddTodoListAT |
    RemoveTodoListAT |
    ChangeTodoListFilterAT |
    ChangeTodoListTitleAT |
    SetTodoListsAT

//AC
export type AddTodoListAT = ReturnType<typeof addTodoListAC>
export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>
export type ChangeTodoListFilterAT = ReturnType<typeof changeTodoListFilterAC>
export type ChangeTodoListTitleAT = ReturnType<typeof changeTodoListTitleAC>
export type SetTodoListsAT = ReturnType<typeof setTodoListsAC>

export const addTodoListAC = (title: string) => {
    return {type: ADD_TODOLIST, title, todoListID: v1()} as const
}
export const removeTodoListAC = (todoListID: string) => {
    return {type: REMOVE_TODOLIST, todoListID} as const
}
export const changeTodoListFilterAC = (filter: FilterValuesType, todoListID: string) => {
    return {type: CHANGE_TODOLIST_FILTER, filter, todoListID} as const
}
export const changeTodoListTitleAC = (title: string, todoListID: string) => {
    return {type: CHANGE_TODOLIST_TITLE, title, todoListID} as const
}
export const setTodoListsAC = (todos: Array<TodoListType>) => {
    return {type: SET_TODOLISTS, todos} as const
}

//THUNK
export const getTodoLists = (): AppThunkType => (dispatch) => {
    todolistAPI.getTodos().then(res => dispatch(setTodoListsAC(res.data)))
}
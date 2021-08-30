import { v1 } from "uuid";
import {FilterValuesType, TodoListType} from "../../App";

export const ADD_TODOLIST = 'ADD-TODOLIST'
export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'
export const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'

const initialState: Array<TodoListType> = []

export const todoListReducer = (state = initialState, action: TodoListReducerActionType): Array<TodoListType> => {
    switch (action.type) {
        case ADD_TODOLIST:
            return [...state, {id: action.todoListID, title: action.title, filter: "all"}]
        case REMOVE_TODOLIST:
            return state.filter(t => t.id !== action.todoListID)
        case CHANGE_TODOLIST_FILTER:
            return state.map(t => t.id === action.todoListID ? {...t, filter: action.filter} : t)
        case CHANGE_TODOLIST_TITLE:
            return state.map(t => t.id === action.todoListID ? {...t, title: action.title} : t)
        default:
            return state
    }
}

//Action type
export type TodoListReducerActionType = AddTodoListAT | RemoveTodoListAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT

//AC
export type AddTodoListAT = {
    type: typeof ADD_TODOLIST
    title: string
    todoListID: string
}
export const addTodoListAC = (title: string): AddTodoListAT => ({ type: ADD_TODOLIST, title, todoListID: v1() })

export type RemoveTodoListAT = {
    type: typeof REMOVE_TODOLIST
    todoListID: string
}
export const removeTodoListAC = (todoListID: string): RemoveTodoListAT => ({ type: REMOVE_TODOLIST, todoListID })

export type ChangeTodoListFilterAT = {
    type: typeof CHANGE_TODOLIST_FILTER
    filter: FilterValuesType
    todoListID: string
}
export const changeTodoListFilterAC = (filter: FilterValuesType, todoListID: string): ChangeTodoListFilterAT => {
    return {type: CHANGE_TODOLIST_FILTER, filter, todoListID}
}

export type ChangeTodoListTitleAT = {
    type: typeof CHANGE_TODOLIST_TITLE
    title: string
    todoListID: string
}
export const changeTodoListTitleAC = (title: string, todoListID: string): ChangeTodoListTitleAT => {
    return {type: CHANGE_TODOLIST_TITLE, title, todoListID}
}

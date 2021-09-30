import { v1 } from "uuid";
import { TodoListType } from "../API/todolist-api";

export const ADD_TODOLIST = 'ADD-TODOLIST'
export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'
export const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
export const SET_TODOLISTS = 'SET-TODOLISTS'

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}

const initialState: Array<TodoListDomainType> = []

export const todoListsReducer = (state = initialState, action: TodoListReducerActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case ADD_TODOLIST:
            return [{
                id: action.todoListID,
                title: action.title,
                filter: "all",
                addedDate: '',
                order: 0
            }, ...state]
        case REMOVE_TODOLIST:
            return state.filter(t => t.id !== action.todoListID)
        case CHANGE_TODOLIST_FILTER:
            return state.map(t => t.id === action.todoListID ? {...t, filter: action.filter} : t)
        case CHANGE_TODOLIST_TITLE:
            return state.map(t => t.id === action.todoListID ? {...t, title: action.title} : t)
        case "SET-TODOLISTS":
            return [...action.todos]
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

export type SetTodoListsAT = ReturnType<typeof setTodoListsAC>
export const setTodoListsAC = (todos: Array<TodoListDomainType>) => {
    return {type: SET_TODOLISTS, todos} as const
}

export type ChangeTodoListTitleAT = {
    type: typeof CHANGE_TODOLIST_TITLE
    title: string
    todoListID: string
}
export const changeTodoListTitleAC = (title: string, todoListID: string): ChangeTodoListTitleAT => {
    return {type: CHANGE_TODOLIST_TITLE, title, todoListID}
}

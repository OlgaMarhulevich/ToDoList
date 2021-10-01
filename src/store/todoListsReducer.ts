import { v1 } from "uuid";
import {todolistAPI, TodoListType} from "../API/todolist-api";
import {AppThunkCreatorsType} from "./store";
import {addTaskAC} from "./tasksReducer";
import {tasksAPI} from "../API/tasks-api";

export const ADD_TODOLIST = 'TODOLISTS/ADD-TODOLIST'
export const REMOVE_TODOLIST = 'TODOLISTS/REMOVE-TODOLIST'
export const CHANGE_TODOLIST_FILTER = 'TODOLISTS/CHANGE-TODOLIST-FILTER'
export const CHANGE_TODOLIST_TITLE = 'TODOLISTS/CHANGE-TODOLIST-TITLE'
export const SET_TODOLISTS = 'TODOLISTS/SET-TODOLISTS'

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListDomainType = TodoListType & {filter: FilterValuesType}

const initialState: Array<TodoListDomainType> = []

export const todoListsReducer = (state = initialState, action: TodoListReducerActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case "TODOLISTS/ADD-TODOLIST":
            return [{
                id: action.todoListID,
                title: action.title,
                filter: "all",
                addedDate: '',
                order: 0
            }, ...state]
        case "TODOLISTS/REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.todoListID)
        case "TODOLISTS/CHANGE-TODOLIST-FILTER":
            return state.map(t => t.id === action.todoListID ? {...t, filter: action.filter} : t)
        case "TODOLISTS/CHANGE-TODOLIST-TITLE":
            return state.map(t => t.id === action.todoListID ? {...t, title: action.title} : t)
        case "TODOLISTS/SET-TODOLISTS":
            return action.todos.map(t => ({...t, filter: "all"}))
        default:
            return state
    }
}

//Action type
export type TodoListReducerActionType =
    | AddTodoListAT
    | RemoveTodoListAT
    | ChangeTodoListFilterAT
    | ChangeTodoListTitleAT
    | SetTodoListsAT

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
export const getTodoListsTC = (): AppThunkCreatorsType => (dispatch) => {
    todolistAPI.getTodos().then(res => dispatch(setTodoListsAC(res.data)))
}

export const addTodoListTC = (title: string): AppThunkCreatorsType => (dispatch) => {
    todolistAPI.createTodo(title).then(res => {
        res.data.resultCode === 0 ? dispatch(addTodoListAC(title)) : alert(res.data.messages[0])
    })
}

export const removeTodoListTC = (todoId: string): AppThunkCreatorsType => (dispatch) => {
    todolistAPI.deleteTodo(todoId).then(res => {
        res.data.resultCode === 0 ? dispatch(removeTodoListAC(todoId)) : alert(res.data.messages[0])
    })
}

export const changeTodoListTitleTC = (todoId: string, title: string): AppThunkCreatorsType => (dispatch) => {
    todolistAPI.updateTodo(todoId, title).then(res => {
        res.data.resultCode === 0 ? dispatch(changeTodoListTitleAC(todoId, title)) : alert(res.data.messages[0])
    })
}

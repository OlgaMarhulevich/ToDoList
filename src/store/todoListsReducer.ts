import {v1} from "uuid";
import {ResponseStatusCode, todolistAPI, TodoListType} from "../API/todolist-api";
import {AppThunkCreatorsType} from "./store";
import {addTaskAC, setTasksTC} from "./tasksReducer";
import {tasksAPI} from "../API/tasks-api";
import {RequestStatusType, setAppErrorAC, SetAppErrorAT, setAppStatusAC, SetAppStatusAT} from "./appReducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export const ADD_TODOLIST = 'TODOLISTS/ADD-TODOLIST'
export const REMOVE_TODOLIST = 'TODOLISTS/REMOVE-TODOLIST'
export const CHANGE_TODOLIST_FILTER = 'TODOLISTS/CHANGE-TODOLIST-FILTER'
export const CHANGE_TODOLIST_TITLE = 'TODOLISTS/CHANGE-TODOLIST-TITLE'
export const SET_TODOLISTS = 'TODOLISTS/SET-TODOLISTS'
export const SET_TODOLIST_ENTITY_STATUS = 'TODOLISTS/SET-TODOLIST-ENTITY-STATUS'
export const CLEAR_TODOS = 'TODOLISTS/CLEAR-TODOS'

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const initialState: Array<TodoListDomainType> = []

export const todoListsReducer = (state = initialState, action: TodoListReducerActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case "TODOLISTS/ADD-TODOLIST":
            return [{
                id: action.todoListID,
                title: action.title,
                filter: "all",
                addedDate: '',
                order: 0,
                entityStatus: "idle"
            }, ...state]
        case "TODOLISTS/REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.todoListID)
        case "TODOLISTS/CHANGE-TODOLIST-FILTER":
            return state.map(t => t.id === action.todoListID ? {...t, filter: action.filter} : t)
        case "TODOLISTS/CHANGE-TODOLIST-TITLE":
            return state.map(t => t.id === action.todoListID ? {...t, title: action.title} : t)
        case "TODOLISTS/SET-TODOLISTS":
            return action.todos.map(t => ({...t, filter: "all", entityStatus: "idle"}))
        case "TODOLISTS/SET-TODOLIST-ENTITY-STATUS":
            return state.map(t => t.id === action.todoId ? {...t, entityStatus: action.entityStatus} : t)
        case "TODOLISTS/CLEAR-TODOS":
            return []
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
    | SetAppStatusAT
    | SetAppErrorAT
    | ChangeTodolistEntityStatusAT
    | ClearTodosAT

//AC
export type AddTodoListAT = ReturnType<typeof addTodoListAC>
export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>
export type ChangeTodoListFilterAT = ReturnType<typeof changeTodoListFilterAC>
export type ChangeTodoListTitleAT = ReturnType<typeof changeTodoListTitleAC>
export type SetTodoListsAT = ReturnType<typeof setTodoListsAC>
export type ChangeTodolistEntityStatusAT = ReturnType<typeof changeTodolistEntityStatusAC>
export type ClearTodosAT = ReturnType<typeof clearTodosDataAC>

export const addTodoListAC = (title: string) => {
    return {type: ADD_TODOLIST, title, todoListID: v1()} as const
}
export const removeTodoListAC = (todoListID: string) => {
    return {type: REMOVE_TODOLIST, todoListID} as const
}
export const changeTodoListFilterAC = (filter: FilterValuesType, todoListID: string) => {
    return {type: CHANGE_TODOLIST_FILTER, filter, todoListID} as const
}
export const changeTodoListTitleAC = (todoListID: string, title: string) => {
    return {type: CHANGE_TODOLIST_TITLE, title, todoListID} as const
}
export const setTodoListsAC = (todos: Array<TodoListType>) => {
    return {type: SET_TODOLISTS, todos} as const
}
export const changeTodolistEntityStatusAC = (todoId: string, entityStatus: RequestStatusType) => {
    return {type: SET_TODOLIST_ENTITY_STATUS, todoId, entityStatus} as const
}
export const clearTodosDataAC = () => {
    return {type: CLEAR_TODOS} as const
}

//THUNK
export const getTodoListsTC = (): AppThunkCreatorsType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodos()
        .then(res => {
            dispatch(setTodoListsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
            return res.data
        })
        .then(todos => {
            todos.forEach(todo => {
                dispatch(setTasksTC(todo.id))
            })
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })

}

export const addTodoListTC = (title: string): AppThunkCreatorsType => dispatch => {
    dispatch(setAppStatusAC('loading'))

    todolistAPI.createTodo(title)
        .then(res => {
            if (res.data.resultCode === ResponseStatusCode.success) {
                dispatch(addTodoListAC(title))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError<{item: TodoListType}>(res.data, dispatch)
            }
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

export const removeTodoListTC = (todoId: string): AppThunkCreatorsType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todoId, 'loading'))

    todolistAPI.deleteTodo(todoId)
        .then(res => {
            if (res.data.resultCode === ResponseStatusCode.success) {
                dispatch(removeTodoListAC(todoId))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(changeTodolistEntityStatusAC(todoId, 'succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

export const changeTodoListTitleTC = (todoId: string, title: string): AppThunkCreatorsType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTodo(todoId, title)
        .then(res => {
            console.log(res)
            if (res.data.resultCode === ResponseStatusCode.success) {
                dispatch(changeTodoListTitleAC(todoId, title))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

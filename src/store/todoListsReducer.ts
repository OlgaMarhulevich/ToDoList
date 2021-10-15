import {FilterValuesType, ResponseStatusCode, todolistAPI, TodoListDomainType, TodoListType} from "../API/todolist-api";
import {RequestStatusType, setAppStatusAC} from "./appReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "react";
import { setTasksTC } from "./tasksReducer";
import {handleServerAppError, handleServerNetworkError } from "../utils/error-utils";

const initialState: Array<TodoListDomainType> = []

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        addTodoListAC(state, action: PayloadAction<{ todo: TodoListType }>) {
            state.unshift({
                ...action.payload.todo,
                filter: "all",
                entityStatus: "idle"
            })
        },
        removeTodoListAC(state, action: PayloadAction<{ todoListID: string }>) {
            const foundId = state.findIndex(t => t.id === action.payload.todoListID)
            if (foundId > -1) {
                state.splice(foundId, 1)
            }
        },
        changeTodoListFilterAC(state, action: PayloadAction<{ filter: FilterValuesType, todoListID: string }>) {
            const foundId = state.findIndex(t => t.id === action.payload.todoListID)
            if (foundId > -1) {
                state[foundId].filter = action.payload.filter
            }
        },
        changeTodoListTitleAC(state, action: PayloadAction<{ todoListID: string, title: string }>) {
            const foundId = state.findIndex(t => t.id === action.payload.todoListID)
            if (foundId > -1) {
                state[foundId].title = action.payload.title
            }
        },
        setTodoListsAC(state, action: PayloadAction<{ todos: Array<TodoListType> }>) {
            return action.payload.todos.map(t => ({...t, filter: "all", entityStatus: "idle"}))
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ todoId: string, entityStatus: RequestStatusType }>) {
            const foundId = state.findIndex(t => t.id === action.payload.todoId)
            if (foundId > -1) {
                state[foundId].entityStatus = action.payload.entityStatus
            }
        },
        clearTodosDataAC() {
            return []
        },
    }
})

export const todoListsReducer = slice.reducer
export const {addTodoListAC, removeTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, setTodoListsAC, changeTodolistEntityStatusAC, clearTodosDataAC, } = slice.actions


//THUNK
export const getTodoListsTC = () => (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.getTodos()
        .then(res => {
            dispatch(setTodoListsAC({todos: res.data}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
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

export const addTodoListTC = (title: string) => (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC({status: 'loading'}))

    todolistAPI.createTodo(title)
        .then(res => {
            if (res.data.resultCode === ResponseStatusCode.success) {
                dispatch(addTodoListAC({todo: res.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError<{item: TodoListType}>(res.data, dispatch)
            }
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

export const removeTodoListTC = (todoId: string) => (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({todoId: todoId, entityStatus: 'loading'}))

    todolistAPI.deleteTodo(todoId)
        .then(res => {
            if (res.data.resultCode === ResponseStatusCode.success) {
                dispatch(removeTodoListAC({todoListID: todoId}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
                dispatch(changeTodolistEntityStatusAC({todoId: todoId, entityStatus: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

export const changeTodoListTitleTC = (todoId: string, title: string) => (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.updateTodo(todoId, title)
        .then(res => {
            console.log(res)
            if (res.data.resultCode === ResponseStatusCode.success) {
                dispatch(changeTodoListTitleAC({todoListID: todoId, title: title}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

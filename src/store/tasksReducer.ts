import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {ResponseStatusCode} from "../API/todolist-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RequestStatusType, setAppStatusAC} from "./appReducer";
import {AppStateType} from "./store";
import {TaskDomainType, tasksAPI, TaskStatuses, TaskType} from "../API/tasks-api";
import {Dispatch} from "react";
import {addTodoListAC, clearTodosDataAC, removeTodoListAC, setTodoListsAC} from "./todoListsReducer";

export type TasksStateType = {
    [id: string]: Array<TaskDomainType>
}

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift({...action.payload.task, entityStatus: 'idle'})
        },
        removeTaskAC(state, action: PayloadAction<{ todoListID: string, taskId: string }>) {
            const tasks = state[action.payload.todoListID]
            const foundId = tasks.findIndex(t => t.id === action.payload.taskId)
            if (foundId > -1) {
                tasks.splice(foundId, 1)
            }
        },
        changeTaskStatusAC(state, action: PayloadAction<{ todoListID: string, taskId: string, status: TaskStatuses }>) {
            const tasks = state[action.payload.todoListID]
            const foundId = tasks.findIndex(t => t.id === action.payload.taskId)
            if (foundId > -1) {
                tasks[foundId].status = action.payload.status
            }
        },
        changeTaskTitleAC(state, action: PayloadAction<{ todoListID: string, taskId: string, title: string }>) {
            const tasks = state[action.payload.todoListID]
            const foundId = tasks.findIndex(t => t.id === action.payload.taskId)
            if (foundId > -1) {
                tasks[foundId].title = action.payload.title
            }
        },
        setTasksAC(state, action: PayloadAction<{ todoId: string, tasks: Array<TaskType> }>) {
            state[action.payload.todoId] = action.payload.tasks.map(t => ({...t, entityStatus: 'idle'}))
            return state
        },
        changeTaskEntityStatusAC(state, action: PayloadAction<{ todoId: string, taskId: string, entityStatus: RequestStatusType }>) {
            const tasks = state[action.payload.todoId]
            const foundId = tasks.findIndex(t => t.id === action.payload.taskId)
            if (foundId > -1) {
                tasks[foundId].entityStatus = action.payload.entityStatus
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(addTodoListAC, (state, action) => {
            state[action.payload.todo.id] = []
        })
        builder.addCase(removeTodoListAC, (state, action) => {
            delete state[action.payload.todoListID]
        })
        builder.addCase(setTodoListsAC, (state, action) => {
            action.payload.todos.forEach(t => state[t.id] = [])
        })
        builder.addCase(clearTodosDataAC, () => {
            return {}
        })
    }
})

export const tasksReducer = slice.reducer
export const {addTaskAC, removeTaskAC, changeTaskStatusAC, changeTaskTitleAC, setTasksAC, changeTaskEntityStatusAC} = slice.actions


//THUNK
export const setTasksTC = (todoId: string) => (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    tasksAPI.getTasks(todoId)
        .then(res => {
            dispatch(setTasksAC({todoId: todoId, tasks: res.data.items}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

export const removeTaskTC = (todoId: string, taskId: string) => (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTaskEntityStatusAC({todoId: todoId, taskId: taskId, entityStatus: 'loading'}))

    tasksAPI.deleteTask(todoId, taskId)
        .then(res => {
            if (res.data.resultCode === ResponseStatusCode.success) {
                dispatch(removeTaskAC({todoListID: todoId, taskId: taskId}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
                dispatch(changeTaskEntityStatusAC({todoId: todoId, taskId: taskId, entityStatus: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

export const addTaskTC = (todoId: string, title: string) => (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    tasksAPI.createTask(todoId, title)
        .then(res => {
            if (res.data.resultCode === ResponseStatusCode.success) {
                dispatch(addTaskAC({task: res.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError<{ item: TaskType }>(res.data, dispatch)
            }
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

export const changeTaskStatusTC = (todoListID: string, taskID: string, status: TaskStatuses) => (dispatch: Dispatch<any>, getState: () => AppStateType) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    let taskForUpdate = getState().tasks[todoListID].find(t => t.id === taskID)

    if (taskForUpdate) {
        taskForUpdate = {...taskForUpdate, status,}

        tasksAPI.updateTask(todoListID, taskID, taskForUpdate)
            .then(res => {
                    if (res.data.resultCode === ResponseStatusCode.success) {
                        dispatch(changeTaskStatusAC({todoListID: todoListID, taskId: taskID, status: res.data.data.item.status}))
                        dispatch(setAppStatusAC({status: 'succeeded'}))
                    } else {
                        handleServerAppError<{ item: TaskType }>(res.data, dispatch)
                    }
                }
            )
            .catch(error => handleServerNetworkError(error, dispatch))
    }
}

export const changeTaskTitleTC = (todoListID: string, taskID: string, title: string) => (dispatch: Dispatch<any>, getState: () => AppStateType) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    let taskForUpdate = getState().tasks[todoListID].find(t => t.id === taskID)
    if (taskForUpdate) {
        taskForUpdate = {...taskForUpdate, title}

        tasksAPI.updateTask(todoListID, taskID, taskForUpdate)
            .then(res => {
                if (res.data.resultCode === ResponseStatusCode.success) {
                    dispatch(changeTaskTitleAC({todoListID: todoListID, taskId: taskID, title: res.data.data.item.title}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError<{ item: TaskType }>(res.data, dispatch)
                }
            })
            .catch(error => handleServerNetworkError(error, dispatch))
    }
}

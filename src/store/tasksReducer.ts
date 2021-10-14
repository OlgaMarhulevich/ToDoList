import {v1} from "uuid";
import {
    AddTodoListAT,
    ADD_TODOLIST,
    REMOVE_TODOLIST,
    RemoveTodoListAT,
    SetTodoListsAT,
    changeTodolistEntityStatusAC, SET_TODOLIST_ENTITY_STATUS, ClearTodosAT
} from "./todoListsReducer";
import {TaskDomainType, TaskPriorities, tasksAPI, TaskStatuses, TaskType} from "../API/tasks-api";
import {AppStateType, AppThunkCreatorsType} from "./store";
import {RequestStatusType, setAppErrorAC, SetAppErrorAT, setAppStatusAC, SetAppStatusAT} from "./appReducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {ResponseStatusCode} from "../API/todolist-api";

export const ADD_TASK = 'TASKS/ADD-TASK'
export const REMOVE_TASK = 'TASKS/REMOVE-TASK'
export const CHANGE_TASK_STATUS = 'TASKS/CHANGE-TASK-STATUS'
export const CHANGE_TASK_TITLE = 'TASKS/CHANGE-TASK-TITLE'
export const SET_TASKS = 'TASKS/SET-TASKS'
export const SET_TASK_ENTITY_STATUS = 'TASKS/SET-TASK-ENTITY-STATUS'

export type TasksStateType = {
    [id: string]: Array<TaskDomainType>
}
const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: TasksReducerActionType): TasksStateType => {
    switch (action.type) {
        case "TASKS/ADD-TASK":
            return {
                ...state,
                [action.task.todoListId]: [{...action.task, entityStatus: 'idle'}, ...state[action.task.todoListId]]
            }
        case "TASKS/REMOVE-TASK":
            return {...state, [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.id)}
        case "TASKS/CHANGE-TASK-STATUS":
            return {
                ...state, [action.todoListID]:
                    state[action.todoListID].map(t => t.id === action.id ? {...t, status: action.status} : t)
            }
        case "TASKS/CHANGE-TASK-TITLE":
            return {
                ...state, [action.todoListID]:
                    state[action.todoListID].map(t => t.id === action.id ? {...t, title: action.title} : t)
            }
        case "TODOLISTS/ADD-TODOLIST":
            return {...state, [action.todoListID]: []}
        case "TODOLISTS/REMOVE-TODOLIST":
            const copyState = {...state}
            delete copyState[action.todoListID]
            return copyState
        case "TODOLISTS/SET-TODOLISTS":
            const stateCopy = {...state}
            action.todos.forEach(t => stateCopy[t.id] = [])
            return stateCopy
        case "TASKS/SET-TASKS":
            return {...state, [action.todoId]: action.tasks.map(t => ({...t, entityStatus: 'idle'}))}
        case "TASKS/SET-TASK-ENTITY-STATUS":
            return {
                ...state, [action.todoId]:
                    state[action.todoId].map(t => t.id === action.id ? {...t, entityStatus: action.entityStatus} : t)
            }
        case "TODOLISTS/CLEAR-TODOS":
            return {}
        default:
            return state
    }
}

//ActionType
export type TasksReducerActionType =
    | AddTaskAT
    | RemoveTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodoListAT
    | RemoveTodoListAT
    | SetTodoListsAT
    | SetTasksAT
    | SetAppStatusAT
    | SetAppErrorAT
    | ChangeTaskEntityStatusAT
    | ClearTodosAT

//AC
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export type SetTasksAT = ReturnType<typeof setTasksAC>
export type ChangeTaskEntityStatusAT = ReturnType<typeof changeTaskEntityStatusAC>

export const addTaskAC = (task: TaskType) => {
    return {type: ADD_TASK, task} as const
}
export const removeTaskAC = (todoListID: string, id: string) => {
    return {type: REMOVE_TASK, todoListID, id} as const
}
export const changeTaskStatusAC = (todoListID: string, id: string, status: TaskStatuses) => {
    return {type: CHANGE_TASK_STATUS, todoListID, id, status} as const
}
export const changeTaskTitleAC = (todoListID: string, id: string, title: string) => {
    return {type: CHANGE_TASK_TITLE, todoListID, id, title} as const
}
export const setTasksAC = (todoId: string, tasks: Array<TaskType>) => {
    return {type: SET_TASKS, todoId, tasks} as const
}
export const changeTaskEntityStatusAC = (todoId: string, id: string, entityStatus: RequestStatusType) => {
    return {type: SET_TASK_ENTITY_STATUS, todoId, id, entityStatus} as const
}

//THUNK
export const setTasksTC = (todoId: string): AppThunkCreatorsType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.getTasks(todoId)
        .then(res => {
            dispatch(setTasksAC(todoId, res.data.items))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

export const removeTaskTC = (todoId: string, taskId: string): AppThunkCreatorsType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTaskEntityStatusAC(todoId, taskId, 'loading'))

    tasksAPI.deleteTask(todoId, taskId)
        .then(res => {
            if (res.data.resultCode === ResponseStatusCode.success) {
                dispatch(removeTaskAC(todoId, taskId))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(changeTaskEntityStatusAC(todoId, taskId, 'succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

export const addTaskTC = (todoId: string, title: string): AppThunkCreatorsType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.createTask(todoId, title)
        .then(res => {
            if (res.data.resultCode === ResponseStatusCode.success) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError<{ item: TaskType }>(res.data, dispatch)
            }
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

export const changeTaskStatusTC = (todoListID: string, taskID: string, status: TaskStatuses): AppThunkCreatorsType => (dispatch, getState: () => AppStateType) => {
    dispatch(setAppStatusAC('loading'))
    let taskForUpdate = getState().tasks[todoListID].find(t => t.id === taskID)

    if (taskForUpdate) {
        taskForUpdate = {...taskForUpdate, status,}

        tasksAPI.updateTask(todoListID, taskID, taskForUpdate)
            .then(res => {
                    if (res.data.resultCode === ResponseStatusCode.success) {
                        dispatch(changeTaskStatusAC(todoListID, taskID, res.data.data.item.status))
                        dispatch(setAppStatusAC('succeeded'))
                    } else {
                        handleServerAppError<{ item: TaskType }>(res.data, dispatch)
                    }
                }
            )
            .catch(error => handleServerNetworkError(error, dispatch))
    }
}

export const changeTaskTitleTC = (todoListID: string, taskID: string, title: string): AppThunkCreatorsType => (dispatch, getState: () => AppStateType) => {
    dispatch(setAppStatusAC('loading'))
    let taskForUpdate = getState().tasks[todoListID].find(t => t.id === taskID)
    if (taskForUpdate) {
        taskForUpdate = {...taskForUpdate, title}

        tasksAPI.updateTask(todoListID, taskID, taskForUpdate)
            .then(res => {
                if (res.data.resultCode === ResponseStatusCode.success) {
                    dispatch(changeTaskTitleAC(todoListID, taskID, res.data.data.item.title))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError<{ item: TaskType }>(res.data, dispatch)
                }
            })
            .catch(error => handleServerNetworkError(error, dispatch))
    }
}

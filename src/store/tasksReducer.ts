import {v1} from "uuid";
import {AddTodoListAT, ADD_TODOLIST, REMOVE_TODOLIST, RemoveTodoListAT, SetTodoListsAT} from "./todoListsReducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType} from "../API/tasks-api";
import {AppStateType, AppThunkCreatorsType} from "./store";

export const ADD_TASK = 'TASKS/ADD-TASK'
export const REMOVE_TASK = 'TASKS/REMOVE-TASK'
export const CHANGE_TASK_STATUS = 'TASKS/CHANGE-TASK-STATUS'
export const CHANGE_TASK_TITLE = 'TASKS/CHANGE-TASK-TITLE'
export const SET_TASKS = 'TASKS/SET-TASKS'

export type TasksStateType = {
    [id: string]: Array<TaskType>
}
const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: TasksReducerActionType): TasksStateType => {
    switch (action.type) {
        case "TASKS/ADD-TASK":
            return {
                ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
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
            return {...state, [action.todoId]: [...action.tasks]}
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

//AC
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export type SetTasksAT = ReturnType<typeof setTasksAC>

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

//THUNK
export const setTasksTC = (todoId: string): AppThunkCreatorsType => (dispatch) => {
    tasksAPI.getTasks(todoId).then(res => dispatch(setTasksAC(todoId, res.data.items)))
}

export const removeTaskTC = (todoId: string, taskId: string): AppThunkCreatorsType => (dispatch) => {
    tasksAPI.deleteTask(todoId, taskId).then(res => {
        res.data.resultCode === 0 ? dispatch(removeTaskAC(todoId, taskId)) : alert(res.data.messages[0])
    })
}

export const addTaskTC = (todoId: string, title: string): AppThunkCreatorsType => (dispatch) => {
    tasksAPI.createTask(todoId, title).then(res => {
        res.data.resultCode === 0 ? dispatch(addTaskAC(res.data.data.item)) : alert(res.data.messages[0])
    })
}

export const changeTaskStatusTC = (todoListID: string, taskID: string, status: TaskStatuses): AppThunkCreatorsType => (dispatch, getState: () => AppStateType) => {
    let taskForUpdate = getState().tasks[todoListID].find(t => t.id === taskID)

    if (taskForUpdate) {
        taskForUpdate = {...taskForUpdate, status, }
        tasksAPI.updateTask(todoListID, taskID, taskForUpdate).then(res => {
            res.data.resultCode === 0 ? dispatch(changeTaskStatusAC(todoListID, taskID, res.data.data.item.status)) : alert(res.data.messages[0])
        })
    }
}

export const changeTaskTitleTC = (todoListID: string, taskID: string, title: string): AppThunkCreatorsType => (dispatch, getState: () => AppStateType) => {
    let taskForUpdate = getState().tasks[todoListID].find(t => t.id === taskID)
    if (taskForUpdate) {
        taskForUpdate = {...taskForUpdate, title}
        tasksAPI.updateTask(todoListID, taskID, taskForUpdate).then(res => {
            res.data.resultCode === 0 ? dispatch(changeTaskTitleAC(todoListID, taskID, res.data.data.item.title)) : alert(res.data.messages[0])
        })
    }
}

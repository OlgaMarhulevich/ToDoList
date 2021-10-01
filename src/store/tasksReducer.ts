import {v1} from "uuid";
import { TasksStateType } from "../AppWithRedux";
import {AddTodoListAT, ADD_TODOLIST, REMOVE_TODOLIST, RemoveTodoListAT, SetTodoListsAT} from "./todoListsReducer";
import {TaskPriorities, TaskStatuses} from "../API/tasks-api";

export const ADD_TASK = 'ADD-TASK'
export const REMOVE_TASK = 'REMOVE-TASK'
export const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
export const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: TasksReducerActionType): TasksStateType => {
    switch (action.type) {
        case "ADD-TASK":
            return {
                ...state,
                [action.todoListID]: [
                    {
                        id: action.id,
                        title: action.title,
                        description: '',
                        completed: false,
                        status: TaskStatuses.New,
                        priority: TaskPriorities.Low,
                        startDate: '',
                        deadline: '',
                        todoListId: action.todoListID,
                        order: 0,
                        addedDate: '',
                    },
                    ...state[action.todoListID]
                ]
            }
        case "REMOVE-TASK":
            return {
                ...state, [action.todoListID]: state[action.todoListID]
                    .filter(t => t.id !== action.id)
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state, [action.todoListID]: state[action.todoListID]
                    .map(t => t.id === action.id ? {...t, status: action.status} : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state, [action.todoListID]: state[action.todoListID]
                    .map(t => t.id === action.id ? {...t, title: action.title} : t)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todoListID]: []}
        case "REMOVE-TODOLIST":
            const copyState = {...state}
            delete copyState[action.todoListID]
            return copyState
        case "SET-TODOLISTS":
            const stateCopy = {...state}
            action.todos.forEach(t => {
                stateCopy[t.id] = []
            })
            return stateCopy
        default:
            return state
    }
}

//ActionType
export type TasksReducerActionType =
    AddTaskAT |
    RemoveTaskAT |
    ChangeTskStatusAT |
    ChangeTskTitleAT |
    AddTodoListAT |
    RemoveTodoListAT |
    SetTodoListsAT

//AC
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type ChangeTskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTskTitleAT = ReturnType<typeof changeTaskTitleAC>

export const addTaskAC = (todoListID: string, title: string) => {
    return {type: ADD_TASK, todoListID, id: v1(), title} as const
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

//THUNK


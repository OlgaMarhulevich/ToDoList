import {TasksStateType} from "../../App";
import {v1} from "uuid";
import {AddTodoListAT, ADD_TODOLIST, REMOVE_TODOLIST, RemoveTodoListAT} from "./todoListReducer";

export const ADD_TASK = 'ADD-TASK'
export const REMOVE_TASK = 'REMOVE-TASK'
export const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
export const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                [action.todoListID]: [
                    {id: action.id, title: action.title, isDone: false},
                    ...state[action.todoListID]
                ]
            }
        case REMOVE_TASK:
            return {
                ...state, [action.todoListID]: state[action.todoListID]
                    .filter(t => t.id !== action.id)
            }
        case CHANGE_TASK_STATUS:
            return {
                ...state, [action.todoListID]: state[action.todoListID]
                    .map(t => t.id === action.id ? {...t, isDone: action.isDone} : t)
            }
        case CHANGE_TASK_TITLE:
            return {
                ...state, [action.todoListID]: state[action.todoListID]
                    .map(t => t.id === action.id ? {...t, title: action.title} : t)
            }
        case ADD_TODOLIST:
            return {...state, [action.todoListID]: []}
        case REMOVE_TODOLIST:
            const copyState = {...state}
            delete copyState[action.todoListID]
            return copyState
        default:
            return state
    }
}

export type ActionType = AddTaskAT |
    RemoveTaskAT |
    ChangeTskStatusAT |
    ChangeTskTitleAT |
    AddTodoListAT |
    RemoveTodoListAT
//AC
export type AddTaskAT = {
    type: typeof ADD_TASK
    todoListID: string
    id: string
    title: string
}
export const addTaskAC = (todoListID: string, title: string): AddTaskAT => ({
    type: ADD_TASK,
    todoListID,
    id: v1(),
    title
})

export type RemoveTaskAT = {
    type: typeof REMOVE_TASK
    todoListID: string
    id: string
}
export const removeTaskAC = (todoListID: string, id: string): RemoveTaskAT => ({type: REMOVE_TASK, todoListID, id})

export type ChangeTskStatusAT = {
    type: typeof CHANGE_TASK_STATUS
    todoListID: string
    id: string
    isDone: boolean
}
export const changeTaskStatusAC = (todoListID: string, id: string, isDone: boolean): ChangeTskStatusAT => ({
    type: CHANGE_TASK_STATUS,
    todoListID,
    id,
    isDone
})

export type ChangeTskTitleAT = {
    type: typeof CHANGE_TASK_TITLE
    todoListID: string
    id: string
    title: string
}
export const changeTaskTitleAC = (todoListID: string, id: string, title: string): ChangeTskTitleAT => ({
    type: CHANGE_TASK_TITLE,
    todoListID,
    id,
    title
})


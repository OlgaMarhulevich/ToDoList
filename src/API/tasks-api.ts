import axios from "axios";
import { RequestStatusType } from "../store/appReducer";
import {axiosInstance, ResponseType} from "./todolist-api";

//Enum
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later
}
//Response types
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}
export type GetTasksResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string
}

export const tasksAPI = {
    getTasks: (todoId: string) => {
        return axiosInstance.get<GetTasksResponseType>(`/todo-lists/${todoId}/tasks`)
    },
    createTask: (todoId: string, title: string) => {
        return axiosInstance.post<ResponseType<{item: TaskType}>>(`/todo-lists/${todoId}/tasks`, {title})
    },
    deleteTask: (todoId: string, taskId: string) => {
        return axiosInstance.delete<ResponseType>(`/todo-lists/${todoId}/tasks/${taskId}`)
    },
    updateTask: (todoId: string, taskId: string, task: TaskType) => {
        return axiosInstance.put<ResponseType<{item: TaskType}>>(`/todo-lists/${todoId}/tasks/${taskId}`, {...task})
    },
}

import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'ff96c8c6-9a67-45a6-8e7e-64655709b2bd'
    }
})

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
export type GetTasksResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string
}
export type TaskResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
}

export const tasksAPI = {
    getTasks: (todoId: string) => {
        return axiosInstance.get<GetTasksResponseType>(`/todo-lists/${todoId}/tasks`)
    },
    createTask: (todoId: string, title: string) => {
        return axiosInstance.post<TaskResponseType<{item: TaskType}>>(`/todo-lists/${todoId}/tasks`, {title})
    },
    deleteTask: (todoId: string, taskId: string) => {
        return axiosInstance.delete<TaskResponseType>(`/todo-lists/${todoId}/tasks/${taskId}`)
    },
    updateTask: (todoId: string, taskId: string, task: TaskType) => {
        return axiosInstance.put<TaskResponseType<{item: TaskType}>>(`/todo-lists/${todoId}/tasks/${taskId}`, {...task})
    },
}

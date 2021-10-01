import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'ff96c8c6-9a67-45a6-8e7e-64655709b2bd'
    }
})
//Response types
export type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type TodolistResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
    fieldsErrors: Array<string>
}

export const todolistAPI = {
    getTodos: () => {
        return axiosInstance.get<Array<TodoListType>>('/todo-lists')
    },
    createTodo: (title: string) => {
        return axiosInstance.post<TodolistResponseType<{item: TodoListType}>>('/todo-lists', {title})
    },
    deleteTodo: (tdlId: string) => {
        return axiosInstance.delete<TodolistResponseType>(`/todo-lists/${tdlId}`)
    },
    updateTodo: (tdlId: string, title: string) => {
        return axiosInstance.put<TodolistResponseType>(`/todo-lists/${tdlId}`, {title})
    },
}
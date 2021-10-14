import axios from "axios";

export const axiosInstance = axios.create({
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
export type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
    fieldsErrors: Array<string>
}
export enum ResponseStatusCode {
    success = 0,
    error = 1,
    captcha = 10
}

export const todolistAPI = {
    getTodos: () => {
        return axiosInstance.get<Array<TodoListType>>('/todo-lists')
    },
    createTodo: (title: string) => {
        return axiosInstance.post<ResponseType<{item: TodoListType}>>('/todo-lists', {title})
    },
    deleteTodo: (tdlId: string) => {
        return axiosInstance.delete<ResponseType>(`/todo-lists/${tdlId}`)
    },
    updateTodo: (tdlId: string, title: string) => {
        return axiosInstance.put<ResponseType>(`/todo-lists/${tdlId}`, {title})
    },
}
import axios from "axios";
import {axiosInstance, ResponseType} from "./todolist-api";

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: boolean
}

export const authAPI = {
    login(data: LoginParamsType) {
        return axiosInstance.post<ResponseType<{id: number, email: string, login: string}>>('/auth/login', data)
    },
    logout() {
        return axiosInstance.delete<ResponseType<{}>>('/auth/login')
    },
    me() {
        return axiosInstance.get<ResponseType<{id: number, email: string, login: string}>>('/auth/me')
    },
}

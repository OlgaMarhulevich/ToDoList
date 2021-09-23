import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../../api/todolist-api";

export default {
    title: 'API/todolists'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodos()
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodo('NEW TODO')
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

const tdlId = '5eae3eca-e023-4c68-b26d-828e5cf75bcd'

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.deleteTodo(tdlId)
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.updateTodo(tdlId, 'UPDATED TODO')
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


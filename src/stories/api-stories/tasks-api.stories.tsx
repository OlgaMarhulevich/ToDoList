import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../../api/todolist-api";
import {tasksAPI} from "../../api/tasks-api";

export default {
    title: 'API/tasks'
}

const todoId = '5eae3eca-e023-4c68-b26d-828e5cf75bcd'

export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksAPI.getTasks(todoId)
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksAPI.createTask(todoId, 'NEW TASK')
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

const taskId = 'f0437a11-6d4c-48ed-86ec-f8c5de183790'

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksAPI.deleteTask(todoId, taskId)
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksAPI.updateTask(todoId, taskId, 'UPDATED TASK')
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


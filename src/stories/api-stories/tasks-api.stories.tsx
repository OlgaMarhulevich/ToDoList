import React, {useEffect, useState} from 'react'
import axios from "axios";
import {tasksAPI} from "../../API/tasks-api";

export default {
    title: 'API/tasks'
}

const todoId = '23631781-6150-49d0-afeb-faf544fa8b06'

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
        tasksAPI.updateTask(todoId, taskId, {
            status: 1,
            title: '',
            id: '',
            todoListId: '',
            addedDate: '',
            completed: true,
            deadline: '',
            description: '',
            order: 1,
            priority: 1,
            startDate: '',
        })
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback} from 'react';
import s from './Task.module.css';
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskStatuses} from "../../../../API/tasks-api";

//TYPES
type PropsType = {
    taskID: string
    taskTitle: string
    taskStatus: number
    todoListID: string
    removeTask: (taskId: string, todoListID: string) => void
    addTask: (task: string, todoListID: string) => void
    changeTaskStatus: (status: TaskStatuses, id: string, todoListID: string) => void
    changeTaskTitle: (title: string, id: string, todoListID: string) => void
}

//COMPONENT
export const Task = React.memo((props: PropsType) => {
    //onCLick Handlers
    const removeTask = useCallback(() => props.removeTask(props.taskID, props.todoListID), [props.removeTask, props.taskID, props.todoListID])
    const changeTaskStatus = useCallback((event: React.ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus((event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.InProgress), props.taskID, props.todoListID), [props.changeTaskStatus, props.taskID, props.todoListID])
    const changeTaskTitle = useCallback((title) => props.changeTaskTitle(title, props.taskID, props.todoListID), [props.changeTaskStatus, props.taskID, props.todoListID])

    //JSX
    return (
        <li className={props.taskStatus === TaskStatuses.Completed ? s.doneTask : ''} key={props.taskID}>
            <Checkbox checked={props.taskStatus === TaskStatuses.Completed}
                      onChange={changeTaskStatus}
                      size={"small"}
                      color="primary"/>
            <EditableSpan title={props.taskTitle}
                          changeTitle={changeTaskTitle}/>

            <IconButton aria-label="delete" size={"small"} onClick={removeTask}>
                <Delete/>
            </IconButton>
        </li>
    )
})



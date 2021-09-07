/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback} from 'react';
import s from './Task.module.css';
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

//TYPES
type PropsType = {
    taskID: string
    taskTitle: string
    taskIsDone: boolean
    todoListID: string
    removeTask: (taskId: string, todoListID: string) => void
    addTask: (task: string, todoListID: string) => void
    changeTaskStatus: (isDone: boolean, id: string, todoListID: string) => void
    changeTaskTitle: (title: string, id: string, todoListID: string) => void
}

//COMPONENT
export const Task = React.memo((props: PropsType) => {
    //onCLick Handlers
    const removeTask = useCallback(() => props.removeTask(props.taskID, props.todoListID), [props.removeTask, props.taskID, props.todoListID])
    const changeTaskStatus = useCallback((event: React.ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(event.currentTarget.checked, props.taskID, props.todoListID), [props.changeTaskStatus, props.taskID, props.todoListID])
    const changeTaskTitle = useCallback((title) => props.changeTaskTitle(title, props.taskID, props.todoListID), [props.changeTaskStatus, props.taskID, props.todoListID])

    //JSX
    return (
        <li className={props.taskIsDone ? s.doneTask : ''} key={props.taskID}>
            <Checkbox checked={props.taskIsDone}
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



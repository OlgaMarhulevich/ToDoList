import React from 'react';
import {FilterValuesType, TaskType} from '../../App';
import {Input} from "../Input/Input";
import s from './Todolist.module.css';
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListID: string) => void
    addTask: (task: string, todoListID: string) => void
    changeTaskStatus: (isDone: boolean, id: string, todoListID: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
    changeTaskTitle: (title: string, id: string, todoListID: string) => void
}


export function Todolist(props: PropsType) {



    return <div>
        <div className={s.title}>
            <IconButton aria-label="delete" size={"small"} onClick={() => props.removeTodoList(props.id)}>
                <Delete/>
            </IconButton>
            <EditableSpan title={props.title} changeTitle={(title) => props.changeTodoListTitle(title, props.id)}/>
        </div>

        <div>
            <Input callback={(title) => props.addTask(title, props.id)}/>
        </div>

        <div className={s.buttons}>
            <Button
                size={"small"}
                onClick={() => props.changeTodoListFilter("all", props.id)}
                variant={"contained"}
                color={props.filter === "all" ? "secondary" : "primary"}>All</Button>
            <Button
                size={"small"}
                onClick={() => props.changeTodoListFilter("active", props.id)}
                variant={"contained"}
                color={props.filter === "active" ? "secondary" : "primary"}>Active</Button>
            <Button
                size={"small"}
                onClick={() => props.changeTodoListFilter("completed", props.id)}
                variant={"contained"}
                color={props.filter === "completed" ? "secondary" : "primary"}>Completed</Button>
        </div>

        <ul>
            {props.tasks.map(task => {
                    const removeTask = () => {
                        props.removeTask(task.id, props.id)
                    }
                    const changeTaskStatus = (event: React.ChangeEvent<HTMLInputElement>) =>
                        props.changeTaskStatus(event.currentTarget.checked, task.id, props.id)
                    return (
                        <li className={task.isDone ? s.doneTask : ''} key={task.id}>
                            <Checkbox checked={task.isDone}
                                      onChange={changeTaskStatus}
                                      size={"small"}
                                      color="primary"/>
                            <EditableSpan title={task.title}
                                          changeTitle={(title) => props.changeTaskTitle(title, task.id, props.id)}/>

                            <IconButton aria-label="delete" size={"small"} onClick={removeTask}>
                                <Delete/>
                            </IconButton>
                        </li>
                    )
                }
            )}
        </ul>
    </div>
}

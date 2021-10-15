/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect} from 'react';
import s from './Todolist.module.css';
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from './Task/Task';
import {TaskDomainType, TaskStatuses} from "../../../API/tasks-api";
import {setTasksTC} from "../../../store/tasksReducer";
import {useDispatch} from "react-redux";
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {RequestStatusType} from "../../../store/appReducer";
import {FilterValuesType} from "../../../API/todolist-api";

//TYPES
type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskDomainType>
    entityStatus: RequestStatusType
    removeTask: (taskId: string, todoListID: string) => void
    addTask: (task: string, todoListID: string) => void
    changeTaskStatus: (status: TaskStatuses, id: string, todoListID: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
    changeTaskTitle: (title: string, id: string, todoListID: string) => void
}

//COMPONENT
export const Todolist = React.memo((props: PropsType) => {
    console.log('Todolist rendering')

    let filteredTasks = props.tasks
    if (props.filter === 'active') filteredTasks = props.tasks.filter(t => t.status !== 2)
    if (props.filter === 'completed') filteredTasks = props.tasks.filter(t => t.status === 2)

    return <div>
        <div className={s.title}>
            <IconButton aria-label="delete" size={"small"}
                        onClick={useCallback(() => {
                            props.removeTodoList(props.id)
                        }, [props.removeTodoList, props.id])}
                        disabled={props.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
            <EditableSpan title={props.title}
                          changeTitle={
                              useCallback((title) => {
                                  props.changeTodoListTitle(title, props.id)
                              }, [props.changeTodoListTitle, props.id])
                          }
                          disabled={props.entityStatus === 'loading'}/>
        </div>

        <div>
            <AddItemForm addItem={useCallback((title) => {
                props.addTask(title, props.id)
            }, [props.addTask, props.id])}
                         disabled={props.entityStatus === 'loading'}/>
        </div>

        <div className={s.buttons}>
            <Button
                size={"small"}
                onClick={useCallback(() => {
                    props.changeTodoListFilter("all", props.id)
                }, [props.changeTodoListFilter, props.id])}
                variant={"contained"}
                color={props.filter === "all" ? "secondary" : "primary"}>All</Button>
            <Button
                size={"small"}
                onClick={useCallback(() => {
                    props.changeTodoListFilter("active", props.id)
                }, [props.changeTodoListFilter, props.id])}
                variant={"contained"}
                color={props.filter === "active" ? "secondary" : "primary"}>Active</Button>
            <Button
                size={"small"}
                onClick={useCallback(() => {
                    props.changeTodoListFilter("completed", props.id)
                }, [props.changeTodoListFilter, props.id])}
                variant={"contained"}
                color={props.filter === "completed" ? "secondary" : "primary"}>Completed</Button>
        </div>
        <ul>
            {filteredTasks.map(task =>
                <Task
                    disabled={task.entityStatus === 'loading'}
                    key={task.id}
                    taskID={task.id}
                    taskTitle={task.title}
                    taskStatus={task.status}
                    todoListID={props.id}
                    removeTask={props.removeTask}
                    addTask={props.addTask}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}/>)}
        </ul>
    </div>
})

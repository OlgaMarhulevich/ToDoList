import React from 'react';
import {FilterValuesType, TaskType} from '../../App';
import {Button} from "../Button/Button";
import {Input} from "../Input/Input";
import s from './Todolist.module.css';
import {Checkbox} from "../Checkbox/Checkbox";
import {EditableSpan} from "../EditableSpan/EditableSpan";

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
            <Button title={'x'} callBack={() => props.removeTodoList(props.id)}/>
            <EditableSpan title={props.title} changeTitle={(title) => props.changeTodoListTitle(title, props.id)}/>
        </div>

        <div>
            <Input callback={(title) => props.addTask(title, props.id)}/>
        </div>

        <div className={s.buttons}>
            <Button filter={props.filter} title={'All'}
                    callBack={() => props.changeTodoListFilter("all", props.id)}/>
            <Button filter={props.filter} title={'Active'}
                    callBack={() => props.changeTodoListFilter("active", props.id)}/>
            <Button filter={props.filter} title={'Completed'}
                    callBack={() => props.changeTodoListFilter("completed", props.id)}/>
        </div>

        <ul>
            {props.tasks.map(task => {
                    const removeTask = () => { props.removeTask(task.id, props.id) }
                    return (
                        <li className={ task.isDone ? s.doneTask : '' } key={task.id}>
                            <Checkbox changeTaskStatus={(isDone) => props.changeTaskStatus(isDone, task.id, props.id)}
                                      isDone={task.isDone}/>
                            <EditableSpan title={task.title} changeTitle={(title) => props.changeTaskTitle(title, task.id, props.id)}/>
                            <Button title={'x'} callBack={removeTask}/>
                        </li>
                    )
                }
            )}
        </ul>
    </div>
}

import React from 'react';
import {FilterValuesType, TaskType} from '../../App';
import {Button} from "../Button/Button";
import {Input} from "../Input/Input";
import s from './Todolist.module.css';
import {Checkbox} from "../Checkbox/Checkbox";

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListID: string) => void
    addTask: (task: string, todoListID: string) => void
    updateTask: (id: string, todoListID: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
}


export function Todolist(props: PropsType) {

    return <div>
        <div className={s.title}>
            <Button title={'x'} callBack={() => props.removeTodoList(props.id)}/>
            <h3>{props.title}</h3>
        </div>

        <div>
            <Input callback={props.addTask} tdlID={props.id}/>
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
                            <Checkbox updateTask={(isDone) => props.updateTask(task.id, props.id)}
                                      isDone={task.isDone}/>
                            <span>{task.title}</span>
                            <Button title={'x'} callBack={removeTask}/>
                        </li>
                    )
                }
            )}
        </ul>
    </div>
}

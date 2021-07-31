import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import {Button} from "../Button/Button";
import s from './Input.module.css';

type InputPropsType = {
    callback: (task: string) => void
}

export const Input = (props: InputPropsType) => {

    let [newTask, setNewTask] = useState('');
    let [error, setError] = useState(false)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTask(event.currentTarget.value);
        setError(false)
    }
    const addTask = () => {
        if (newTask.trim()) {
            props.callback(newTask.trim())
            setNewTask('')
        } else {
            setError(true)
            setNewTask('')
        }
    }
    const onCtrlPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask()
        }
    }

    return (
        <div>
            <input className={ error ? `${s.input} ${s.errorBox}` : s.input } value={newTask} onChange={onChangeHandler} onKeyPress={onCtrlPress}/>
            <Button callBack={addTask} title={'+'}/>
            {error && <div className={s.errorTitle}>Title is required!</div>}
        </div>
    )
}
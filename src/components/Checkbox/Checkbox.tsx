import React from 'react';
import s from './Checkbox.module.css';

type CheckboxPropsType = {
    isDone: boolean
    updateTask: (isDone: boolean) => void
}

export const Checkbox = (props: CheckboxPropsType) => {

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.updateTask(e.currentTarget.checked)
    }

    return (
        <input type="checkbox" onChange={onChangeHandler} checked={props.isDone}/>
    )
}
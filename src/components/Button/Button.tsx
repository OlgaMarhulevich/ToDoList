import React from 'react';
import s from './Button.module.css';
import {FilterValuesType} from "../../App";

type ButtonPropsType = {
    callBack: () => void
    title: string
    filter?: FilterValuesType
}

export const Button = (props: ButtonPropsType) => {
    const btnClassName = (props.title.toLowerCase() === props.filter ? s.filter : '') + ' ' +
        (props.title === 'x' ? s.deleteBtn : '') + ' ' +
        (props.title === '+' ? s.addBtn : '')

    return (
        <button className={btnClassName} onClick={props.callBack}>{props.title}</button>
    )
}
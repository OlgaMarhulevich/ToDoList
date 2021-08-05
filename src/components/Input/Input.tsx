import {IconButton, TextField} from "@material-ui/core";
import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import {AddBox} from "@material-ui/icons";

type InputPropsType = {
    callback: (task: string) => void
}

export const Input = (props: InputPropsType) => {

    let [Title, setTitle] = useState('');
    let [error, setError] = useState(false)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
        setError(false)
    }
    const addTask = () => {
        if (Title.trim()) {
            props.callback(Title.trim())
            setTitle('')
        } else {
            setError(true)
            setTitle('')
        }
    }
    const onCtrlPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask()
        }
    }

    return (
        <div>
            <TextField
                size={"small"}
                id="standard-size-small"
                label="Title"
                variant="outlined"
                value={Title}
                onChange={onChangeHandler}
                onKeyPress={onCtrlPress}
                error={error}
                helperText={error && 'Title is required!'}
                style={{marginBottom: "10px"}}/>

            <IconButton
                size={"small"}
                onClick={addTask}
                aria-label="delete"
                color={"primary"}
                style={{margin: "5px"}}>
                <AddBox />
            </IconButton>
        </div>
    )
}
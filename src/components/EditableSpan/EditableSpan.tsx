/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan rendering')

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)

    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value), [])

    const onBlurHandler = useCallback(() => {
        setEditMode(false)
        props.changeTitle(title)
    }, [props.changeTitle, title])

    const onEnter = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") onBlurHandler()
    }, [onBlurHandler])

    return (
        <>
            {editMode ?
                <TextField
                    style={{width: "150px"}}
                    size={"small"}
                    id="standard-size-small"
                    label="Title"
                    autoFocus
                    onBlur={onBlurHandler}
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onEnter}/>
                :
                <span onDoubleClick={() => setEditMode(true)}>{props.title}</span>
            }
        </>
    )
})
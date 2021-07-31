import React, {useState} from "react";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onBlurHandler = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onBlurHandler()
        }
    }

    return (
        <>
            {editMode ?
                <input
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
}
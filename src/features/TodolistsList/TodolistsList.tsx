import React from "react";
import {AppStateType} from "../../store/store";
import {addTaskTC, changeTaskStatusTC, changeTaskTitleTC, removeTaskTC, TasksStateType} from "../../store/tasksReducer";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {
    addTodoListTC, changeTodoListFilterAC,
    changeTodoListTitleTC,
    getTodoListsTC,
    removeTodoListTC,
} from "../../store/todoListsReducer";
import {TaskStatuses} from "../../API/tasks-api";
import {useDispatch, useSelector} from "react-redux";
import {Todolist} from "./Todolist/Todolist";
import {useCallback, useEffect} from "react";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Redirect} from "react-router-dom";
import {FilterValuesType, TodoListDomainType} from "../../API/todolist-api";

type TodoListListPropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<TodoListListPropsType> = ({demo = false}) => {
    //useSelector
    const todoLists = useSelector<AppStateType, Array<TodoListDomainType>>(state => state.todoLists)
    const tasks = useSelector<AppStateType, TasksStateType>(state => state.tasks)
    const isLogged = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    //useDispatch
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isLogged || demo) return
        dispatch(getTodoListsTC())
    }, [])

    //TASKS callbacks
    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskTC(todoListID, title))
    }, [dispatch])
    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskTC(todoListID, taskID))
    }, [dispatch])
    const changeTaskStatus = useCallback((status: TaskStatuses, taskID: string, todoListID: string) => {
        dispatch(changeTaskStatusTC(todoListID, taskID, status))
    }, [dispatch])
    const changeTaskTitle = useCallback((title: string, taskID: string, todoListID: string) => {
        dispatch(changeTaskTitleTC(todoListID, taskID, title))
    }, [dispatch])

    //TODOLISTS callbacks
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])
    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(removeTodoListTC(todoListID))
    }, [dispatch])
    const changeTodoListFilter = useCallback((filter: FilterValuesType, todoListID: string) => {
        dispatch(changeTodoListFilterAC({filter: filter, todoListID: todoListID}))
    }, [dispatch])
    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        dispatch(changeTodoListTitleTC(todoListID, title))
    }, [dispatch])

    if(!isLogged) return <Redirect to={'/login'}/>

    return (
        <>
            <Grid container className={"addTdlGrid"}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={5} className={"tdlsGrid"}>
                { todoLists.map(todo =>
                    <Grid item key={todo.id}>
                        <Paper elevation={5} className={"tdl"}>
                            <Todolist
                                entityStatus={todo.entityStatus}
                                key={todo.id}
                                id={todo.id}
                                title={todo.title}
                                filter={todo.filter}
                                tasks={tasks[todo.id]}
                                removeTask={removeTask}
                                addTask={addTask}
                                changeTaskStatus={changeTaskStatus}
                                changeTodoListFilter={changeTodoListFilter}
                                removeTodoList={removeTodoList}
                                changeTodoListTitle={changeTodoListTitle}
                                changeTaskTitle={changeTaskTitle}/>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </>
    )
}

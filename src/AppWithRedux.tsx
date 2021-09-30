import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './components/Todolist/Todolist';
import {Input} from "./components/Input/Input";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./store/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasksReducer";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, FilterValuesType,
    removeTodoListAC, TodoListDomainType
} from "./store/todoListsReducer";
import {todolistAPI} from "./API/todolist-api";
import {TaskStatuses, TaskType} from './API/tasks-api';

//TYPES
export type TasksStateType = {
    [id: string]: Array<TaskType>
}

//COMPONENT
function AppWithRedux() {
    //useSelector
    const todoLists = useSelector<AppStateType, Array<TodoListDomainType>>(state => state.todoLists)
    const tasks = useSelector<AppStateType, TasksStateType>(state => state.tasks)
    //useDispatch
    const dispatch = useDispatch()

    useEffect(() => {
        //todolistAPI.getTodos().then(res => dispatch())
    }, [])

    //TASKS functions
    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskAC(todoListID, title))
    }, [dispatch])
    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(todoListID, taskID))
    }, [dispatch])
    const changeTaskStatus = useCallback((status: TaskStatuses, taskID: string, todoListID: string) => {
        dispatch(changeTaskStatusAC(todoListID, taskID, status))
    }, [dispatch])
    const changeTaskTitle = useCallback((title: string, taskID: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(todoListID, taskID, title))
    }, [dispatch])

    //TODOLISTS functions
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title))
    }, [dispatch])
    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(removeTodoListAC(todoListID))
    }, [dispatch])
    const changeTodoListFilter = useCallback((filter: FilterValuesType, todoListID: string) => {
        dispatch(changeTodoListFilterAC(filter, todoListID))
    }, [dispatch])
    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        dispatch(changeTodoListTitleAC(title, todoListID))
    }, [dispatch])

    //map TodoList
    const tdlComponents = todoLists.map(tdl =>
        <Grid item key={tdl.id}>
            <Paper elevation={5} className={"tdl"}>
                <Todolist
                    key={tdl.id}
                    id={tdl.id}
                    title={tdl.title}
                    filter={tdl.filter}
                    tasks={tasks[tdl.id]}
                    removeTask={removeTask}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    changeTodoListFilter={changeTodoListFilter}
                    removeTodoList={removeTodoList}
                    changeTodoListTitle={changeTodoListTitle}
                    changeTaskTitle={changeTaskTitle}/>
            </Paper>
        </Grid>
    )

    //JSX
    return (
        <>
            <AppBar position="static">
                <Toolbar className={"appBar"}>
                    <IconButton color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button variant="outlined" color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container className={"addTdlGrid"}>
                    <Input addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5} className={"tdlsGrid"}>
                    { tdlComponents }
                </Grid>
            </Container>
        </>
    )
}

export default AppWithRedux;
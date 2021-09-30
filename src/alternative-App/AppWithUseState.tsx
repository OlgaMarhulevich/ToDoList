export function foo () {}

// import React, {useState} from 'react';
// import '../App.css';
// import {Todolist} from '../components/Todolist/Todolist';
// import {v1} from 'uuid';
// import {Input} from "../components/Input/Input";
// import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
// import {Menu} from "@material-ui/icons";
//
// type FilterValuesType = "all" | "active" | "completed";
//
// type TodoListType = {
//     id: string,
//     title: string,
//     filter: FilterValuesType,
// }
//
// type TasksStateType = {
//     [id: string]: Array<TaskType>
// }
//
// type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }
//
// export function AppWithUseState() {
//     const todoListID_1 = v1()
//     const todoListID_2 = v1()
//
//     let [todoLists, setTodoList] = useState<TodoListType[]>([
//         {id: todoListID_1, title: 'What to learn?', filter: 'all'},
//         {id: todoListID_2, title: 'What to buy?', filter: 'all'},
//     ])
//
//     let [tasks, setTasks] = useState<TasksStateType>({
//         [todoListID_1]: [
//             {id: v1(), title: "HTML&CSS", isDone: true},
//             {id: v1(), title: "JS", isDone: true},
//             {id: v1(), title: "ReactJS", isDone: false},
//             {id: v1(), title: "Rest API", isDone: false},
//             {id: v1(), title: "GraphQL", isDone: false}
//         ],
//         [todoListID_2]: [
//             {id: v1(), title: "Bear", isDone: false},
//             {id: v1(), title: "Milk", isDone: false}
//         ]
//     })
//
//     const addTask = (task: string, todoListID: string) => {
//         const newTask = {id: v1(), title: task, isDone: false};
//         tasks[todoListID] = [newTask, ...tasks[todoListID]]
//         setTasks({...tasks});
//     }
//     const removeTask = (id: string, todoListID: string) => {
//         tasks[todoListID] = tasks[todoListID].filter(task => task.id !== id);
//         setTasks({...tasks});
//     }
//     const changeTaskStatus = (isDone: boolean, taskID: string, todoListID: string) => {
//         tasks[todoListID] = tasks[todoListID]
//             .map(t => t.id === taskID ? {...t, isDone} : t)
//         setTasks({...tasks})
//     }
//     const changeTaskTitle = (title: string, taskID: string, todoListID: string) => {
//         tasks[todoListID] = tasks[todoListID]
//             .map(t => t.id === taskID ? {...t, title} : t)
//         setTasks({...tasks})
//     }
//
//     const addTodoList = (title: string) => {
//         const todoListID = v1()
//         const newTodoList = {id: todoListID, title: title, filter: 'all'} as TodoListType
//         setTodoList([...todoLists, newTodoList])
//         setTasks({...tasks, [todoListID]: []})
//     }
//     const removeTodoList = (todoListID: string) => {
//         todoLists = todoLists.filter(tdl => tdl.id !== todoListID)
//         setTodoList([...todoLists])
//         delete tasks[todoListID]
//     }
//     const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
//         todoLists = todoLists
//             .map(tdl => tdl.id === todoListID ? {...tdl, filter} : tdl)
//         setTodoList([...todoLists])
//     }
//     const changeTodoListTitle = (title: string, todoListID: string) => {
//         todoLists = todoLists.map(tdl => tdl.id === todoListID ? {...tdl, title} : tdl)
//         setTodoList([...todoLists])
//     }
//
//     const getTasksForTodoList = (tdl: TodoListType) => {
//         switch (tdl.filter) {
//             case 'active':
//                 return tasks[tdl.id].filter(t => !t.isDone)
//             case 'completed':
//                 return tasks[tdl.id].filter(t => t.isDone)
//             default:
//                 return tasks[tdl.id]
//         }
//     }
//
//     const tdlComponents = todoLists.map(tdl =>
//         <Grid item key={tdl.id}>
//             <Paper elevation={5} className={"tdl"}>
//                 <Todolist
//                     key={tdl.id}
//                     id={tdl.id}
//                     title={tdl.title}
//                     filter={tdl.filter}
//                     tasks={getTasksForTodoList(tdl)}
//                     removeTask={removeTask}
//                     addTask={addTask}
//                     changeTaskStatus={changeTaskStatus}
//                     changeTodoListFilter={changeTodoListFilter}
//                     removeTodoList={removeTodoList}
//                     changeTodoListTitle={changeTodoListTitle}
//                     changeTaskTitle={changeTaskTitle}/>
//             </Paper>
//         </Grid>
//         )
//
//     return (
//         <>
//             <AppBar position="static">
//                 <Toolbar className={"appBar"}>
//                     <IconButton color="inherit" aria-label="menu">
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant="h6">
//                         TodoLists
//                     </Typography>
//                     <Button variant="outlined" color={"inherit"}>Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed>
//                 <Grid container className={"addTdlGrid"}>
//                     <Input addItem={addTodoList}/>
//                 </Grid>
//                 <Grid container spacing={5} className={"tdlsGrid"}>
//                     { tdlComponents }
//                 </Grid>
//             </Container>
//         </>
//     )
// }
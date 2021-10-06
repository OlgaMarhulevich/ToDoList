import React, {useEffect} from 'react';
import './App.css'
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {Alert, Progress} from "antd";
import 'antd/dist/antd.css';
import {useSelector} from "react-redux";
import {RequestStatusType} from "../store/appReducer";
import {AppStateType} from "../store/store";

function App() {
    const status = useSelector<AppStateType, RequestStatusType>(state => state.app.status)
    const error = useSelector<AppStateType, string | null>(state => state.app.error)

    return <>
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
            <div style={{width: '110%', marginLeft: '-5%'}}>
                <Progress
                    strokeColor={{
                        '0%': '#ff006a',
                        '100%': '#00ffb1',
                    }}
                    style={status === 'loading' ? {opacity: 1} : {opacity: 0}}
                    percent={100}
                    status={"active"}
                    showInfo={false}/>
            </div>
        </AppBar>
        <Container fixed>
            <TodolistsList/>
        </Container>
        <div className={'errorBar'}>
            { error && <Alert message={'Error: ' + error} type="error" showIcon closable/>}
        </div>
    </>
}

export default App;

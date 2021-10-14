import React, {useEffect} from 'react';
import './App.css'
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {Alert, Progress} from "antd";
import 'antd/dist/antd.css';
import {useDispatch, useSelector} from "react-redux";
import {RequestStatusType} from "../store/appReducer";
import {AppStateType} from "../store/store";
import {Redirect, Route, Switch} from "react-router-dom";
import {Login} from "../features/Login/Login";
import Header from "../features/Header/Header";
import {initializeAppTC} from "../store/authReducer";
import { Spin } from 'antd';

function App() {
    const error = useSelector<AppStateType, string | null>(state => state.app.error)
    const isInitialized = useSelector<AppStateType, boolean>(state => state.app.isInitialized)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Spin size={"large"}/></div>
    }

    return <>
        <Header/>

        <Container fixed>
            <Switch>
                <Route exact path={'/'} render={() => <TodolistsList/>}/>
                <Route path={'/login'} render={() => <Login/>}/>
                <Route path={'/404'} render={() => <div style={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', marginTop: '100px'}}><h1>404: PAGE NOT FOUND</h1></div>}/>
                <Redirect to={'/404'}/>
            </Switch>
        </Container>

        <div className={'errorBar'}>
            { error && <Alert message={'Error: ' + error} type="error" showIcon closable/>}
        </div>
    </>
}

export default App;

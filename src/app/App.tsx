import React from 'react';
import './App.css'
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

function App() {
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
            </AppBar>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </>
}

export default App;
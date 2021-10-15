import React from 'react';
import {Progress} from "antd";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {RequestStatusType} from "../../store/appReducer";
import {Redirect} from "react-router-dom";
import {logoutTC} from "../../store/authReducer";

function Header() {
    const status = useSelector<AppStateType, RequestStatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    return <>
        <AppBar position="static">
            <Toolbar className={"appBar"}>
                <Typography color={'inherit'} variant="h6">
                    TodoLists
                </Typography>
                <Button
                    variant="outlined"
                    color={"inherit"}
                    style={{backgroundColor: 'rgba(255,255,255,0.11)'}}
                    onClick={() => { if (isLoggedIn) dispatch(logoutTC()) }}>
                    {isLoggedIn ? 'Log out' : 'Log in'}
                </Button>
            </Toolbar>
            <div style={{width: '110%', marginLeft: '-5%'}}>
                <Progress
                    strokeColor={{
                        '0%': '#f40057',
                        '100%': '#00ffb1',
                    }}
                    style={status === 'loading' ? {opacity: 1} : {opacity: 0}}
                    percent={100}
                    status={"active"}
                    showInfo={false}/>
            </div>
        </AppBar>
    </>
}

export default Header;

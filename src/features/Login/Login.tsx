import FormControl from '@material-ui/core/FormControl/FormControl'
import FormGroup from '@material-ui/core/FormGroup/FormGroup'
import FormLabel from '@material-ui/core/FormLabel/FormLabel'
import React from 'react'
import {Button, Checkbox, FormControlLabel, Grid, TextField} from "@material-ui/core";
import s from './Login.module.css'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../store/authReducer";
import {AppStateType} from "../../store/store";
import {Redirect} from "react-router-dom";

export const Login = () => {
    const dispatch = useDispatch()
    const isLogged = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)

    type FormikErrorsType = {
        email?: string
        password?: string
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: values => {
          const errors: FormikErrorsType = {}
            if (!values.email) {
                errors.email = 'Email is required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (values.password.length < 3) {
                errors.password = 'Password should be more than 2 characters'
            }
            return errors
        },
        onSubmit: values => {
            formik.resetForm()
            dispatch(loginTC(values))
        }
    })

    if(isLogged) return <Redirect to={'/'}/>

    return <div className={s.container}>
        <form onSubmit={formik.handleSubmit}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>

                <FormGroup>
                    <TextField
                        label="Email"
                        margin="normal"
                        { ...formik.getFieldProps('email') }
                        onBlur={formik.handleBlur}
                    />
                    { formik.touched.email && formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div> }
                    <TextField
                        type="password"
                        label="Password"
                        margin="normal"
                        { ...formik.getFieldProps('password') }
                        onBlur={formik.handleBlur}
                    />
                    { formik.touched.password && formik.errors.password && <div style={{color: 'red'}}>{formik.errors.password}</div> }
                    <FormControlLabel
                        label={'Remember me'}
                        control={
                            <Checkbox
                                { ...formik.getFieldProps('rememberMe') }
                            />
                        }/>
                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                        Login
                    </Button>
                </FormGroup>
            </FormControl>
        </form>
        </div>
}

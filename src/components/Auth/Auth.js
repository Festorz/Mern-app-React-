import {React, useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import  LockOpenOutlinedIcon  from '@material-ui/icons/LockOpenOutlined'
import useStyles from './styles-auth'
import Input from './input'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import {signIn, signUp} from '../../actions/auth'

const initialState = {firstName:'', lastName:'', email:'', password:'', confirmPassword:''}

export const Auth = () => {
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const [isSignUp, setIsSignUp] = useState(false)

    const classes = useStyles()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            dispatch(signUp(formData, navigate))
        } else {
            dispatch(signIn(formData, navigate))
            
        }
        
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleShowPass = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }
    
    const SwitchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
        setShowPassword(false)
    }
    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOpenOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half/>
                                <Input name='lastName' label='Last Name' handleChange={handleChange}  half/>
                                 </>
                            )
                        }
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email'/>
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPass} />
                        {isSignUp &&
                        <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type='password' />   
                        }
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={SwitchMode}>
                            {isSignUp ? 'Already have an account? Sign in' :"Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
export default Auth;

import {React, useState, useEffect} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core'
import useStyles from './style-navbar'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'

import instaverse from '../../images/g.png'

export const Navbar = () => {
    const classes = useStyles()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch =useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const token = user?.token

        // JWT
        if (token) {
            const decodedToken = decode(token)

            if(decodedToken.exp * 1000 < new Date().getTime()) logout()
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])
    // const user = null;

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        
        navigate('/auth')
        setUser(null)
    }
    return (
        <AppBar className={classes.appBar} position="static"  color="inherit" >
            <div className={classes.broadContainer}>
            <Typography className={classes.heading} component={Link} to="/" variant="h2" align="center">Instaverse</Typography>
            <img className={classes.image} src={instaverse} alt='instaverse' height="60"/>
            </div>   
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>  
                        <Button variant='contained' className={ classes.logout} onClick={logout} color='secondary'>Logout</Button>
                    </div>
                ) : (
                        <Button component={Link} to="/auth" variant='contained' color='primary'>Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

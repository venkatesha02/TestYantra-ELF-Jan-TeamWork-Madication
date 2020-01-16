import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
//import Container from '@material-ui/core/Container';
import UserContext from '../../context/userAuthentication';
import Axios from 'axios';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright Â© '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn(props) {
    const classes = useStyles();

    const context = useContext(UserContext)

    const [isValid, setIsValid] = useState(false)

    const [userEmail, setUserEmail] = useState('')
    const [userPass, setUserPass] = useState('')

    const [userEmailErr, setUserEmailErr] = useState({ eErr: true, emailErr: '' })
    const [userPassErr, setUserPassErr] = useState({ pErr: true, passErr: '' })


    const isTrue = (event) => {
        event.preventDefault()
        if (!userEmailErr.eErr && !userPassErr.pErr) {

            console.log(userEmail)
            console.log(userPass)
            authenticate()
        }
        else {
            if (!userEmail) {
                setUserEmailErr({
                    ...userEmailErr,
                    emailErr: `Email Address Required`
                })
            }
            if (!userPass) {
                setUserPassErr({
                    ...userPassErr,
                    passErr: `Password Required`
                })
            }
        }
    }


    const validForm = (event) => {

        if (event.target.name === 'userEmail') {
            if (userEmail.trim().match(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)) {
                setUserEmailErr({
                    ...userEmailErr,
                    emailErr: '',
                    eErr: false
                })

            }
            else {
                setUserEmailErr({
                    ...userEmailErr,
                    emailErr: 'Invalid!. Email format should be  ex: example@xxx.xxx',
                    eErr: true
                })
            }
            if (userEmail === '') {
                setUserEmailErr({
                    ...userEmailErr,
                    eErr: true,
                    emailErr: `Email Address Can't blank`
                })
            }
        }

        if (event.target.name === 'userPass') {

            if (userPass !== "" && userPass.length >= 5) {
                setUserPassErr({
                    ...userPassErr,
                    passErr: '',
                    pErr: false
                })
            }
            else {
                setUserPassErr({
                    ...userPassErr,
                    pErr: true,
                    passErr: 'Password Should be 5 character'
                })
            }
            if (userPass === '') {
                setUserPassErr({
                    ...userPassErr,
                    passErr: `Password Can't be blank`,
                    pErr: true
                })
            }
        }
        return sedCorr()

    }

    let sedCorr = async () => {
        if (userEmailErr !== true && userPassErr !== true) {
            return true

        }
    }

    const valid = {
        userEmail: userEmail,
        userPass: userPass
    }

    const authenticate = async () => {

        const url = 'https://react-medical-app.firebaseio.com/addUser.json'
        try {

            const response = await Axios.get(url)

            for (let key in response.data) {
                let account = response.data[key]
                let auth = valid

                if (auth.userEmail === account.userEmail && auth.userPass === account.userPass) {

                    localStorage.setItem('email', account.userEmail)
                    localStorage.setItem('name', account.userName)
                    localStorage.setItem('mobile', account.userMobile)
                    localStorage.setItem('gen', account.gender)

                    localStorage.setItem('status', true)
                    localStorage.setItem('id', account.userMobile)

                    props.history.push('/')
                    context.setUser(true)
                    context.setLogin(true)

                }
                else {
                    //alert('Invalid User Name / Password')
                    setIsValid(true)
                }
            }

        } catch (err) {
            console.log("Erroo ", err)
        }

    }

    return (
        <>
            {/* <Container component="main" maxWidth="xs"> */}
            <CssBaseline />

            <div className='col-md-4 mt-3 offset-4 card card-body'>
                <div className={classes.paper}>

                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    <Grid xs={12}>

                        {isValid ?
                            <p className="card-text text-center" style={{ color: 'red' }}>
                                Invalid Email or Password!!</p> : null}

                        <form className={classes.form} onSubmit={isTrue} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Email Address"
                                name='userEmail'
                                autoComplete="userEmail"
                                autoFocus
                                onKeyUp={(e) => validForm(e)}
                                value={userEmail}
                                onChange={(e) => { setUserEmail(e.target.value) }}
                            />
                            <p style={{ color: 'red', fontSize: '12px' }}>{userEmailErr.emailErr}</p>

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="userPass"
                                label="Password"
                                type="password"
                                onKeyUp={(e) => validForm(e)}
                                value={userPass}
                                onChange={(e) => { setUserPass(e.target.value) }}
                                autoComplete="password"
                            />
                            <p style={{ color: 'red', fontSize: '12px' }}>{userPassErr.passErr}</p>

                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}>
                                Sign In
                    </Button>


                            <Grid container>
                                <Grid item xs>
                                    <Link variant="body2" style={{ cursor: "pointer", color: 'blue' }}>
                                        Forgot Password?
                            </Link>
                                </Grid>
                                <Grid item xs>
                                    <Link variant="body2" style={{ cursor: "pointer" }} onClick={() => props.history.push("/createaccount")}>
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </div>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
            {/* </Container> */}
        </>
    );
}

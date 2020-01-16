import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
//import Container from '@material-ui/core/Container';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { FormLabel, Checkbox } from '@material-ui/core';
import Axios from 'axios';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright '}
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
        marginTop: theme.spacing(4),
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

export default function SignUp(props) {

    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userMobile, setUserMobile] = useState('')
    const [userPass, setUserPass] = useState('')
    const [conPass, setConPass] = useState('')
    const [gender, setGender] = useState('')

    const [userNameErr, setUserNameErr] = useState({ nErr: true, nameErr: '' })
    const [userMobileErr, setUserMobileErr] = useState({ mErr: true, mobileErr: '' })
    const [genderErr, setGenderErr] = useState({ gErr: true, genErr: '' })
    const [userEmailErr, setUserEmailErr] = useState({ eErr: true, emailErr: '' })
    const [userPassErr, setUserPassErr] = useState({ pErr: true, passErr: '' })
    const [conPassErr, setConPassErr] = useState({ cpErr: true, conPassErr: '' })


    const data = {
        userName: userName,
        userEmail: userEmail,
        userMobile: userMobile,
        userPass: userPass,
        gender: gender
    }

    const handleSubmit = async () => {

        const formData = data

        const url = 'https://react-medical-app.firebaseio.com/addUser.json'
        try {
            let response = await Axios.post(url, formData)//it is a api call it returns a promise

            if (response.status === 200) {
                props.history.push('/login')

            }
        }
        catch (err) {
            console.log("Error ", err)
        }
    }

    let istrue = (event) => {
        event.preventDefault()
        if (!userNameErr.nErr && !userEmailErr.eErr && !userMobileErr.mErr && !userPassErr.pErr && !conPassErr.cpErr && !genderErr.gErr) {
            // console.log(userName)
            // console.log(userEmail)
            // console.log(userMobile)
            // console.log(userPass)
            // console.log(conPass)
            // console.log(gender)
            alert('Ok');
            handleSubmit()
        }
        else {
            if (!userName) {
                setUserNameErr({
                    ...userNameErr,
                    nameErr: `Name Can't be Blank `
                })
            }

            if (!userEmail) {
                setUserEmailErr({
                    ...userEmailErr,
                    emailErr: `Email Address Can't blank`
                })
            }
            if (!userMobile) {
                setUserMobileErr({
                    ...userMobileErr,
                    mobileErr: `Mobile Number Can't blank`
                })
            }

            if (!userPass) {
                setUserPassErr({
                    ...userPassErr,
                    passErr: `Password Can't be blank`
                })
            }

            if (!conPass) {
                setConPassErr({
                    ...conPassErr,
                    conPassErr: `Confirm Password can't be blank`
                })
            }

            if (!gender) {
                setGenderErr({
                    ...genderErr,
                    genErr: `Select Gender`
                })
            }
            else {
                setGenderErr({
                    ...genderErr,
                    genErr: '',
                    gErr: false
                })
            }


        }
    }

    const validForm = (event) => {

        if (event.target.name === 'userName') {

            if (userName.trim().match(/^[a-zA-Z ]*$/) && userName !== '') {
                setUserNameErr({
                    ...userNameErr,
                    nameErr: '',
                    nErr: false
                })
            }
            else {
                setUserNameErr({
                    ...userNameErr,
                    nameErr: 'Name should be Character',
                    nErr: true
                })

            }
            if (userName === '') {
                setUserNameErr({
                    ...userNameErr,
                    nErr: true,
                    nameErr: `Name Can't blank`
                })
            }

        }

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

        if (event.target.name === 'userMobile') {

            if (userMobile.trim().match(/^[0-9]{10}$/) && userMobile !== '') {
                setUserMobileErr({
                    ...userMobileErr,
                    mobileErr: '',
                    mErr: false
                })
            }
            else {
                setUserMobileErr({
                    ...userMobileErr,
                    mobileErr: 'Mobile Number contains only 10 digits',
                    mErr: true
                })
            }
            if (userMobile === '') {
                setUserMobileErr({
                    ...userMobileErr,
                    mobileErr: `Mobile Number Can't blank`,
                    mErr: true
                })
            }
        }

        if (event.target.name === 'userPass') {

            if (userPass.match(/^.*(?=.{5,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/) && userPass !== "") {
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
                    passErr: 'Password minimum 5 character and it Contain atleast 1 Uppercase, 1 Lowercase,1 special character, 1 Number'
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

        if (event.target.name === 'conPass') {

            if (userPass === conPass && conPass !== '') {
                setConPassErr({
                    ...userPassErr,
                    cpErr: false,
                    conPassErr: ''
                })
            }
            else {
                setConPassErr({
                    ...userPassErr,
                    cpErr: true,
                    conPassErr: 'Password should be match'
                })
            }
            if (conPass === '') {
                setConPassErr({
                    ...userPassErr,
                    cpErr: true,
                    conPassErr: `Password can't be blank`
                })
            }
        }

        if (event.target.name === 'gender') {
            console.log(event.target)
            if (gender !== '') {
                setGenderErr({
                    ...genderErr,
                    genErr: '',
                    gErr: false
                })
            }
            // else {
            //     setGenderErr({
            //         ...genderErr,
            //         genErr: 'Select 1 Gender',
            //         gErr: true
            //     })
            // }
            // if (gender === '') {
            //     setGenderErr({
            //         ...genderErr,
            //         genErr: 'Please Select any',
            //         gErr: true
            //     })
            // }

        }
        return sedCorr()

    }

    let sedCorr = async () => {
        if (userNameErr !== true && userEmailErr !== true && userMobileErr !== true && userPassErr !== true && genderErr !== true && conPassErr !== true) {
            return true
        }
    }

    const classes = useStyles();
    return (
        <>
            {/* <Container component="main" maxWidth="xs"> */}
            <CssBaseline />
            <div className="col-md-6 offset-3 mt-3 card card-body">
                <div className={classes.paper}>

                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>

                    <Grid md={12}>
                        <form onSubmit={istrue} className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        name="userName"
                                        autoComplete="fname"
                                        //variant="outlined"
                                        required
                                        fullWidth
                                        label="User Name"
                                        autoFocus
                                        value={userName}
                                        onKeyUp={(e) => validForm(e)}
                                        onChange={(e) => { setUserName(e.target.value) }}
                                    />
                                    <p style={{ color: 'red', fontSize: '12px' }}>{userNameErr.nameErr}</p>

                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name='userEmail'
                                        autoComplete="userEmail"
                                        //variant="outlined"
                                        required
                                        fullWidth
                                        label="Email Address"
                                        //autoFocus
                                        onKeyUp={(e) => validForm(e)}
                                        value={userEmail}
                                        onChange={(e) => { setUserEmail(e.target.value) }}
                                    />
                                    <p style={{ color: 'red', fontSize: '12px' }}>{userEmailErr.emailErr}</p>

                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        //variant="outlined"
                                        required
                                        fullWidth
                                        name='userMobile'
                                        label="Phone Number"
                                        autoComplete="-phone-number"
                                        maxLength='10'
                                        onKeyUp={(e) => validForm(e)}
                                        value={userMobile}
                                        onChange={(e) => { setUserMobile(e.target.value) }}
                                    />
                                    <p style={{ color: 'red', fontSize: '12px' }}>{userMobileErr.mobileErr}</p>

                                </Grid>

                                <Grid item xs={6}>
                                    <FormLabel component="legend">Gender</FormLabel>
                                    <RadioGroup aria-label="position" name="gender" row>
                                        <FormControlLabel value="Male" onChange={(e) => { setGender(e.target.value) }} control={<Radio />} label="Male" />
                                        <FormControlLabel value="Female" onChange={(e) => { setGender(e.target.value) }} control={<Radio />} label="Female" />
                                        <FormControlLabel value="Other" onChange={(e) => { setGender(e.target.value) }} control={<Radio />} label="Other" />
                                    </RadioGroup>
                                    <p style={{ color: 'red', fontSize: '12px' }}>{genderErr.genErr}</p>

                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        name='userPass'
                                        //variant="outlined"
                                        type="password"
                                        required
                                        fullWidth
                                        label="Password"
                                        autoComplete="current-password"
                                        onKeyUp={(e) => validForm(e)}
                                        value={userPass}
                                        onChange={(e) => { setUserPass(e.target.value) }}
                                    />
                                    <p style={{ color: 'red', fontSize: '12px' }}>{userPassErr.passErr}</p>

                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name='conPass'
                                        //variant="outlined"
                                        type="password"
                                        required
                                        fullWidth
                                        label="Confirm-Password"
                                        autoComplete="current-password"
                                        onKeyUp={(e) => validForm(e)}
                                        value={conPass}
                                        onChange={(e) => { setConPass(e.target.value) }}
                                    />
                                    <p style={{ color: 'red', fontSize: '12px' }}>{conPassErr.conPassErr}</p>
                                </Grid>

                                <Grid item xs={12}>

                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Terms and condition"
                                    />

                                </Grid>

                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            > Sign Up
                    </Button>

                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link variant="body2" style={{ cursor: "pointer" }} onClick={() => props.history.push("/login")}>
                                        <p style={{ color: 'blue' }}>Already have an account? Sign in</p>
                                    </Link>
                                </Grid>
                            </Grid>

                        </form>
                    </Grid>
                </div>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
            {/* </Container> */}
        </>
    );
}

import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles, CssBaseline, Button } from '@material-ui/core';

export default function AddressForm(props) {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [userMobile, setUserMobile] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [pin, setPin] = useState('')
  const [country, setCountry] = useState('')

  const [fnameErr, setFnameErr] = useState({ fErr: true, fnameErr: '' })
  const [lnameErr, setLnameErr] = useState({ lErr: true, lnameErr: '' })
  const [addressErr, setAddressErr] = useState({ aErr: true, addErr: '' })
  const [userMobileErr, setUserMobileErr] = useState({ mErr: true, mobileErr: '' })
  const [cityErr, setCityErr] = useState({ cErr: true, ctErr: '' })
  const [pinErr, setPinErr] = useState({ pErr: true, pinErr: '' })
  const [countryErr, setCountryErr] = useState({ cntErr: true, cntryErr: '' })

  let istrue = (event) => {
    event.preventDefault()
    //console.log(firstName)
    if (!fnameErr.fErr && !lnameErr.lErr && !addressErr.aErr && !userMobileErr.mErr && !cityErr.cErr && !pinErr.pErr && !countryErr.cntErr) {

      console.log(firstName)
      console.log(lastName)
      alert('Data Added');
    }
    else {
      if (!firstName) {
        setFnameErr({
          ...fnameErr,
          fnameErr: `First Name Required`
        })
      }

      if (!lastName) {
        setLnameErr({
          ...setFnameErr,
          lnameErr: `Last Name Required`
        })

      }
      if (!address1) {
        setAddressErr({
          ...setAddressErr,
          addErr: `Address Required`
        })

      }

      if (!userMobile) {
        setUserMobileErr({
          ...userMobileErr,
          mobileErr: `Mobile Number Required`,

        })
      }

      if (!city) {
        setCityErr({
          ...setCityErr,
          ctErr: `City Required`
        })

      }
      if (!pin) {
        setPinErr({
          ...setPinErr,
          pinErr: `Pin Required`
        })

      }

      if (!country) {
        setCountryErr({
          ...setCountryErr,
          cntryErr: `Country Required`
        })

      }

    }
  }
  const validForm = (event) => {

    if (event.target.name === 'firstName') {

      if (firstName.trim().match(/^[a-zA-Z ]*$/) && firstName !== '') {
        setFnameErr({
          ...setFnameErr,
          fnameErr: '',
          fErr: false
        })
      }
      else {
        setFnameErr({
          ...setFnameErr,
          fnameErr: 'First Name should be Character',
          fErr: true
        })

      }
      if (firstName === '') {
        setFnameErr({
          ...setFnameErr,
          fErr: true,
          fnameErr: `First Name Can't blank`
        })
      }
    }

    if (event.target.name === 'lastName') {

      if (lastName.trim().match(/^[a-zA-Z ]*$/) && lastName !== '') {
        setLnameErr({
          ...setLnameErr,
          lnameErr: '',
          lErr: false
        })
      }
      else {
        setLnameErr({
          ...setLnameErr,
          lnameErr: 'Last Name should be Character',
          lErr: true
        })
      }

      if (lastName === '') {
        setLnameErr({
          ...setLnameErr,
          lErr: true,
          lnameErr: `Last Name Can't blank`
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
          mobileErr: 'Should be Number, only 10 digits',
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

    if (event.target.name === 'address1') {

      if (address1.trim().match(/^[a-zA-Z ]*$/) && address1 !== '') {
        setAddressErr({
          ...setAddressErr,
          addErr: '',
          aErr: false
        })
      }
      else {
        setAddressErr({
          ...setAddressErr,
          addErr: 'only Characters are Allowed',
          aErr: true
        })

      }
      if (address1 === '') {
        setAddressErr({
          ...setAddressErr,
          addErr: `Address field can't be blank`,
          aErr: true
        })
      }
    }


    if (event.target.name === 'city') {

      if (city.trim().match(/^[a-zA-Z ]*$/) && city !== '') {
        setCityErr({
          ...setCityErr,
          ctErr: '',
          cErr: false
        })
      }
      else {
        setCityErr({
          ...setCityErr,
          ctErr: 'City should be Character',
          cErr: true
        })

      }
      if (city === '') {
        setCityErr({
          ...setCityErr,
          cErr: true,
          ctErr: `City Can't blank`
        })
      }
    }

    if (event.target.name === 'pin') {

      if (pin.trim().match(/^[0-9]{6}$/) && pin !== '') {
        setPinErr({
          ...setPinErr,
          pErr: '',
          pinErr: false
        })
      }
      else {
        setPinErr({
          ...setPinErr,
          pinErr: 'Pin Should be 6 Digits',
          pErr: true
        })

      }
      if (pin === '') {
        setPinErr({
          ...setCityErr,
          pErr: true,
          pinErr: `Pin Can't blank`
        })
      }
    }

    if (event.target.name === 'country') {

      if (country.trim().match(/^[a-zA-Z ]*$/) && country !== '') {
        setCountryErr({
          ...setCountryErr,
          cntryErr: '',
          cntErr: false
        })
      }
      else {
        setCountryErr({
          ...setCountryErr,
          cntryErr: 'Country Should be Charater',
          cntErr: true
        })

      }
      if (country === '') {
        setCountryErr({
          ...setCountryErr,
          cntryErr: `Country Can't be Blank`,
          cntErr: true
        })
      }
    }
    return sedCorr()
  }

  let sedCorr = async () => {
    if (fnameErr !== true && lnameErr !== true && addressErr !== true && userMobileErr !== true && cityErr !== true && pinErr !== true && countryErr !== true) {
      return true
    }
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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <div className={classes.paper}>
        <div className='card mt-3 card-body col-md-6'>
          <h5 className='text-center p-4'>Shipping Address</h5>
          <Grid xs={12} >
            <form onSubmit={istrue} noValidate>
              <Grid container spacing={3}>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    name="firstName"
                    label="First name"
                    fullWidth
                    autoComplete="firstName"
                    value={firstName}
                    onKeyUp={(e) => validForm(e)}
                    onChange={(e) => { setFirstName(e.target.value) }}
                  />
                  <p style={{ color: 'red', fontSize: '12px' }}>{fnameErr.fnameErr}</p>

                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    name="lastName"
                    label="Last name"
                    fullWidth
                    autoComplete="lastName"
                    value={lastName}
                    onKeyUp={(e) => validForm(e)}
                    onChange={(e) => { setLastName(e.target.value) }}
                  />
                  <p style={{ color: 'red', fontSize: '12px' }}>{lnameErr.lnameErr}</p>

                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    name="address1"
                    label="Address line 1"
                    fullWidth
                    autoComplete="billing address-line1"
                    value={address1}
                    onKeyUp={(e) => validForm(e)}
                    onChange={(e) => { setAddress1(e.target.value) }}
                  />
                  <p style={{ color: 'red', fontSize: '12px' }}>{addressErr.addErr}</p>

                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="address2"
                    label="Address line 2"
                    fullWidth
                    autoComplete="billing address-line2"
                    value={address2}
                    onChange={(e) => { setAddress2(e.target.value) }}
                  />

                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
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

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="billing address-level2"
                    value={city}
                    onKeyUp={(e) => validForm(e)}
                    onChange={(e) => { setCity(e.target.value) }}
                  />
                  <p style={{ color: 'red', fontSize: '12px' }}>{cityErr.ctErr}</p>

                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    value={state}
                    onKeyUp={(e) => validForm(e)}
                    onChange={(e) => { setState(e.target.value) }}
                  />

                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    name="pin"
                    label="Zip / Postal code"
                    fullWidth
                    autoComplete="billing postal-code"
                    value={pin}
                    onKeyUp={(e) => validForm(e)}
                    onChange={(e) => { setPin(e.target.value) }}
                  />
                  <p style={{ color: 'red', fontSize: '12px' }}>{pinErr.pinErr}</p>

                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="billing country"
                    value={country}
                    onKeyUp={(e) => validForm(e)}
                    onChange={(e) => { setCountry(e.target.value) }}
                  />
                  <p style={{ color: 'red', fontSize: '12px' }}>{countryErr.cntryErr}</p>

                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Next
            </Button>

            </form>
          </Grid>
        </div>
      </div>
    </>
  );
}

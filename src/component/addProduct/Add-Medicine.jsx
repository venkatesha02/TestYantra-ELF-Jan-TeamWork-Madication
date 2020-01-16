import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
//import Container from '@material-ui/core/Container';
import { Checkbox, InputLabel, Select } from '@material-ui/core';
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

export default function SignUp(props) {

    const [productName, setProductName] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [productImage, setProductImage] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')


    const [productNameErr, setProductNameErr] = useState({ pnErr: true, pNameErr: '' })
    const [companyNameErr, setCompanyNameErr] = useState({ cErr: true, comErr: '' })
    const [quantityErr, setQuantityErr] = useState({ qErr: true, quaErr: '' })
    const [priceErr, setPriceErr] = useState({ pErr: true, priErr: '' })
    const [productImageErr, setProductImageErr] = useState({ piErr: true, proImgErr: '' })
    const [descriptionErr, setDescriptionErr] = useState({ dErr: true, disErr: '' })
    const [typeErr, setTypeErr] = useState({ tErr: true, typErr: '' })



    let istrue = (event) => {
        event.preventDefault()
        if (!productNameErr.pnErr && !priceErr.pErr && !companyNameErr.cErr && !productImageErr.piErr && !descriptionErr.dErr && !quantityErr.qErr && !typeErr.tErr) {

            handleSubmit()
            alert('Data Added');
        }
        else {
            if (!productName) {
                setProductNameErr({
                    ...productNameErr,
                    pNameErr: `Product Name Required`
                })
            }

            if (!companyName) {
                setCompanyNameErr({
                    ...companyNameErr,
                    comErr: `Company Name Required`
                })

            }
            if (!quantity) {
                setQuantityErr({
                    ...quantityErr,
                    quaErr: `Quantity Required`
                })

            }

            if (!type) {
                setTypeErr({
                    ...typeErr,
                    typErr: `Medicine Type Required`
                })

            }
            if (!price) {
                setPriceErr({
                    ...priceErr,
                    priErr: `Price Required`
                })

            }

            if (!description) {
                setDescriptionErr({
                    ...descriptionErr,
                    disErr: `Description Required`
                })

            }

            if (!productImage) {
                setProductImageErr({
                    ...productImageErr,
                    proImgErr: `Product Image URL Required`
                })

            }
            else {
                setProductImageErr({
                    ...productImageErr,
                    proImgErr: ``,
                    piErr: false
                })
            }


        }
    }

    const validForm = (event) => {

        if (event.target.name === 'productName') {

            if (productName.trim().match(/^[a-zA-Z ]*$/) && productName !== '') {
                setProductNameErr({
                    ...productNameErr,
                    pNameErr: '',
                    pnErr: false
                })
            }
            else {
                setProductNameErr({
                    ...productNameErr,
                    pNameErr: 'Product Name should be Character',
                    pnErr: true
                })

            }
            if (productName === '') {
                setProductNameErr({
                    ...productNameErr,
                    pnErr: true,
                    pNameErr: `Product Name Can't blank`
                })
            }

        }

        if (event.target.name === 'companyName') {

            if (companyName.trim().match(/^[a-zA-Z ]*$/)) {
                setCompanyNameErr({
                    ...companyNameErr,
                    comErr: '',
                    cErr: false
                })

            }
            else {
                setCompanyNameErr({
                    ...companyNameErr,
                    comErr: 'Company Name should be Character',
                    cErr: true
                })
            }
            if (companyName === '') {
                setCompanyNameErr({
                    ...companyNameErr,
                    cErr: true,
                    comErr: `Company Name Can't blank`
                })
            }
        }

        if (event.target.name === 'quantity') {

            if (quantity.trim().match(/^[0-9]*$/) && quantity !== '') {
                setQuantityErr({
                    ...quantityErr,
                    quaErr: '',
                    qErr: false
                })
            }
            else {
                setQuantityErr({
                    ...quantityErr,
                    quaErr: 'Quantity contains only digits',
                    qErr: true
                })
            }
            if (quantity === '') {
                setQuantityErr({
                    ...quantityErr,
                    quaErr: `Quantity Can't blank`,
                    qErr: true
                })
            }
        }

        if (event.target.name === 'type') {

            if (type !== '') {
                setTypeErr({
                    ...typeErr,
                    typErr: '',
                    tErr: false
                })
            }
            else {
                setTypeErr({
                    ...typeErr,
                    typErr: 'Please Select Medicine Type',
                    tErr: true
                })
            }
            if (type === '') {
                setTypeErr({
                    ...typeErr,
                    typErr: `Medicine Type Can't blank`,
                    tErr: true
                })
            }
        }


        if (event.target.name === 'price') {

            if (price.trim().match(/(\d+\.\d{1,2})/g) && price !== "") {
                setPriceErr({
                    ...priceErr,
                    priErr: '',
                    pErr: false
                })
            }
            else {
                setPriceErr({
                    ...priceErr,
                    priErr: 'Price Contains only digidts',
                    pErr: true,
                })
            }
            if (price === '') {
                setPriceErr({
                    ...priceErr,
                    priErr: `Price Can't be blank`,
                    pErr: true
                })
            }
        }

        if (event.target.name === 'productImage') {

            if (productImage !== '') {
                setProductImageErr({
                    ...productImageErr,
                    proImgErr: '',
                    piErr: false
                })
            }
            else {
                setProductImageErr({
                    ...productImageErr,
                    proImgErr: 'Image Should be jpeg/jpg/png/gif/bmp format ',
                    piErr: true
                })
            }
            if (productImage === '') {
                setProductImageErr({
                    ...productImageErr,
                    proImgErr: `Image can't be blank`,
                    piErr: true
                })
            }
        }

        if (event.target.name === 'description') {
            if (description !== '') {
                setDescriptionErr({
                    ...descriptionErr,
                    disErr: '',
                    dErr: false
                })
            }
            else {
                setDescriptionErr({
                    ...descriptionErr,
                    disErr: 'Provide Description',
                    dErr: true
                })
            }
            if (description === '') {
                setDescriptionErr({
                    ...descriptionErr,
                    disErr: `Description can't be blank`,
                    dErr: true
                })
            }

        }
        return sedCorr()

    }

    let sedCorr = async () => {
        if (productNameErr !== true && typeErr !== true && priceErr !== true && companyNameErr !== true && productImageErr !== true && quantityErr !== true && descriptionErr !== true) {
            return true
        }
    }


    const data = {
        productName: productName,
        companyName: companyName,
        quantity: quantity,
        price: price,
        productImage: productImage,
        description: description,
        type: type
    }

    const handleSubmit = async () => {

        const formData = data

        const url = 'https://react-medical-app.firebaseio.com/addmedicine.json'
        try {
            let response = await Axios.post(url, formData)//it is a api call it returns a promise

            if (response.status === 200) {
                setProductName('')
                setCompanyName('')
                setQuantity('')
                setPrice('')
                setProductImage('')
                setDescription('')
                setType('')

            }
        }
        catch (err) {
            console.log("Error ", err)
        }
    }

    const classes = useStyles();
    return (
        <>
            {/* <Container component="main" maxWidth="xs"> */}
                <CssBaseline />
                <div className={classes.paper}>
                <div className='card card-body col-md-6'>

                    <h1 className='text-center p-3'>Add Product</h1>
                    <Grid md={12} >

                        <form onSubmit={istrue} className={classes.form} noValidate>
                            <Grid container spacing={2}>

                                <Grid item xs={6}>
                                    <TextField
                                        name="productName"
                                        //variant="outlined"
                                        required
                                        fullWidth
                                        label="Product Name"
                                        autoFocus
                                        value={productName}
                                        onKeyUp={(e) => validForm(e)}
                                        onChange={(e) => { setProductName(e.target.value) }}
                                    />
                                    <p style={{ color: 'red', fontSize: '12px' }}>{productNameErr.pNameErr}</p>

                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name='companyName'
                                        autoComplete="companyName"
                                        //variant="outlined"
                                        required
                                        fullWidth
                                        label="Company Name"
                                        onKeyUp={(e) => validForm(e)}
                                        value={companyName}
                                        onChange={(e) => { setCompanyName(e.target.value) }}
                                    />
                                    <p style={{ color: 'red', fontSize: '12px' }}>{companyNameErr.comErr}</p>

                                </Grid>

                                <Grid item xs={6}>

                                    <InputLabel >Medicine Type</InputLabel>

                                    <Select
                                        native
                                        fullWidth
                                        name='type'
                                        //variant="outlined"
                                        onClick={(e) => validForm(e)}
                                        value={type}
                                        onChange={(e) => { setType(e.target.value) }}

                                    >
                                        {/* <option value='' disabled>Select Medicine Type</option> */}
                                        <option value='tablet' selected>Tablet</option>
                                        <option value='syrup'>Syrup</option>
                                        <option value='powder'>Powder</option>
                                    </Select>
                                    <p style={{ color: 'red', fontSize: '12px' }}>{typeErr.typErr}</p>

                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        //variant="outlined"
                                        required
                                        fullWidth
                                        name='quantity'
                                        label="No of Quantity"
                                        onKeyUp={(e) => validForm(e)}
                                        value={quantity}
                                        onChange={(e) => { setQuantity(e.target.value) }}
                                    />
                                    <p style={{ color: 'red', fontSize: '12px' }}>{quantityErr.quaErr}</p>

                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        name='price'
                                        //variant="outlined"
                                        required
                                        fullWidth
                                        label="Price"
                                        onKeyUp={(e) => validForm(e)}
                                        value={price}
                                        onChange={(e) => { setPrice(e.target.value) }}
                                    />
                                    <p style={{ color: 'red', fontSize: '12px' }}>{priceErr.priErr}</p>

                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        name='description'
                                        //variant="outlined"
                                        required
                                        fullWidth
                                        label="Description"
                                        onKeyUp={(e) => validForm(e)}
                                        value={description}
                                        onChange={(e) => { setDescription(e.target.value) }}
                                    />
                                    <p style={{ color: 'red', fontSize: '12px' }}>{descriptionErr.disErr}</p>

                                </Grid>


                                <Grid item xs={6}>
                                    {/* <FormLabel component="legend">Choose Product Image</FormLabel> */}
                                    <TextField
                                        name='productImage'
                                        // variant="outlined"
                                        type="text"
                                        required
                                        fullWidth
                                        label="Product Image"
                                        onKeyUp={(e) => validForm(e)}
                                        value={productImage}
                                        onChange={(e) => { setProductImage(e.target.value) }}
                                    />
                                    <p style={{ color: 'red', fontSize: '12px' }}>{productImageErr.proImgErr}</p>
                                </Grid>

                                <Grid item xs={6}>
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
                            > Add Product
                    </Button>

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

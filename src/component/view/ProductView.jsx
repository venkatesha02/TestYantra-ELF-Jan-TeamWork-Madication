import React, { Component } from 'react'
import Axios from 'axios'
import { Modal, Button } from 'react-bootstrap'

export default class ProductView extends Component {

    state = {
        account: [],
        productName: '',
        companyName: '',
        quantity: '',
        price: '',
        productImage:'',
        description:'',
        type:''
        
    }

    componentDidMount() {
        this.getAllAccounts()
    }

    handleClose = () => {
        this.setState({
            show: !this.state.show,
        })
    }

    handleShow = (accToEdit) => {
        //console.log('Account to be Edited ', accToEdit)
        this.setState({
            show: !this.state.show,
            ...accToEdit
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    };


    // Getting data from back-end using Axios api
    getAllAccounts = () => {
        const url = 'https://react-medical-app.firebaseio.com/addmedicine.json'
        Axios.get(url)
            .then((response) => {
                //console.log("Response ", response)
                let fetchedAccount = []
                for (let key in response.data) {
                    let account = response.data[key]
                    //console.log('Direct data ', account)

                    fetchedAccount.push({
                        ...account,
                        id: key
                    })

                    //console.log('ALl details', fetchedAccount)
                    this.setState({
                        account: fetchedAccount
                    })
                }

            })
            .catch((err) => {
                console.log("Erroo ", err)
            })
    }

    async deleteAccount(accToDelete) {

        const id = accToDelete.id;
        const url = 'https://react-medical-app.firebaseio.com/addmedicine/' + id + '/.json'

        try {
            const response = await Axios.delete(url)
            const myAccount = [...this.state.account]

            const index = myAccount.indexOf(accToDelete)

            myAccount.splice(index, 1)

            this.setState({
                account: myAccount
            })

        }
        catch (error) {
            console.log("Error ", error)

        }
    }

    saveData = async () => {
        console.log("State Data ", this.state)
        try {
            
           
            const { productName, companyName, quantity, price, productImage, description, type, id } = this.state

            const acctoUpdate = { productName, companyName, quantity, price, productImage, description, type}
            //console.log("sdgfjhgf ID",id)
            const url = `https://react-medical-app.firebaseio.com/addmedicine/${id}/.json`

            const response = await Axios.put(url, acctoUpdate)
            //console.log("response shfg ", response)

            if (response.status === 200) {
                this.handleClose()

                const data = this.state.account
                // solution 1
                data.map((val) => {
                    if (val.id === id) {
                       //console.log("Val ", val)

                        val.productName = productName
                        val.companyName = companyName
                        val.quantity = quantity
                        val.price = price
                        val.productImage=productImage
                        val.description=description
                        val.type=type
                        val.id = id
                        return val
                    }
                })
                this.setState({
                    show: false,
                    account: data
                })
            }
        }

        catch (err) {
            console.log("Error ", err)
        }
    }

    render() {
        return (
            <div className='table-responsive container-fluid'>
                <table className="table table-striped mt-5 table-hover table-bordered">
                    <thead className='thead-dark'>
                        <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Company Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Medicine Type</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.account.map(account => {
                            return (
                                <tr key={account.id}>
                                    <td>
                                        <img width='50px' height='50px' src={account.productImage} alt=""/>
                                    </td>
                                    <td>{account.productName}</td>
                                    <td>{account.companyName}</td>
                                    <td>{account.quantity}</td>
                                    <td>Rs {account.price}</td>
                                    <td>{account.description}</td>
                                    <td>{account.type}</td>
                                    <td><button className='btn-danger btn'
                                        onClick={() => { this.deleteAccount(account) }}>Delete</button></td>
                                    <td><button className='btn-success btn'
                                        onClick={() => this.handleShow(account)}>Edit</button></td>

                                </tr>
                            )
                        })}

                    </tbody>
                </table>
                <Modal show={this.state.show} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Updating Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='card card-body'>
                            <form onSubmit={this.saveData}>
                                <h3>Register Account</h3>

                                <label >Product Name</label>
                                <input name="productName"
                                    className="form-control" type="text"
                                    value={this.state.productName}
                                    placeholder="Enter Product name"
                                    onChange={this.handleChange} required />

                                <label >Company Name</label>
                                <input name="companyName"
                                    className="form-control" type="text"
                                    value={this.state.companyName}
                                    onChange={this.handleChange}
                                    placeholder="Enter Comapny Name" required />

                                <label >Quantity</label>
                                <input name="quantity"
                                    className="form-control" type="text"
                                    placeholder="Enter Quantity"
                                    value={this.state.quantity} required
                                    onChange={this.handleChange} />

                                <label >Price</label>
                                <input name="price"
                                    className="form-control" type="text"
                                    placeholder="Enter Price"
                                    onChange={this.handleChange}
                                    value={this.state.price} required />

                                    <label >Description</label>
                                <input name="description"
                                    className="form-control" type="text"
                                    placeholder="Enter Description"
                                    onChange={this.handleChange}
                                    value={this.state.description} required />

                                    <label >Product Image</label>
                                <input name="productImage"
                                    className="form-control" type="text"
                                    placeholder="Enter Product Image"
                                    onChange={this.handleChange}
                                    value={this.state.productImage} required />

                                    <label >Medicine Type</label>
                                <select name="type"
                                    className="form-control" 
                                    onChange={this.handleChange}
                                    value={this.state.type} required>
                                    <option>Tablet</option>
                                    <option>Syrup</option>
                                    <option>Powder</option>
                                    
                                    </select>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>Close</Button>
                        <Button variant="primary" onClick={() => this.saveData()}>Save Changes </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}

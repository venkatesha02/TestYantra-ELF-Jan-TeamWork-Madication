import React, { useEffect } from 'react'
import Axios from 'axios'
import { useState } from 'react'

export default function MyCart(props) {
    //const uniqId = localStorage.getItem('id')
    const mobile = localStorage.getItem('mobile')

    const [items, setItems] = useState({ allData: [] })

    useEffect(() => {

        getAllAccounts()

    }, [])

    // Getting data from server
    let getAllAccounts = async () => {

        const url = `https://react-medical-app.firebaseio.com/cartList-${mobile}.json`
        try {
            const response = await Axios.get(url)

            let fetchedAccount = []
            if (response.status === 200) {
                console.log(response)
                for (let key in response.data) {
                    let account = response.data[key]

                    fetchedAccount.push({
                        ...account,
                        id: key,
                        total:account.price
                        
                    })

                    setItems({
                        ...items.allData,
                        allData: fetchedAccount,
                    })

                    console.log('Data Added')
                }
            }
        }
        catch (err) {
            console.log("Erroo ", err)
        }
    }

    let qut = (qunt, val1) => {
        let all = items.allData
        all.map((val) => {
            if (val.id === val1.id) {
                return (val1.noq = qunt,
                    val1.total = qunt * val1.price)
            }
        })
        setItems({
            ...items.allData,
            allData: all
        })
    }


    let removeCart = async (val) => {

        const url = `https://react-medical-app.firebaseio.com/cartList-${mobile}/${val.id}.json`

        try {
            const response = await Axios.delete(url)
            if (response.status === 200) {

                const myAccount = [...items.allData]

                const index = myAccount.indexOf(val)
    
                myAccount.splice(index, 1)
    
                setItems({
                    allData:myAccount
                })
                
            } else {
                console.log("Err")
            }
        }
        catch (err) {
            console.log("Err", err)
        }
    }

    let rs = 0;
    let tc = 0;

    let handleClose = () => {

        items.allData.map((val) => {
            removeCart(val)
        })
        //props.history.push('/placeOrder')
    }

    let checkout =()=>{
        props.history.push("/checkout")
    }

    return (
        <>
            <div className='container' >
                <h6>My Cart ({items.allData.length})</h6>
                
                <div className='row'>
                    <div className='col-md-6 col-sm-8 col-12 mt-2 float-left'>
                        {items.allData.map((val) => {
                            return (
                                <>
                                    <div key={val.id} className='card mt-2'>
                                        <div className='card-body'>
                                            <div className='col-md-3 float-right'>
                                                <img className='card-img-top p-1' width='100%' height='120px' src={val.productImage} alt='' ></img>
                                            </div>
                                            <b><p className='card-text' style={{fontSize:'25px'}}>{val.productName}</p></b>
                                            <p className='card-text'>{val.companyName}</p>
                                            <p className='card-text'>Rs. {val.price}</p>
                                            <p className='card-text'>Total Amount : {val.total}</p>

                                            <p style={{ display: 'none' }}>{rs = rs + Number(val.total), tc = tc + Number(val.price)}</p>

                                            <select className="form-control col-md-4" value={val.quantity} onChange={(e) => { qut(e.target.value, val) }} name='quantity' required>
                                                <option disabled >Quantity</option>
                                                <option value='1' selected>1</option>
                                                <option value='2'>2</option>
                                                <option value='3'>3</option>
                                            </select><br />

                                            <button className='btn btn-danger' onClick={() => { removeCart(val) }}>Remove from Cart</button>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                        }
                    </div>
                    <div className='col-md-5 mt-2'>
                        <div className='card-body'>

                            <h2 className='card-text'>PRICE DETAILS</h2>
                            <p className='card-text'><h5>Price ({items.allData.length} itmes)  :  {rs}</h5></p>
                            <p className='card-text'><h5>Delivery Fee :  Free</h5></p>
                            <p className='card-text'><h5>----------------------------</h5></p>
                            <p style={{ display: 'none' }}>{localStorage.setItem('total', rs)}</p>

                            <p className='card-text'><h5>Payable Amount : {rs}</h5></p>
                            <button type="button" className='btn btn-outline-success ml-2' data-toggle="modal" onClick={checkout} data-target="#myModal">Place order</button>

                        </div>
                    </div>

                    <div class="modal fade" id="myModal" role="dialog">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div class="modal-body">
                                    <p>Your order Placed Successfully </p>
                                    <p>Thank you! </p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" onClick={handleClose} class="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                            </div>

                        </div>
                    </div>





                </div>
            </div>
        </>

    )
}

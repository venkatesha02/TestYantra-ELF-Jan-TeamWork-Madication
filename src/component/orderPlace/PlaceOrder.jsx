import React, { useEffect, useState } from 'react'
import Axios from 'axios'

export default function PlaceOrder(props) {

    const uniqId = localStorage.getItem('id')
    const total = localStorage.getItem('total')
    const [items, setItems] = useState({ allData: [] })

    useEffect(() => {

        getAllAccounts()

    }, [])

    // Getting data from server
    let getAllAccounts = async () => {
        const url = `https://react-magicshopping.firebaseio.com/users/${uniqId}/product.json`
        try {
            const response = await Axios.get(url)
            let data = response.data

            let filt = data.filter(val => { return val.myOrder === true })

            if (response.status === 200) {
                setItems({
                    ...items.allData,
                    allData: filt
                })
            }
        }
        catch (err) {
            console.log("Erroo ", err)
        }
    }


    return (
        <>
            <div className='container' >
                <div className='mt-4'>
                    <h3 className=''>My Order</h3>
                    {items.allData.map((val) => {
                        return (
                            <>
                                <div key={val.id} className='card col-md-6 mt-2 ml-2'>
                                    <div className='card-body row'>
                                        <div className='col-md-4 float-left'>
                                            <img className='card-img-top p-1' width='100%' height='120px' src={val.img} alt='pimg' ></img>
                                        </div>
                                        <div className='col-md-3 offset-2'>
                                            <p className='card-text'><h5>{val.itemName}</h5></p>
                                            <p className='card-text'><h5>{val.brand}</h5></p>
                                            <p className='card-text'><h5>Rs. {val.price}</h5></p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })
                    }
                </div>
            </div >
        </>
    )
}

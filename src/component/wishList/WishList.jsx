import React, { useEffect } from 'react'
import Axios from 'axios'
import { useState } from 'react'

export default function WishList() {

    const uniqId = localStorage.getItem('id')

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

            let filt = data.filter(val => { return val.wish === true })

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

    const removeWishList = async (e) => {

    let data = items.allData
    data.map(val => {
        if (val.id === e.id) {
            return val.wish = !e.wish
        }
        return val
    })
    setItems({
        ...items.allData,
        allData: data
    })

    const url = `https://react-magicshopping.firebaseio.com/users/${uniqId}/product.json`

    try {
        const response = await Axios.put(url, data)
        const myAccount = [...items.allData]

        const index = myAccount.indexOf(e)

        myAccount.splice(index, 1)

        setItems({ allData: myAccount })

        //console.log("Response ", response)
    }
    catch (error) {
        console.log("Error ", error)

    }
}

return (
    <>
        <div className='container' >
            <div className='mt-4'>
                <h3 className='ml-2'>Your Wish List</h3>
                {items.allData.map((val) => {
                    return (
                        <>
                            <div key={val.id} className='card col-md-8 mt-2 ml-2'>
                                <div className='card-body'>
                                    <div className='col-md-4 float-right'>
                                        <img className='card-img-top p-1' width='100%' height='120px' src={val.img} alt='pimg' ></img>
                                    </div>
                                    <p className='card-text'><h5>{val.itemName}</h5></p>
                                    <p className='card-text'><h5>{val.brand}</h5></p>
                                    <p className='card-text'><h5>Rs. {val.price}</h5></p>

                                    <button className='btn btn-outline-danger' onClick={() => { removeWishList(val) }}><i className="fa fa-trash"></i>  REMOVE </button>
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
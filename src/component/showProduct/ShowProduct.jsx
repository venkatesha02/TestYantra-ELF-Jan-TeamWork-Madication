import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Search from '../search/Search'

export default function ShowProduct() {

    const uniqId = localStorage.getItem('id')

    // getting all itms from database
    const [items, setItems] = useState({ all: [] })

    // filterd Items
    const [product, setProduct] = useState({ data1: [] })

    useEffect(() => {

        getAllAccounts();

    }, [])

    // Getting all data from server
    let getAllAccounts = async () => {
        const url = `https://react-magicshopping.firebaseio.com/addproduct.json`

        try {
            const response = await Axios.get(url)
            if (response.status === 200) {

                let fetchedAccount = []
                for (let key in response.data) {
                    let account = response.data[key]

                    fetchedAccount.push({
                        ...account,
                        id: key
                    })

                    setItems({
                        ...items.all,
                        all: fetchedAccount
                    })
                }
            }
        }
        catch (err) {
            console.log("Erroo ", err)
        }
    }
//---------------------------------------------------------------------------------------------
    let searchProduct = (event) => {

        let allData = items.all

        const data = allData.filter(val => val.itemName.startsWith(event))
        let arr = [];
        for (const key in data) {
            arr.push({
                ...data[key],
            })
        }
        if (arr) {
            setProduct({
                ...product.data1,
                data1: arr
            })
        } else {
            setProduct({
                ...product.data1,
                data1: []
            })
        }

    }
//----------------------------------------------------------------------------------------
    let handleClick = async (val) => {
        //console.log(val)
        let data = product.data1

        data.map((e) => {
            if (e.id === val.id) {
                return e.wish = !val.wish
            }
            return e
        })
        setProduct({ data1: data })

        //const wishItem = val
        const url = `https://react-magicshopping.firebaseio.com/wishllist/${uniqId}.json`

        try {
            const response = await Axios.put(url, val)
            if (response.status === 200) {
                console.log('wishlist added', response)
            } else {
                console.log("Err") 
            }
        }
        catch (err) {
            console.log("Err", err)

        }
    }

    //-------------------------------------------------------------------------------------------
    let addTocart = async (val) => {
        //console.log(val)
        let data = product.data1

        //cartUpdateAll(val)

        data.map((e) => {
            if (e.id === val.id) {
              
                return e.cart = !val.cart
            }
            return e
        })
        setProduct({ data1: data })


        const url = `https://react-magicshopping.firebaseio.com/cartlist/${uniqId}.json`

        try {
            const response = await Axios.post(url, val)
            if (response.status === 200) {
                console.log('cartlist added', response)
            } else {
                console.log("Err")
            }
        }
        catch (err) {
            console.log("Err", err)

        }
    }

    //-------------------------------------------------------------------------------------------

    return (
        <>
            <Search inputs={searchProduct} />

            {product.data1.map((val) => {
                return (
                    <div className='container-fluid mt-4'>
                        <div className='col-md-3 col-sm-12 col-12 mt-2 ml-2 card float-left'>
                            <div key={val.id} className='card-body'>

                                {val.wish ? <i style={{ color: 'red' }} onClick={() => { handleClick(val) }} className="fa fa-heart"></i> :
                                    <i onClick={() => { handleClick(val) }} className="fa fa-heart-o"></i>}
                                <img className='card-img-top' width='100%' height='205px' src={val.img} alt='pimg' ></img>
                                <p className='card-text'><h5>{val.itemName}</h5></p>
                                <p className='card-text'><h5>{val.brand}</h5></p>
                                <p className='card-text'><h5>Rs. {val.price}</h5></p>
                                <button className='btn btn-outline-primary '>Buy Now</button>
                                <button className='btn btn-outline-danger ml-2' onClick={() => { addTocart(val) }}>Add to Cart</button>

                            </div>
                        </div>
                    </div>
                )
            })
            }
        </>
    )
}

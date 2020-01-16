import React, { useEffect, useState } from 'react'
import Search from '../search/Search'
import Axios from 'axios';
import SnackBar from '../snackBar/SnackBar';

export default function Home(props) {

    const [items, setItems] = useState({ all: [] })

    const [newData, setnewData] = useState({ allnew: [] })

    const isLogin = localStorage.getItem('status')

    const mobile = localStorage.getItem('mobile')

    useEffect(() => {
        getAllAccounts();
    })

    // Getting all data from server
    let getAllAccounts = async () => {
        const url = `https://react-medical-app.firebaseio.com/addmedicine.json`

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
                        all: fetchedAccount,
                    })

                    setnewData({
                        ...newData.allnew,
                        allnew: fetchedAccount
                    })

                }
            }
        }
        catch (err) {
            console.log("Erroo ", err)
        }
    }

    const inputs = (event) => {

        let oldData = [...newData.allnew]

        const data = oldData.filter(val => val.productName.toLowerCase().startsWith(event))
        let arr = [];
        for (const key in data) {
            arr.push({
                ...data[key],
            })
        }

        if (arr) {
            console.log(arr)
            setItems({
                ...items.all,
                all: arr
            })
        }
    }

    const [open, setOpen] = useState({ open: false, message: '' })
    let addTocart = async (val) => {

        if (val.id === items.all.id) {
            setItems({
                all: val
            })
        }

        const url = `https://react-medical-app.firebaseio.com/cartList-${mobile}.json`

        try {
            const response = await Axios.post(url, val)

            if (response.status === 200) {

                setOpen({
                    open: true,
                    message: 'Added to Cart'
                })
                setTimeout(() => {
                    setOpen({ open: false })
                }, 1000);

            }
        }
        catch (err) {
            console.log("Err", err)
        }
    }

    return (
        <>
            <SnackBar open={open.open} message={open.message} />
            <Search inputSearch={inputs} />
            <div id="carouselId" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselId" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselId" data-slide-to="1"></li>
                    <li data-target="#carouselId" data-slide-to="2"></li>
                    <li data-target="#carouselId" data-slide-to="3"></li>
                </ol>
                <div className="carousel-inner" role="listbox">
                    <div className="carousel-item">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcLbFnnhUOHFevzvze9FpeR1i_ClI3QiRjxVC-5mVwVwISEaSIiQ&s" width="100%" height='300' alt="Second slide" />
                    </div>
                    <div className="carousel-item active">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5f90SKMoMU2hi0LdTaXDKPjs-B0ZXjiHoKcuhRlSK_6y9PiXA0Q&s" width="100%" height='300px' alt="First slide" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwcr3mbMPaerNXszkS4T4s-QSChERUVXCE9aJPJUhZkNIfRJQQ&s" width="100%" height='300px' alt="Third slide" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFed-OPFTf28BavMj_psY5DoFfyRUibPrD1rLoU1XL0dg3pQ0I&s" width="100%" height='300px' alt="Third slide" />
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselId" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselId" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>

            {items.all.map(val => {

                return (

                    <div className="ml-2 mt-3 card float-left" style={{ width: "18rem" }}>
                        <div key={val.id} className="card-body">
                            <img height='200px' src={val.productImage} class="card-img-top" alt="..." width='100%'></img>
                            <h5 className="card-title">{val.productName}</h5>
                            <p className='card-text'><h5>Rs. {val.price}</h5></p>
                            <p className='card-text'><h6>Brand : {val.companyName}</h6></p>
                            <p className='card-text'>{val.description}</p>

                            {isLogin ?
                                <>
                                    <button style={{ background: 'orange', color: 'white' }} onClick={() => { props.history.push('/checkout') }} className="btn " >Buy Now</button>
                                    <button style={{ background: 'blue', color: 'white' }} onClick={() => addTocart(val)} className="btn ml-5">Add to Cart</button>
                                </>
                                :
                                <>
                                    <button style={{ background: 'orange', color: 'white' }}
                                        onClick={() => {
                                            setOpen({ open: true, message: 'Please Login!!' })
                                            setTimeout(() => {
                                                props.history.push('/login')
                                            }, 1000);
                                        }}
                                        className="btn ">Buy Now
                                    </button>

                                    <button
                                        style={{ background: 'blue', color: 'white' }}
                                        onClick={() => {
                                            setOpen({ open: true, message: 'Please Login!!' })
                                            setTimeout(() => {
                                                props.history.push('/login')
                                            }, 1000);
                                        }}
                                        className="btn ml-5">Add to Cart
                                    </button>
                                </>
                            }

                        </div>
                    </div>
                )
            })}
        </>
    )
}

import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import logo from './logo.png'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'





import HashLoader from "react-spinners/HashLoader";






function BookingDetails() {

    const { id } = useParams();

    // const [cus_id, setCus_id] = useState('');
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [loading, setLoading] = useState(true);




    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('https://airrv-travel.onrender.com/')
            .then(res => {
                if (res.data.Status === 'Success') {
                    if (res.data.role === 'customer') {
                        // navigate('/bookingdetails')
                        // setCus_id(res.data.id)
                    }
                    else {
                        navigate('/login')
                    }
                }
                else {
                    navigate('/login')
                }
            })


        axios.get('https://airrv-travel.onrender.com/booking_history/' + id)
            .then(res => {
                if (res.data.Status === 'Success') {
                    setData(res.data.Result)
                    setLoading(false)
                }
                else {
                    alert('Error in show images');
                }
            })
    }, [])

    const showDetails = (id) => {
        axios.get('https://airrv-travel.onrender.com/showImg/' + id)
            .then(res => {
                if (res.data.Status === 'Success') {
                    setData1(res.data.Result)
                }
                else {
                    alert('Error in show images');
                }
            })
            .catch(err => (console.log(err)))
    }

    const showAllDetail = (id) => {
        navigate('/placedetails/' + id)
        // window.location.reload();
    }



    const [data3, setData3] = useState([])

    const findPrice = (p) => {
        axios.get('https://airrv-travel.onrender.com/findprice/' + p)
            .then(res => {
                if (res.data.Status === 'Success') {
                    setData3(res.data.Result)
                }
                else {
                    alert('Error in show images');
                }
            })
            .catch(err => (console.log(err)))
    }




    const dt = data3.map((a, b) => { return (a.price) })

    const [data2, setData2] = useState({
        cardname: '',
        cardnumber: '',
        expire: '',
        cvv: '',
        paymentstatus: 'Success'
    })

    const [auth, setAuth] = useState(true);
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://airrv-travel.onrender.com/payment/' + dt, data2)
            .then(res => {
                if (res.data.Status) {
                    setAuth(false)
                }
                else {
                    setError(res.data.Error)
                }
            }).catch(err => console.log(err))
    }





    return (
        <section>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link to="/" title='rVm Collection' className="navbar-brand fs-4 p-3"><img src={logo} width="50px" /></Link>
                    <span style={{ fontSize: '20px', color: 'RGB(255,0,0)', position: 'relative', left: "-20px", top: '12px' }}><b>airRv</b></span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className=" li1 nav-item mx-3">
                                <Link to="/" style={{ width: 'fit-content' }} className="nav-link active" aria-current="page" href="#">Home</Link>
                            </li>
                            {/* <li className=" li1 nav-item mx-3">
                                <Link to="/addtocart" style={{ width: 'fit-content' }} className="nav-link active" aria-current="page" href="#">Add to Cart</Link>
                            </li> */}
                            {/* <li className="nav-item mx-4">
                                <a className="nav-link disabled">Login</a>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>




            <span style={{ color: 'rgb(169,169,169)' }}><hr /></span>

            {/* <div class="row d-flex justify-content-center">
                <HashLoader
                    color="#36d7b7"
                    loading={loading}
                    size={60}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div> */}

            <section class="h-100 gradient-custom">
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        {
                            data.length > 0 ?
                                <div class="col-lg-10 col-xl-8">
                                    <div class="card" style={{ borderRadius: '10px' }}>
                                        <div class="card-header px-4 py-5">
                                            <h5 class="text-muted mb-0">Thanks for your Booking <span style={{ color: '#a8729a' }}> </span>!</h5>
                                        </div>
                                        {
                                            data.map((a, b) => {
                                                return <div key={b} class="card-body p-4">
                                                    <div class="card shadow-0 border mb-4">
                                                        <div class="card-body">
                                                            <div class="row">
                                                                {/* <div class="col-md-2">
                                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/13.webp"
                                                        class="img-fluid" alt="Phone" />
                                                </div> */}


                                                                {a.paymentstatus === 'Pending'
                                                                    ?
                                                                    <>
                                                                        < p> Payment:
                                                                            <button type="button" onClick={e => findPrice(a.price)} class="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                                                <span class="badge text-bg-warning">{a.paymentstatus}</span>
                                                                                {/* setPrice(a.price) */}
                                                                            </button>
                                                                        </p>
                                                                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                            <div class="modal-dialog">
                                                                                <div class="modal-content">
                                                                                    <div class="modal-header">
                                                                                        <h1 class="modal-title fs-5" id="exampleModalLabel">For Pending Payment</h1>
                                                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                    </div>
                                                                                    <section class="p-4 p-md-3">
                                                                                        <div class="row d-flex justify-content-center">
                                                                                            {
                                                                                                auth ?
                                                                                                    <div class="card-body p-4">
                                                                                                        <div class="text-center mb-4">
                                                                                                            <h3>Payment</h3>
                                                                                                        </div>
                                                                                                        {/* {
                                                                                                            data3.map((aa, bb) => {
                                                                                                                return <div class="d-flex justify-content-between mt-2">
                                                                                                                    <span><b>Total.(INR).</b></span><span><b><i class="bi bi-currency-rupee"></i>{aa.price}</b></span>
                                                                                                                </div >
                                                                                                            })
                                                                                                        } */}
                                                                                                        <hr />
                                                                                                        <form onSubmit={handleSubmit}>
                                                                                                            <div className='text-danger'>
                                                                                                                {error && error}
                                                                                                            </div>

                                                                                                            {
                                                                                                                data3.map((aa, bb) => {
                                                                                                                    return <div class="d-flex justify-content-between mt-2">
                                                                                                                        <span><b>Total.(INR).</b></span><span><b><i class="bi bi-currency-rupee"></i><input id='price' disabled value={aa.price} /></b></span>
                                                                                                                    </div >
                                                                                                                })
                                                                                                            }

                                                                                                            <hr />
                                                                                                            <div class="form-outline mb-3">
                                                                                                                <label class="form-label" for="formControlLgXM8">Card Holder name</label>
                                                                                                                <input type="text" onChange={e => setData2({ ...data2, cardname: e.target.value })} id="formControlLgXM8" class="form-control border-dark"
                                                                                                                    placeholder="John" />
                                                                                                            </div>

                                                                                                            <div class="form-outline mb-3">
                                                                                                                <label class="form-label" for="formControlLgXM8">Card Number</label>
                                                                                                                <input type="text" onChange={e => setData2({ ...data2, cardnumber: e.target.value })} id="formControlLgXM8" class="form-control border-dark"
                                                                                                                    placeholder="1234 1234 1234 1234" />
                                                                                                            </div>

                                                                                                            <div class="row mb-3">
                                                                                                                <div class="col-6">
                                                                                                                    <div class="form-outline">
                                                                                                                        <label class="form-label" for="formControlLgExpk8">Expire</label>
                                                                                                                        <input type="text" onChange={e => setData2({ ...data2, expire: e.target.value })} id="formControlLgExpk8" class="form-control border-dark"
                                                                                                                            placeholder="MM/YYYY" />
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <div class="col-6">
                                                                                                                    <div class="form-outline">
                                                                                                                        <label class="form-label" for="formControlLgcvv8">Cvv</label>
                                                                                                                        <input type="password" onChange={e => setData2({ ...data2, cvv: e.target.value })} id="formControlLgcvv8" class="form-control border-dark" placeholder="Cvv" />
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <button class="btn btn-success btn-lg btn-block">Pay now</button>
                                                                                                        </form>
                                                                                                    </div>
                                                                                                    :
                                                                                                    <div class="d-flex justify-content-center align-items-center mb-5">
                                                                                                        <div class="d-flex flex-row align-items-center">
                                                                                                            <div class="justify-content-between mt-2">
                                                                                                                <span className='mx-2' style={{ fontWeight: 'bold', fontSize: '30px', color: 'green' }}><i class="bi bi-check-circle"></i></span><br />
                                                                                                                <span className='mx-2' style={{ fontWeight: 'bold', fontSize: '20px', color: 'green' }}>Your Payment Successfully Done!</span>
                                                                                                                <br />
                                                                                                                <Link to='/'> <button type="button" data-bs-dismiss="modal" aria-label="Close" style={{ color: 'dark' }} className="btn btn-light"> Go Homepage </button>
                                                                                                                </Link>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                            }
                                                                                        </div>
                                                                                    </section>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                    :
                                                                    < p > Payment: <span class="badge text-bg-success">{a.paymentstatus}</span></p>
                                                                }



                                                                {/* <span class="badge text-bg-success">Success</span> */}
                                                                {/* < p value> Payment: <span class="badge text-bg-warning"> Pending</span></p> */}


                                                                <div class="d-flex justify-content-between pt-2">
                                                                    <p class="fw-bold mb-0">Booking Details</p>
                                                                    <p class="text-muted mb-0"><span class="fw-bold me-4">Total Price</span><i class="bi bi-currency-rupee"></i>{a.price}</p>
                                                                </div>

                                                                <div class="d-flex justify-content-between pt-2">
                                                                    <p class="text-muted mb-0">Check_In : {a.chk_in}</p>
                                                                    <p class="text-muted mb-0"><span class="fw-bold me-4">airRv service fee</span><i class="bi bi-currency-rupee"></i> 3,500</p>
                                                                </div>

                                                                <div class="d-flex justify-content-between">
                                                                    <p class="text-muted mb-0">Check_Out : {a.chk_out}</p>
                                                                    <p class="text-muted mb-0"><span class="fw-bold me-4">Cleaning fee</span><i class="bi bi-currency-rupee"></i> 500</p>
                                                                </div>

                                                                <div class="d-flex justify-content-between mb-5">
                                                                    <p class="text-muted mb-0">Stay_Days : {a.stay_day}</p>
                                                                    <p class="text-muted mb-0"><span class="fw-bold me-4">Taxes</span><i class="bi bi-currency-rupee"></i> 1,200</p>
                                                                </div>


                                                                <div className='cross-button2' style={{ position: 'relative', top: '5px', left: '5px' }}>
                                                                    <button type="button" onClick={e => showDetails(a.pro_id)} style={{ color: 'green' }} className="btn btn-light" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                                                        <i class="bi bi-images"></i> Details about place
                                                                    </button>
                                                                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                                        <div class="modal-dialog">
                                                                            {
                                                                                data1.map((a1, b1) => {
                                                                                    return <div key={b1} class="modal-content">
                                                                                        <div class="modal-header">
                                                                                            <h1 class="modal-title fs-5" id="staticBackdropLabel">{a1.category}</h1>
                                                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                        </div>
                                                                                        <div class="card-body">
                                                                                            <div class="d-flex justify-content-between">
                                                                                                <div className="d-flex align-items-center mb-4">
                                                                                                    <div className="me-3 position-relative">
                                                                                                        <img data-bs-dismiss="modal" aria-label="Close" onClick={e => showAllDetail(a1._id)} src={'https://airrv-travel.onrender.com/images/' + a1.image1} style={{ height: '96px', width: '96px', cursor: 'pointer' }} className=" img-sm rounded border" />
                                                                                                    </div>
                                                                                                    <div className="mb-4">
                                                                                                        <div style={{ fontSize: '13px' }} className="nav-link text-muted">
                                                                                                            {a1.category}
                                                                                                        </div>
                                                                                                        <div className="nav-link">
                                                                                                            {a1.about}
                                                                                                        </div>
                                                                                                        <div className="price" style={{ fontSize: '10px' }} ><i class="bi bi-star-fill"></i> {a1.rating} . Superhost</div>
                                                                                                        <div className="price" style={{ fontSize: '10px', fontWeight: 'bold' }} ><i class="bi bi-currency-rupee"></i> {parseInt(a1.price).toLocaleString()} per night</div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr class="mb-4" style={{ backgroundColor: '#e0e0e0', opacity: '1' }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                                :
                                <div>
                                    <h2>You Don't have any Booking Places</h2>
                                </div>
                        }
                    </div>
                </div>
                <div class="row d-flex justify-content-center">
                    <HashLoader
                        color="#36d7b7"
                        loading={loading}
                        size={60}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            </section>












        </section >
    )
}

export default BookingDetails

import React from 'react'
import logo from './logo-travel.png'
import { Link, useParams } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

import { useLocation } from 'react-router-dom';





function Booking() {

    const navigate = useNavigate();

    const location = useLocation();
    const date1 = new Date(location.state.date1)
    const date2 = new Date(location.state.date2)
    // console.log(location.state.cusid);



    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const [values1, setValues1] = useState({
        email: '',
        name: '',
        phone: '',
        price: ((parseInt(location.state.price) * parseInt(location.state.date) + 3500 + 500 + 1200)).toLocaleString(),
        login_id: location.state.cus_id,
        chk_in: location.state.date1,
        chk_out: location.state.date2,
        pro_id: location.state.id,
        stay_day: location.state.date
    })

    const handleSubmit1 = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3434/pay_detail', values1)
            .then(res => {
                if (res.data.Status === 'Success') {
                    navigate('/')
                }
                else {
                    setError(res.data.Error)
                }
            })
            .then(err => console.log(err))


    }



    const [error, setError] = useState('');
    const [auth, setAuth] = useState('');

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:3434/')
            .then(res => {
                if (res.data.Status === 'Success') {
                    if (res.data.role === 'customer') {
                        setAuth(true);
                    }
                    else {
                        setAuth(false)
                    }
                }
                else {
                    setAuth(false)
                }
            })
    },[])

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3434/login', values)
            .then(res => {
                if (res.data.Status === 'Success') {
                    setAuth(true)
                } else {
                    setAuth(false)
                    setError(res.data.Error)
                }
            })
            .then(err => console.log(err))
    }






    return (
        <>
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




                {/* <div className='my-5 mx-5'>
                <div class="justify-content-between mt-2">
                    <span><Link to='/'><i style={{ fontWeight: 'bold', fontSize: '22px', color: 'black' }} class="bi bi-chevron-left"></i></Link></span> <span className='mx-2' style={{ fontWeight: 'bold', fontSize: '30px' }}>Request to book</span>
                </div>

                <br />
                <br />
                <br />

                <div class="card" style={{ width: '21rem', boxShadow: '1px 1px 10px 0px #C0C0C0' }}>
                    <div class="card-body">
                        <div class="d-flex justify-content-between mt-2">
                            <span> <b>This is a rare find.</b><br /> Marc's place is usually booked.</span><span><i style={{ fontSize: '27px', color: '#FF385C' }} class="bi bi-gem"></i></span>
                        </div>
                    </div>
                </div>
            </div> */}


            </section>








            <section className='my-5 mx-5'>
                <div class="d-flex justify-content-between align-items-center mb-5">
                    <div class="d-flex flex-row align-items-center">
                        <div class="justify-content-between mt-2">
                            <span><Link to={'/placedetails/' + location.state.id}><i style={{ fontWeight: 'bold', fontSize: '22px', color: 'black' }} class="bi bi-chevron-left"></i></Link></span> <span className='mx-2' style={{ fontWeight: 'bold', fontSize: '30px' }}>Request to book</span>
                        </div>
                    </div>
                </div>
                {
                    auth ?
                        <div class="d-flex justify-content-between align-items-center mb-5">
                            <div class="d-flex flex-row align-items-center">
                                <div class="justify-content-between mt-2">
                                    <span style={{ visibility: 'hidden' }}>hh</span> <span className='mx-2' style={{ fontWeight: 'bold', fontSize: '30px' }}><i class="bi bi-check-circle"></i></span><br />
                                    <span style={{ visibility: 'hidden' }}>hh</span> <span className='mx-2' style={{ fontWeight: 'bold', fontSize: '20px' }}>Hi, you’re logged in</span>
                                </div>
                            </div>
                        </div>
                        :
                        ''
                }
                <div class="row">
                    <div class="col-md-7 col-lg-7 col-xl-6 mb-4 mb-md-0">
                        <div class="card" style={{ width: '21rem', boxShadow: '1px 1px 10px 0px #C0C0C0' }}>
                            <div class="card-body">
                                <div class="d-flex justify-content-between mt-2">
                                    <span> <b>This is a rare find.</b><br /> {location.state.owner}'s place is usually booked.</span><span><i style={{ fontSize: '27px', color: '#FF385C' }} class="bi bi-gem"></i></span>
                                </div>
                            </div>
                        </div>

                        <br />
                        <hr />
                        <div>
                            <div class="d-flex justify-content-between">
                                <div class="d-flex flex-row mt-1">
                                    <h4>Your trip</h4>
                                </div>
                            </div>

                            <div class="d-flex justify-content-between align-items-center">
                                <div class="d-flex flex-row mt-3">
                                    <h6>Dates</h6>
                                </div>
                            </div>
                            <p>{date1.getDate()} {date1.toLocaleString('default', { month: 'long' })} - {date2.getDate()} {date2.toLocaleString('default', { month: 'long' })}</p>
                            <br />

                            {
                                auth ?
                                    <>
                                        <hr />
                                        <h3>Please fill the details</h3>
                                        <div className='text-danger'>
                                            {error && error}
                                        </div>
                                        <form onSubmit={handleSubmit1}>
                                            <div className="form-floating form-outline mb-4">
                                                <input type="email" id="form1Example13" onChange={e => setValues1({ ...values1, email: e.target.value })} placeholder="Email address"
                                                    className="form-control form-control-lg border border-dark" />
                                                <label className="form-label" htmlFor="floatingInput form1Example13">Email address</label>
                                            </div>

                                            <div className="form-floating form-outline mb-4">
                                                <input type="text" id="form1Example13" onChange={e => setValues1({ ...values1, name: e.target.value })} placeholder="Last Name"
                                                    className="form-control form-control-lg border border-dark" />
                                                <label className="form-label" htmlFor="floatingInput form1Example13">Full Name</label>
                                            </div>

                                            <div className="form-floating form-outline mb-4">
                                                <input type="text" id="form1Example13" onChange={e => setValues1({ ...values1, phone: e.target.value })} placeholder="Last Name"
                                                    className="form-control form-control-lg border border-dark" />
                                                <label className="form-label" htmlFor="floatingInput form1Example13">Phone</label>
                                            </div>

                                            {/* <div className="form-floating form-outline mb-4" style={{ display: '' }}>
                                                <input type="text" id="form1Example13" onChange={e => setValues1({ ...values1, price: e.target.value })} placeholder="Last Name" value={(parseInt(location.state.price) * parseInt(location.state.date) + 3500 + 500 + 1200).toLocaleString()}
                                                    className="form-control form-control-lg border border-dark" />
                                                <label className="form-label" htmlFor="floatingInput form1Example13">Price</label>
                                            </div>
                                            <div className="form-floating form-outline mb-4" style={{ display: '' }}>
                                                <input type="text" id="form1Example13" onChange={e => setValues1({ ...values1, login_id: e.target.value })} placeholder="Last Name" value={location.state.cus_id}
                                                    className="form-control form-control-lg border border-dark" />
                                                <label className="form-label" htmlFor="floatingInput form1Example13">Login_id</label>
                                            </div>

                                            <div class="mb-3" style={{ display: '' }}>
                                                <b for="exampleInputEmail1" style={{ fontSize: '10px' }} class="form-label">CHECK-IN</b>
                                                <input type="date" placeholder='' onChange={e => setValues1({ ...values1, chk_id: e.target.value })} class="form-control" value={location.state.date1} id="time1" aria-describedby="emailHelp" />
                                            </div>
                                            <div class="mb-3" style={{ display: '' }}>
                                                <b for="exampleInputPassword1" style={{ fontSize: '10px' }} class="form-label">CHECK-OUT</b>
                                                <input type="date" placeholder='' onChange={e => setValues1({ ...values1, chk_out: e.target.value })} class="form-control" value={location.state.date2} id="time2" />
                                            </div>

                                            <div className="form-floating form-outline mb-4" style={{ display: '' }}>
                                                <input type="text" id="form1Example13" onChange={e => setValues1({ ...values1, pro_id: e.target.value })} value={location.state.id} placeholder="Last Name"
                                                    className="form-control form-control-lg border border-dark" />
                                                <label className="form-label" htmlFor="floatingInput form1Example13">product_id</label>
                                            </div>

                                            <div className="form-floating form-outline mb-4" style={{ display: '' }}>
                                                <input type="text" id="form1Example13" onChange={e => setValues1({ ...values1, stay_day: e.target.value })} value={location.state.date} placeholder="Last Name"
                                                    className="form-control form-control-lg border border-dark" />
                                                <label className="form-label" htmlFor="floatingInput form1Example13">stay_day</label>
                                            </div> */}



                                            <button type="submit" class="btn" style={{ backgroundColor: '#FF385C', color: 'white', width: '30vh' }}>Checkout</button>
                                        </form>


                                    </>
                                    :
                                    <>
                                        {/* <br /> */}
                                        <div class="d-flex flex-column mb-3">
                                            <h4>Log in or sign up to book</h4>
                                            <br />
                                            <div className='text-danger'>
                                                {error && error}
                                            </div>
                                            <form onSubmit={handleSubmit}>
                                                <div className="form-floating form-outline mb-4">
                                                    <input type="email" onChange={e => setValues({ ...values, email: e.target.value })} id="form1Example13" placeholder="Email address"
                                                        className="form-control form-control-lg border border-dark" />
                                                    <label className="form-label" htmlFor="floatingInput form1Example13">Email address</label>
                                                </div>

                                                <div className="form-floating form-outline mb-4">
                                                    <input type="password" onChange={e => setValues({ ...values, password: e.target.value })} id="form1Example23" placeholder="Password"
                                                        className="form-control form-control-lg border border-dark" />
                                                    <label className="form-label" htmlFor="floatingInput form1Example23">Password</label>
                                                </div>
                                                <div className="justify-content-around mb-4 text-dark">
                                                    <Link to='/forgetpassword' href="#!">Forgot password?</Link>
                                                </div>
                                                {/* <button type="submit" className="btn btn-lg btn-block">Login</button> */}
                                                <button type="submit" class="btn" style={{ backgroundColor: '#FF385C', color: 'white', width: '30vh' }}>Login</button>

                                                <p className=" text-muted mt-5 mb-0">Don't have an account?
                                                    <Link to='/signup'><a href="#!" className="fw-bold text-danger"><u>Register here</u></a></Link></p>
                                            </form>
                                        </div>
                                    </>
                            }

                        </div>
                    </div>
                    <div class="col-md-5 col-lg-4 col-xl-4 offset-lg-1 offset-xl-2">
                        <div class="card" style={{ width: '21rem', boxShadow: '1px 1px 10px 0px #C0C0C0' }}>
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="me-3 position-relative">
                                            <img src={'http://localhost:3434/images/' + location.state.image1} style={{ height: '96px', width: '96px' }} className="img-sm rounded border" />
                                        </div>
                                        <div className="mb-4">
                                            <div style={{ fontSize: '13px' }} className="nav-link text-muted">
                                                {location.state.category}
                                            </div>
                                            <div className="nav-link">
                                                {location.state.about}
                                            </div>
                                            <div className="price" style={{ fontSize: '10px' }} ><i class="bi bi-star-fill"></i> {location.state.rating} . Superhost</div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <h3>Price details</h3>
                                <div class="d-flex justify-content-between mt-2">
                                    <span><i class="bi bi-currency-rupee"></i>{parseInt(location.state.price).toLocaleString()}<i class="bi bi-x"></i>{location.state.date} nights</span> <span><i class="bi bi-currency-rupee"></i>{(parseInt(location.state.price) * parseInt(location.state.date) + 3500).toLocaleString()}</span>
                                </div>
                                <div class="d-flex justify-content-between mt-2">
                                    <span><i class="bi bi-currency-rupee"></i>Cleaning fee</span> <span style={{ color: 'green' }}><i class="bi bi-currency-rupee"></i>500</span>
                                </div>
                                <div class="d-flex justify-content-between mt-2">
                                    <span><i class="bi bi-currency-rupee"></i>Taxes</span> <span style={{ color: 'green' }}><i class="bi bi-currency-rupee"></i>1,200</span>
                                </div>
                                <hr />
                                <div class="d-flex justify-content-between mt-2">
                                    <span><b>Total.(INR).</b></span><span><b><i class="bi bi-currency-rupee"></i>{(parseInt(location.state.price) * parseInt(location.state.date) + 3500 + 500 + 1200).toLocaleString()}</b></span>
                                </div >
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>














    )
}

export default Booking

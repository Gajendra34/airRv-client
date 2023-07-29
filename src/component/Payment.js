import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';


function Payment() {

    const location = useLocation();
    const navigate = useNavigate();


    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('https://airrv-travel.onrender.com/')
            .then(res => {
                if (res.data.Status === 'Success') {
                    if (res.data.role === 'customer') {
                    }
                    else {
                        navigate('/')
                    }
                }
                else {
                    navigate('/')
                }
            })
    }, [])

    const [data, setData] = useState({
        cardname: '',
        cardnumber: '',
        expire: '',
        cvv: '',
        Tprice: location.state.totalPrice,
        paymentstatus:'Success'
    })

    const [auth, setAuth] = useState(true);
    const [error, setError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://airrv-travel.onrender.com/payment', data)
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
        <div>

            {
                auth ?
                    <section class="p-4 p-md-5">
                        <div class="row d-flex justify-content-center">
                            <div class="col-md-10 col-lg-8 col-xl-5">
                                <div class="card rounded-3">
                                    <div class="card-body p-4">
                                        <div class="text-center mb-4">
                                            <h3>Payment</h3>
                                        </div>
                                        <hr />
                                        <form onSubmit={handleSubmit}>
                                            <div class="d-flex justify-content-between mt-2">
                                                <span><b>Total.(INR).</b></span><span><b><i class="bi bi-currency-rupee"></i>{location.state.totalPrice}</b></span>
                                            </div >
                                            <div class="d-flex justify-content-between mt-2">
                                                <span><b>{location.state.category}</b></span>
                                            </div >

                                            <hr />
                                            <div className='text-danger'>
                                                {error && error}
                                            </div>

                                            <div class="form-outline mb-3">
                                                <label class="form-label" for="formControlLgXM8">Card Holder name</label>
                                                <input type="text" onChange={e => setData({ ...data, cardname: e.target.value })} id="formControlLgXM8" class="form-control"
                                                    placeholder="John" />
                                            </div>

                                            <div class="form-outline mb-3">
                                                <label class="form-label" for="formControlLgXM8">Card Number</label>
                                                <input type="text" onChange={e => setData({ ...data, cardnumber: e.target.value })} id="formControlLgXM8" class="form-control"
                                                    placeholder="1234 1234 1234 1234" />
                                            </div>

                                            <div class="row mb-3">
                                                <div class="col-6">
                                                    <div class="form-outline">
                                                        <label class="form-label" for="formControlLgExpk8">Expire</label>
                                                        <input type="text" onChange={e => setData({ ...data, expire: e.target.value })} id="formControlLgExpk8" class="form-control"
                                                            placeholder="MM/YYYY" />
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="form-outline">
                                                        <label class="form-label" for="formControlLgcvv8">Cvv</label>
                                                        <input type="password" onChange={e => setData({ ...data, cvv: e.target.value })} id="formControlLgcvv8" class="form-control" placeholder="Cvv" />
                                                    </div>
                                                </div>
                                            </div>
                                            <button class="btn btn-success btn-lg btn-block">Pay now</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    :

                    <div class="d-flex justify-content-center align-items-center mb-5">
                        <div class="d-flex flex-row align-items-center">
                            <div class="justify-content-between mt-2">
                                <span className='mx-2' style={{ fontWeight: 'bold', fontSize: '30px', color: 'green' }}><i class="bi bi-check-circle"></i></span><br />
                                <span className='mx-2' style={{ fontWeight: 'bold', fontSize: '20px', color: 'green' }}>Your Payment Successfully Done!</span>
                                <br />
                                <Link to='/'> <button type="button" style={{ color: 'dark' }} className="btn btn-light"> Go Homepage </button>
                                </Link>
                            </div>
                        </div>
                    </div>
            }

        </div>
    )
}

export default Payment

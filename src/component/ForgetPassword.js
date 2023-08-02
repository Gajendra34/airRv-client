import React from 'react'
import logo from './logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'



import { useRef } from 'react'



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';






function ForgetPassword() {


    const emailRef = useRef(null);
    const [email1, setEmail1] = useState('');
    // console.log(email1)

    const navigate = useNavigate();
    const [auth, setAuth] = useState('');


    const [data, setData] = useState({
        email: ''
    })

    const [data1, setData1] = useState({
        code: '',
        password: '',
        confirmpassword: '',
    })

    const handleSubmit1 = (event) => {
        event.preventDefault();
        axios.post('https://airrv-travel.onrender.com/forgetpassword/' + email1, data1)
            .then(res => {
                if (res.data.Status === 'Success') {

                    setTimeout(() => {
                        navigate('/')
                    }, 4000);

                    toast.success('Password Change succesfully', {
                        position: "bottom-left",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
                else {
                    toast.error(res.data.Error, {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });

                }
            }).catch(err => console.log(err))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // console.log(emailRef.current.value)
        setEmail1(emailRef.current.value)

        axios.post('https://airrv-travel.onrender.com/sendotp', data)
            .then(res => {
                if (res.data.Status === 'Success') {

                    setTimeout(() => {
                        setAuth(true)
                    }, 4000);

                    toast.success('OTP send succesfully', {
                        position: "bottom-left",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
                else {
                    setAuth(false);
                    toast.error(res.data.Error, {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            }).catch(err => console.log(err))
    }



    useEffect(() => {
        axios.get('https://airrv-travel.onrender.com/')
            .then(res => {
                if (res.data.Status === 'Success') {
                    if (res.data.role === 'customer') {
                        navigate('/')
                    }
                    else {
                        // navigate('/')
                    }
                }
                else {
                    // navigate('/')
                }
            })
    },[])

    const handleFalse = () => {
        setAuth(false)
    }







    return (
        <>
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
                            <li className=" li1 nav-item mx-3">
                                <Link to="/login" style={{ width: 'fit-content' }} className="nav-link active" aria-current="page" href="#">Login</Link>
                            </li>
                            <li className="nav-item mx-4">
                                <a className="nav-link disabled">Change Password</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <hr />






            <section class="vh-100 gradient-custom">
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-12 col-md-8 col-lg-6 col-xl-5">

                            <div class="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                                {
                                    auth ?
                                        <div class="card-body p-5 text-center">
                                            <form class="mb-md-5 mt-md-4 pb-5" onSubmit={handleSubmit1}>
                                                <h2 class="fw-bold mb-2 text-uppercase">Password Reset</h2>
                                                {/* <div className='text-danger'>
                                                </div> */}
                                                <div class="form-floating form-outline form-white mb-4">
                                                    <input type="text" id="typeEmailX" onChange={e => setData1({ ...data1, code: e.target.value })} class="form-control form-control-lg " placeholder='email' />
                                                    <label class="form-label text-dark" for="typeEmailX">OTP code</label>
                                                </div>
                                                <div class="form-floating form-outline form-white mb-4">
                                                    <input type="password" id="typeEmailX2" onChange={e => setData1({ ...data1, password: e.target.value })} class="form-control form-control-lg " placeholder='Reset Password2' />
                                                    <label class="form-label text-dark" for="typeEmailX">Password</label>
                                                </div>
                                                <div class="form-floating form-outline form-white mb-4">
                                                    <input type="password" id="typeEmailX1" onChange={e => setData1({ ...data1, confirmpassword: e.target.value })} class="form-control form-control-lg " placeholder='Reset Password1' />
                                                    <label class="form-label text-dark" for="typeEmailX">Confirm Password</label>
                                                </div>
                                                <div className='d-flex'>
                                                    <button class="btn btn-outline-light btn-lg" type="submit">Change Password</button>
                                                    <button onClick={handleFalse} class="btn btn-outline-light btn-lg mx-2" type="submit">Back</button>
                                                </div>
                                                <ToastContainer />
                                            </form>
                                            {/* <div>
                                        <Link to='/login' class="text-white-50 fw-bold">Login</Link>
                                    </div> */}
                                        </div>
                                        :
                                        <div class="card-body p-5 text-center">
                                            <form class="mb-md-5 mt-md-4 pb-5" onSubmit={handleSubmit}>
                                                <h2 class="fw-bold mb-2 text-uppercase">Password Reset</h2>

                                                <div className='text-danger'>

                                                </div>
                                                <div class="form-floating form-outline form-white mb-4">
                                                    <input type="email" ref={emailRef} id="typeEmailX" onChange={e => setData({ ...data, email: e.target.value })} class="form-control form-control-lg " placeholder='Reset Password' />
                                                    <label class="form-label text-dark" for="typeEmailX">Email</label>
                                                </div>
                                                <button class="btn btn-outline-light btn-lg" type="submit">Send OTP</button>
                                                <ToastContainer />
                                            </form>
                                            {/* <div>
                                        <Link to='/login' class="text-white-50 fw-bold">Login</Link>
                                    </div> */}
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}

export default ForgetPassword

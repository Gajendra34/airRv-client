import React from 'react'
import { Link } from 'react-router-dom'
import logo from './logo-travel.png'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Forgotpass() {


    const [auth, setAuth] = useState('');
    const [data, setData] = useState({
        oldpassword: '',
        newpassword: '',
        confirmpassword: ''
    })

    const navigate = useNavigate();



    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:3434/')
            .then(res => {
                if (res.data.Status === 'Success') {
                    if (res.data.role === 'customer') {
                        // navigate('/bookingdetails')
                        // setCus_id(res.data.id)
                    }
                    else {
                        navigate('/')
                    }
                }
                else {
                    navigate('/')
                }
            })
    },[])


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:3434/changepassword', data)
            .then(res => {
                if (res.data.Status === 'Success') {


                    setTimeout(() => {
                        setAuth(true);
                        axios.get('http://localhost:3434/logout')
                            .then(res => {
                                // setAuth(true)
                            })
                            .catch(err => (console.log(err)))
                    }, 5000)


                    toast.success('Password reset succesfully', {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    // navigate('/login')
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



    const handleLogout = () => {

    }









    return (
        <div>

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
                            {
                                auth ?
                                    <>
                                        <h2>Pleease Login Now!</h2>
                                        <Link to='/login'><button type="submit" class="btn" style={{ backgroundColor: '#FF385C', color: 'white', width: '30vh' }}>Login</button></Link>
                                    </>
                                    :
                                    <div class="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                                        <div class="card-body p-5 text-center">
                                            <form onSubmit={handleSubmit} class="mb-md-5 mt-md-4 pb-5">
                                                <h2 class="fw-bold mb-2 text-uppercase">Password Reset</h2>

                                                <div className='text-danger'>

                                                </div>
                                                <div class="form-floating form-outline form-white mb-4">
                                                    <input type="password" onChange={e => setData({ ...data, oldpassword: e.target.value })} id="typeEmailX" class="form-control form-control-lg " placeholder='Reset Password' />
                                                    <label class="form-label text-dark" for="typeEmailX">Old Password</label>
                                                </div>
                                                <div class="form-floating form-outline form-white mb-4">
                                                    <input type="password" onChange={e => setData({ ...data, newpassword: e.target.value })} id="typeEmailX" class="form-control form-control-lg " placeholder='Reset Password' />
                                                    <label class="form-label text-dark" for="typeEmailX">New Password</label>
                                                </div>
                                                <div class="form-floating form-outline form-white mb-4">
                                                    <input type="password" onChange={e => setData({ ...data, confirmpassword: e.target.value })} id="typeEmailX" class="form-control form-control-lg " placeholder='Reset Password' />
                                                    <label class="form-label text-dark" for="typeEmailX">Confirm Password</label>
                                                </div>
                                                <button class="btn btn-outline-light btn-lg px-5" onClick={handleLogout} type="submit">RESET PASSWORD</button>
                                                <ToastContainer />
                                            </form>
                                            <div>
                                                <Link to='/login' class="text-white-50 fw-bold">Login</Link>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Forgotpass

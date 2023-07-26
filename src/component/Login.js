import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import logo from './logo-travel.png';


function Login() {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const [error, setError] = useState('');

    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://airrv-travel.onrender.com/login', values)
            .then(res => {
                if (res.data.Status === 'Success') {
                    navigate('/')
                } else {
                    setError(res.data.Error)
                }
            })
            .then(err => console.log(err))
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
                            {/* <li className=" li1 nav-item mx-3">
                                <Link to="/addtocart" style={{ width: 'fit-content' }} className="nav-link active" aria-current="page" href="#">Add to Cart</Link>
                            </li> */}
                            <li className="nav-item mx-4">
                                <a className="nav-link disabled">Login</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <hr />


            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid" alt="Phone image" />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <h1>Please login to your account</h1>
                            <div className='text-danger'>
                                {error && error}
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating form-outline mb-4">
                                    <input type="email" onChange={e => setValues({ ...values, email: e.target.value })} id="form1Example13" placeholder="Email address"
                                        className="form-control form-control-lg" />
                                    <label className="form-label" htmlFor="floatingInput form1Example13">Email address</label>
                                </div>

                                <div className="form-floating form-outline mb-4">
                                    <input type="password" onChange={e => setValues({ ...values, password: e.target.value })} id="form1Example23" placeholder="Password"
                                        className="form-control form-control-lg" />
                                    <label className="form-label" htmlFor="floatingInput form1Example23">Password</label>
                                </div>

                                <div className="justify-content-around mb-4 text-dark">
                                    <Link to='/forgetpassword' href="#!">Forgot password?</Link>
                                </div>
                                <button type="submit" className="btn btn-outline-primary btn-lg btn-block">Login</button>

                                <p className=" text-muted mt-5 mb-0">Don't have an account?
                                    <Link to='/signup'><a href="#!" className="fw-bold text-danger"><u>Register here</u></a></Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login

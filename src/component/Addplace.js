import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';
import { Link } from 'react-router-dom';


function Addplace() {

    const [values, setValues] = useState({
        category: '',
        city: '',
        country: '',
        rating: '',
        about: '',
        price: '',
        owner: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
        image5: ''
    })

    const navigate = useNavigate();

    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("category", values.category);
        formData.append("city", values.city);
        formData.append("country", values.country);
        formData.append("rating", values.rating);
        formData.append("about", values.about);
        formData.append("price", values.price);
        formData.append("owner", values.owner);
        formData.append("image1", values.image1);
        formData.append("image2", values.image2);
        formData.append("image3", values.image3);
        formData.append("image4", values.image4);
        formData.append("image5", values.image5);

        axios.post('https://airrv-travel.onrender.com/addplace', formData)
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











            <div>
                <section className="">
                    <div className="container py-5 h-100">
                        <div className="row d-flex align-items-center justify-content-center h-100">
                            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                                <div className='p-2 d-flex justify-content-center fs-1'>
                                    <p>Add Place</p>
                                </div>
                                <div className='text-danger'>
                                    {error && error}
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-floating form-outline mb-4">
                                        <input type="text" onChange={e => setValues({ ...values, category: e.target.value })} id="form1Example13" placeholder="Compant Name"
                                            className="form-control form-control-lg border-dark" />
                                        <label className="form-label" htmlFor="floatingInput form1Example13">Category</label>
                                    </div>
                                    <div className="form-floating form-outline mb-4">
                                        <input type="text" onChange={e => setValues({ ...values, city: e.target.value })} id="form1Example13" placeholder="about product"
                                            className="form-control form-control-lg border-dark" />
                                        <label className="form-label" htmlFor="floatingInput form1Example13">City</label>
                                    </div>
                                    <div className="form-floating form-outline mb-4">
                                        <input type="text" onChange={e => setValues({ ...values, country: e.target.value })} id="form1Example13" placeholder="price"
                                            className="form-control form-control-lg border-dark" />
                                        <label className="form-label" htmlFor="floatingInput form1Example13">Country</label>
                                    </div>
                                    <div className="form-floating form-outline mb-4">
                                        <input type="text" onChange={e => setValues({ ...values, rating: e.target.value })} id="form1Example13" placeholder="price"
                                            className="form-control form-control-lg border-dark" />
                                        <label className="form-label" htmlFor="floatingInput form1Example13">Rating(In 5)</label>
                                    </div>
                                    <div className="form-floating form-outline mb-4">
                                        <input type="text" onChange={e => setValues({ ...values, about: e.target.value })} id="form1Example13" placeholder="price"
                                            className="form-control form-control-lg border-dark" />
                                        <label className="form-label" htmlFor="floatingInput form1Example13">about place</label>
                                    </div>
                                    <div className="form-floating form-outline mb-4">
                                        <input type="text" onChange={e => setValues({ ...values, price: e.target.value })} id="form1Example13" placeholder="price"
                                            className="form-control form-control-lg border-dark" />
                                        <label className="form-label" htmlFor="floatingInput form1Example13">Price(in Rupay)</label>
                                    </div>
                                    <div className="form-floating form-outline mb-4">
                                        <input type="text" onChange={e => setValues({ ...values, owner: e.target.value })} id="form1Example13" placeholder="Compant Name"
                                            className="form-control form-control-lg border-dark" />
                                        <label className="form-label" htmlFor="floatingInput form1Example13">Owner name</label>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label className="form-label" for="inputGroupFile01">Place Image1</label>
                                        <input type="file" onChange={e => setValues({ ...values, image1: e.target.files[0] })} className="form-control border-dark" id="inputGroupFile01" />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label className="form-label" for="inputGroupFile01">Place Image2</label>
                                        <input type="file" onChange={e => setValues({ ...values, image2: e.target.files[0] })} className="form-control border-dark" id="inputGroupFile01" />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label className="form-label" for="inputGroupFile01">Place Image3</label>
                                        <input type="file" onChange={e => setValues({ ...values, image3: e.target.files[0] })} className="form-control border-dark" id="inputGroupFile01" />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label className="form-label" for="inputGroupFile01">Place Image4</label>
                                        <input type="file" onChange={e => setValues({ ...values, image4: e.target.files[0] })} className="form-control border-dark" id="inputGroupFile01" />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label className="form-label" for="inputGroupFile01">Place Image5</label>
                                        <input type="file" onChange={e => setValues({ ...values, image5: e.target.files[0] })} className="form-control border-dark" id="inputGroupFile01" />
                                    </div>
                                    <button type="submit" className="btn btn-outline-warning btn-lg btn-block">Add Product</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Addplace

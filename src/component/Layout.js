import React from 'react'
//rfce
import { Link, Outlet, useNavigate } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Card from 'react-bootstrap/Card';
import logo from './logo-travel.png'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'


function Header() {

    const [auth, setAuth] = useState('');
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [cus_id, setCus_id] = useState('');

    const navigate = useNavigate();

    const [data, setData] = useState([]);


    const [data1, setData1] = useState([]);


    const [data2, setData2] = useState([]);


    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:3434/')
            .then(res => {
                if (res.data.Status === 'Success') {
                    if (res.data.role === 'customer') {
                        setAuth(true);
                        setImage(res.data.image);
                        setName(res.data.name);
                        setCus_id(res.data.id);
                    }
                    else {
                        setAuth(false)
                    }
                }
                else {
                    setAuth(false)
                }
            })

        axios.get('http://localhost:3434/Aview')
            .then(res => {
                if (res.data.Status === 'Success') {
                    setData(res.data.Result)
                }
                else {
                    alert('Error in add item');
                }
            })

    },[])

    const handleLogout = () => {
        axios.get('http://localhost:3434/logout')
            .then(res => {
                setAuth(false)
            })
            .catch(err => (console.log(err)))
    }

    const handleShow = (id) => {
        axios.get('http://localhost:3434/showImg/' + id)
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

    const handleShow1 = (category) => {
        axios.get('http://localhost:3434/showplaces/' + category)
            .then(res => {
                if (res.data.Status === 'Success') {
                    setData2(res.data.Result)
                }
                else {
                    alert('Error in show images');
                }
            })
            .catch(err => (console.log(err)))
    }

    const allDetail = (id) => {
        axios.get('http://localhost:3434/placedetail/' + id)
            .then(res => {
                if (res.data.Status === 'Success') {
                    navigate('/placedetails/' + id);
                }
                else {
                    alert('Error in show all details of place');
                }
            })
            .catch(err => (console.log(err)))
    }


    const [showcontent, setShowcontent] = useState('');

    const showcon = () => {
        setShowcontent(true);
    }

    const showcon1 = () => {
        setShowcontent(false);
    }

    // const goBookingHistory = () => {
    //     navigate('/bookingdetails/' + cus_id)
    // }


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-transparent w-100">
                <div className="navbar11 container-fluid">
                    <Link to="/" title='airRv' className="navbar-brand fs-4 p-3"><img src={logo} width="50px" /></Link>
                    <span style={{ fontSize: '20px', color: 'RGB(255,0,0)', position: 'relative', left: "-20px", top: '12px' }}><b>airRv</b></span>
                    <button className="navbar-toggler shodow-none border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="sidebar offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header border-bottom">
                            <h5 className="offcanvas-title text-success" id="offcanvasNavbarLabel">airRv</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="li1 nav-item">
                                    <Link to="/" className="nav-link active" style={{ width: 'fit-content' }} aria-current="page" href="#">Home</Link>
                                </li>
                                <li className="li1 nav-item mx-2">
                                    <a className="nav-link disabled" style={{ width: 'fit-content' }} href="#">About</a>
                                </li>
                                <li className="li1 nav-item mx-2">
                                    {/* <Link to="/addtocart" className="nav-link active" style={{ width: 'fit-content' }} href="#">Add To Cart  <span className="cart-qty">{tot_pro_atc}</span>  </Link> */}
                                </li>
                            </ul>
                            <div className="d-flex align-items-center gap-3">

                                {
                                    auth ?
                                        <>
                                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                                {/* <li className="li1 nav-item mx-2">
                                                    <Link to="/addproduct" className="nav-link active" style={{ width: 'fit-content' }} href="#">Add Product</Link>
                                                    </li> */}
                                            </ul>

                                            {/* {<img src={'http://localhost:3434/images/' + image}
                                                className=" rounded-circle" height="38" alt="Rv" />} */}

                                            <div className="dropdown" style={{ position: 'relative', right: '20px' }}>
                                                <a className=" dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {<img src={'http://localhost:3434/images/' + image}
                                                        className=" rounded-circle" height="38" alt="Rv" />}
                                                </a>
                                                <ul
                                                    className="dropdown-menu dropdown-menu-end"
                                                    aria-labelledby="dropdownMenuLink">
                                                    <li>
                                                        <div className="dropdown-item text-primary"><spa className="text-dark">Hello! </spa>{name}</div>
                                                    </li>
                                                    <hr />
                                                    <li >
                                                        <Link to="/addplace" className="dropdown-item" href="#">Add place/Category</Link>
                                                    </li>
                                                    <li >
                                                        <Link to={'/bookingdetails/' + cus_id} className="dropdown-item" href="#">Booking Detail</Link>
                                                    </li>
                                                    <li >
                                                        <Link to='/changepassword' className="dropdown-item" href="#">Change Password</Link>
                                                    </li>
                                                    <li >
                                                        <a className="dropdown-item" href="#">Contact</a>
                                                    </li>
                                                    <li>
                                                        <Link to="/" onClick={handleLogout} className="dropdown-item btn btn-outline-danger">Logout</Link>
                                                    </li>
                                                </ul>
                                            </div>

                                            {/* <div className="text-primary">{name}</div> */}

                                            {/* <Link to="/" onClick={handleLogout} className="btn btn-outline-danger">Logout</Link> */}
                                        </>
                                        :
                                        <div>
                                            <Link to="/login" className="btn btn-outline-success">Sign in</Link>
                                        </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </nav>


            <span style={{ color: 'rgb(169,169,169)' }}><hr /></span>


            <div className="scrollmenu">
                <Link to='/' onClick={showcon1}><p><img src="https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg" height="25px" /></p>Amazing views</Link>
                <Link to='/' onClick={() => { showcon(); handleShow1('Rooms') }}><p><img src="https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg" height="25px" /></p>Rooms</Link>
                <Link to='/' onClick={() => { showcon(); handleShow1('Lakefront') }}><p><img src="https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg" height="25px" /></p>Lakefront</Link>
                <Link to='/' onClick={() => { showcon(); handleShow1('Treehouses') }}><p><img src="https://a0.muscache.com/pictures/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e.jpg" height="25px" /></p>Treehouses</Link>
                <Link to='/' onClick={() => { showcon(); handleShow1('Beach') }}><p><img src="https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg" height="25px" /></p>Beach</Link>
                <Link to='/' onClick={() => { showcon(); handleShow1('Amazingpools') }}><p><img src="https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg" height="25px" /></p>Amazing pools</Link>
                <Link to='/' onClick={() => { showcon(); handleShow1('Farms') }}><p><img src="https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg" height="25px" /></p>Farms</Link>
                <Link to='/' onClick={() => { showcon(); handleShow1('Countryside') }}><p><img src="https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg" height="25px" /></p>Countryside</Link>
                <Link to='/' onClick={() => { showcon(); handleShow1('Cabins') }}><p><img src="https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg" height="25px" /></p>Cabins</Link>
                <Link to='/' onClick={() => { showcon(); handleShow1('Tropical') }}><p><img src="https://a0.muscache.com/pictures/ee9e2a40-ffac-4db9-9080-b351efc3cfc4.jpg" height="25px" /></p>Tropical</Link>
                <Link to='/' onClick={() => { showcon(); handleShow1('Historicalhomes') }}><p><img src="https://a0.muscache.com/pictures/33dd714a-7b4a-4654-aaf0-f58ea887a688.jpg" height="25px" /></p>Historical homes</Link>
                <Link to='/' onClick={() => { showcon(); handleShow1('Arctic') }}><p><img src="https://a0.muscache.com/pictures/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg" height="25px" /></p>Arctic</Link>
                <Link to='/' onClick={() => { showcon(); handleShow1('Camping') }}><p><img src="https://a0.muscache.com/pictures/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg" height="25px" /></p>Camping</Link>
                <Link to='/' onClick={() => { showcon(); handleShow1('Earthhomes') }}><p><img src="https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg" height="25px" /></p>Earth homes</Link>
                <Link to='/' onClick={() => { showcon(); handleShow1('Islands') }}><p><img src="https://a0.muscache.com/pictures/8e507f16-4943-4be9-b707-59bd38d56309.jpg" height="25px" /></p>Islands</Link>
            </div>


            <span style={{ color: 'rgb(169,169,169)' }}><hr /></span>


            {
                showcontent ? <section>
                    <div className='my-5 mx-4'>
                        <div className='row' style={{ display: 'flex' }}>
                            {
                                data2.map((user, index) => {
                                    return <Card key={index} className='row container' style={{ width: '50vh', height: "80vh", border: '0px solid' }}>
                                        <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                                            {/* <div className="carousel-indicators">
                                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>
                                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="4" aria-label="Slide 5"></button>
                                        </div> */}
                                            <div className="cross-button1 banner carousel-inner" style={{ borderRadius: '15px' }}>
                                                <div onClick={e => allDetail(user._id)} className="carousel-item active Slide 1" style={{ cursor: 'pointer' }}>
                                                    <Card.Img src={'http://localhost:3434/images/' + user.image1} style={{ width: '350px', height: '300px' }} className="d-block w-100" height="300px" alt="..." />
                                                </div>
                                                {/* <div className="carousel-item">
                                                    <Card.Img src={'http://localhost:3434/images/' + user.image2} style={{ width: '350px', height: '300px' }} className="d-block w-100" height="300px" alt="..." />
                                                </div>
                                                <div className="carousel-item">
                                                    <Card.Img src={'http://localhost:3434/images/' + user.image3} style={{ width: '350px', height: '300px' }} className="d-block w-100" height="300px" alt="..." />
                                                </div>
                                                <div className="carousel-item">
                                                    <Card.Img src={'http://localhost:3434/images/' + user.image4} style={{ width: '350px', height: '300px' }} className="d-block w-100" height="300px" alt="..." />
                                                </div>
                                                <div className="carousel-item">
                                                    <Card.Img src={'http://localhost:3434/images/' + user.image5} style={{ width: '350px', height: '300px' }} className="d-block w-100" height="300px" alt="..." />
                                                </div> */}
                                                {/* <div className='cross-button2'>
                                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                                                    <span style={{ backgroundColor: 'black', borderRadius: "40px" }} className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Previous</span>
                                                </button>
                                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                                                    <span style={{ backgroundColor: 'black', borderRadius: "40px" }} className="carousel-control-next-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Next</span>
                                                </button>
                                            </div> */}


                                                <div className='cross-button2' style={{ position: 'relative', top: '5px', left: '5px' }}>
                                                    <button onClick={e => handleShow(user._id)} type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                                        <i class="bi bi-images"></i> Show all Photos
                                                    </button>

                                                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                        <div class="modal-dialog">
                                                            {
                                                                data1.map((user, index) => {
                                                                    return <div key={index} class="modal-content">
                                                                        <div class="modal-header">
                                                                            <h1 class="modal-title fs-5" id="staticBackdropLabel">All Images</h1>
                                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div class="modal-header">
                                                                            <h1 class="modal-title fs-5" id="staticBackdropLabel">{user.about}</h1>
                                                                        </div>
                                                                        <div class="modal-body" style={{ padding: '20px' }}>
                                                                            <Card.Img src={'http://localhost:3434/images/' + user.image1} style={{ width: '350px', height: '300px', padding: '10px' }} className="d-block w-100" height="300px" alt="..." />
                                                                            <Card.Img src={'http://localhost:3434/images/' + user.image2} style={{ width: '350px', height: '300px', padding: '10px' }} className="d-block w-100" height="300px" alt="..." />
                                                                            <Card.Img src={'http://localhost:3434/images/' + user.image3} style={{ width: '350px', height: '300px', padding: '10px' }} className="d-block w-100" height="300px" alt="..." />
                                                                            <Card.Img src={'http://localhost:3434/images/' + user.image4} style={{ width: '350px', height: '300px', padding: '10px' }} className="d-block w-100" height="300px" alt="..." />
                                                                            <Card.Img src={'http://localhost:3434/images/' + user.image5} style={{ width: '350px', height: '300px', padding: '10px' }} className="d-block w-100" height="300px" alt="..." />
                                                                        </div>

                                                                    </div>
                                                                })

                                                            }
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>

                                        </div>
                                        <Card.Body>
                                            <Card.Title>
                                                <p style={{ color: 'black' }} >{user.city},{user.country}</p>
                                                <i className="bi bi-star-fill"> {user.rating}</i>
                                            </Card.Title>
                                            <i>{user.about}</i>
                                            <Card.Title><p style={{ color: 'black' }} ><i className="bi bi-currency-rupee"></i><b>{parseInt(user.price).toLocaleString()}</b> night</p></Card.Title>
                                        </Card.Body>
                                    </Card>
                                })
                            }
                        </div>
                    </div>
                </section>
                    :
                    <section>
                        <div className='my-5 mx-4'>
                            <div className='row' style={{ display: 'flex' }}>
                                {
                                    data.map((user, index) => {
                                        return <Card key={index} className='row container' style={{ width: '50vh', height: "80vh", border: '0px solid' }}>
                                            <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                                                {/* <div className="carousel-indicators">
                                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>
                                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="4" aria-label="Slide 5"></button>
                                        </div> */}
                                                <div className="cross-button1 banner carousel-inner" style={{ borderRadius: '15px' }}>
                                                    <div onClick={e => allDetail(user._id)} className="carousel-item active Slide 1" style={{ cursor: 'pointer' }}>
                                                        <Card.Img src={'http://localhost:3434/images/' + user.image1} style={{ width: '350px', height: '300px' }} className="d-block w-100" height="300px" alt="..." />
                                                    </div>
                                                    {/* <div className="carousel-item">
                                                        <Card.Img src={'http://localhost:3434/images/' + user.image2} style={{ width: '350px', height: '300px' }} className="d-block w-100" height="300px" alt="..." />
                                                    </div>
                                                    <div className="carousel-item">
                                                        <Card.Img src={'http://localhost:3434/images/' + user.image3} style={{ width: '350px', height: '300px' }} className="d-block w-100" height="300px" alt="..." />
                                                    </div>
                                                    <div className="carousel-item">
                                                        <Card.Img src={'http://localhost:3434/images/' + user.image4} style={{ width: '350px', height: '300px' }} className="d-block w-100" height="300px" alt="..." />
                                                    </div>
                                                    <div className="carousel-item">
                                                        <Card.Img src={'http://localhost:3434/images/' + user.image5} style={{ width: '350px', height: '300px' }} className="d-block w-100" height="300px" alt="..." />
                                                    </div> */}
                                                    {/* <div className='cross-button2'>
                                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                                                    <span style={{ backgroundColor: 'black', borderRadius: "40px" }} className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Previous</span>
                                                </button>
                                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                                                    <span style={{ backgroundColor: 'black', borderRadius: "40px" }} className="carousel-control-next-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Next</span>
                                                </button>
                                            </div> */}


                                                    <div className='cross-button2' style={{ position: 'relative', top: '5px', left: '5px' }}>
                                                        <button onClick={e => handleShow(user._id)} type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                                            <i class="bi bi-images"></i> Show all Photos
                                                        </button>

                                                        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                            <div class="modal-dialog">
                                                                {
                                                                    data1.map((user, index) => {
                                                                        return <div key={index} class="modal-content">
                                                                            <div class="modal-header">
                                                                                <h1 class="modal-title fs-5" id="staticBackdropLabel">All Images</h1>
                                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                            </div>
                                                                            <div class="modal-header">
                                                                                <h1 class="modal-title fs-5" id="staticBackdropLabel">{user.about}</h1>
                                                                            </div>
                                                                            <div class="modal-body" style={{ padding: '20px' }}>
                                                                                <Card.Img src={'http://localhost:3434/images/' + user.image1} style={{ width: '350px', height: '300px', padding: '10px' }} className="d-block w-100" height="300px" alt="..." />
                                                                                <Card.Img src={'http://localhost:3434/images/' + user.image2} style={{ width: '350px', height: '300px', padding: '10px' }} className="d-block w-100" height="300px" alt="..." />
                                                                                <Card.Img src={'http://localhost:3434/images/' + user.image3} style={{ width: '350px', height: '300px', padding: '10px' }} className="d-block w-100" height="300px" alt="..." />
                                                                                <Card.Img src={'http://localhost:3434/images/' + user.image4} style={{ width: '350px', height: '300px', padding: '10px' }} className="d-block w-100" height="300px" alt="..." />
                                                                                <Card.Img src={'http://localhost:3434/images/' + user.image5} style={{ width: '350px', height: '300px', padding: '10px' }} className="d-block w-100" height="300px" alt="..." />
                                                                            </div>

                                                                        </div>
                                                                    })

                                                                }
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>

                                            </div>
                                            <Card.Body>
                                                <Card.Title>
                                                    <p style={{ color: 'black' }} >{user.city},{user.country}</p>
                                                    <i className="bi bi-star-fill"> {user.rating}</i>
                                                </Card.Title>
                                                <i>{user.about}</i>
                                                <Card.Title><p style={{ color: 'black' }} ><i className="bi bi-currency-rupee"></i><b>{parseInt(user.price).toLocaleString()}</b> night</p></Card.Title>
                                            </Card.Body>
                                        </Card>
                                    })
                                }
                            </div>
                        </div>
                    </section>
            }



        </>
    )
}

export default Header


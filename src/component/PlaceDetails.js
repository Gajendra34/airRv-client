import React from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Card from 'react-bootstrap/Card';
import logo from './logo-travel.png'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'






function PlaceDetails() {

    const { id } = useParams();


    const [auth, setAuth] = useState('');
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [cus_id, setCus_id] = useState('');


    const [data, setData] = useState([]);

    axios.defaults.withCredentials = true;

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://airrv-travel.onrender.com/')
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

        axios.get('https://airrv-travel.onrender.com/placedetail/' + id)
            .then(res => {
                if (res.data.Status === 'Success') {
                    setData(res.data.Result)
                }
                else {
                    alert('Error in show images');
                }
            })
    }, [])


    const handleLogout = () => {
        axios.get('https://airrv-travel.onrender.com/logout')
            .then(res => {
                setAuth(false)
                navigate('/placedetails/' + id)
            })
            .catch(err => (console.log(err)))
    }


    const [date, setDate] = useState('');

    const calculateDate = () => {
        var t1 = document.getElementById('time1').value;
        var t2 = document.getElementById('time2').value;

        const date1 = new Date(t1);
        const date2 = new Date(t2);

        const time = Math.abs(date2 - date1);

        if (t2.length !== 0) {
            const days = Math.ceil(time / (1000 * 60 * 60 * 24));
            setDate(days)
        }
    }





    const goBookingPage = () => {
        navigate('/booking', {
            state: {
                date1: document.getElementById('time1').value,
                date2: document.getElementById('time2').value,
                date: date,
                id: id,
                owner: data.map((a, b) => { return (a.owner) }),
                about: data.map((a, b) => { return (a.about) }),
                category: data.map((a, b) => { return (a.category) }),
                rating: data.map((a, b) => { return (a.rating) }),
                price: data.map((a, b) => { return (a.price) }),
                image1: data.map((a, b) => { return (a.image1) }),
                cus_id: cus_id,
            }
        })
    }
    // console.log(data.owner);



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

                                            {/* {<img src={'https://airrv-travel.onrender.com/images/' + image}
                                                className=" rounded-circle" height="38" alt="Rv" />} */}

                                            <div className="dropdown" style={{ position: 'relative', right: '20px' }}>
                                                <a className=" dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {<img src={'https://airrv-travel.onrender.com/images/' + image}
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
                                                        <Link to='/contact' className="dropdown-item" href="#">Contact</Link>
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



            <section>
                <div className='my-5 mx-5'>
                    <div className='row' style={{ display: 'flex' }}>
                        {
                            data.map((user, index) => {
                                return <Card key={index} className='row' style={{ width: '200vh', border: '0px solid' }}>
                                    <Card.Body>
                                        <Card.Title>
                                            <h2>{user.about}</h2>
                                            {/* <p style={{ color: 'black' }} >city,country</p> */}
                                            <i style={{ fontSize: '15px' }} className="bi bi-star-fill"> {user.rating} . Superhost . </i><i style={{ fontSize: '15px' }} class="bi bi-geo-alt"> {user.city},{user.country}</i>
                                        </Card.Title>

                                        {/* <Card.Title><p style={{ color: 'black' }} ><i className="bi bi-currency-rupee"></i><b>{user.price}</b> night</p></Card.Title> */}
                                    </Card.Body>
                                    <div id="carouselExampleDark" className="row" data-bs-ride="carousel">
                                        {/* <div class="row" style={{ position: 'relative', justifyContent: 'center' }}> */}
                                        <div class="col-lg-6">
                                            <img src={'https://airrv-travel.onrender.com/images/' + user.image1}
                                                class="w-100 shadow-1-strong mb-2"
                                                alt="Boat on Calm Water"
                                                style={{ borderRadius: '13px 0px 0px 13px' }}
                                                height="440px"
                                            />
                                        </div>

                                        <div class="col-lg-3 mb-4 mb-lg-0" >
                                            <img src={'https://airrv-travel.onrender.com/images/' + user.image2}
                                                class="w-100 shadow-1-strong mb-2"
                                                alt="Mountains in the Clouds"
                                                // height="48.3%"
                                                height="216px"

                                            />

                                            <img src={'https://airrv-travel.onrender.com/images/' + user.image3}
                                                class="w-100 shadow-1-strong mb-2"
                                                alt="Boat on Calm Water"
                                                // height="48.3%"
                                                height="216px"
                                            />
                                        </div>

                                        <div class="col-lg-3 mb-4 mb-lg-0">
                                            <img src={'https://airrv-travel.onrender.com/images/' + user.image4}
                                                class="w-100 shadow-1-strong mb-2"
                                                alt="Waves at Sea"
                                                // height="48.3%"
                                                height="216px"
                                                style={{ borderRadius: '0px 13px 0px 0px' }}
                                            />

                                            <img src={'https://airrv-travel.onrender.com/images/' + user.image5}
                                                class="w-100 shadow-1-strong mb-2"
                                                alt="Yosemite National Park"
                                                // height="48.3%"
                                                height="216px"
                                                style={{ borderRadius: '0px 0px 13px 0px' }}
                                            />
                                        </div>
                                        {/* </div> */}
                                    </div>

                                    <Card.Title><h3>{user.category}, hosted by {user.owner} <a href='#host'><i style={{ fontSize: '40px', position: 'relative', top: '6px', left: '10px' }} class="bi bi-person-circle"></i></a></h3></Card.Title>
                                    <p>5 guests . 1 bedroom . 2 beds . 1 bathroom</p>

                                </Card>
                            })
                        }
                    </div>







                    <section>
                        <div class="row">
                            <div class="col-md-7 col-lg-7 col-xl-6 mb-4 mb-md-0" style={{ fontSize: '17px' }}>
                                <hr />
                                <br />
                                <div>
                                    <i class="bi bi-person-workspace"> </i><b> Great for remote work</b>
                                    <p style={{ color: '#505050' }}>Fast wifi at 68 Mbps, plus a dedicated workspace.</p>
                                </div>
                                <div>
                                    {
                                        data.map((a, b) => {
                                            return <>
                                                <i key={b} class="bi bi-file-person-fill"></i ><b> {a.owner} is a Superhost</b>
                                                <p style={{ color: '#505050' }}>Superhosts are experienced, highly rated hosts who are committed to providing great stays for their guests.</p>
                                            </>
                                        })
                                    }
                                </div>
                                <div>
                                    <i class="bi bi-x-circle"></i><b> Free cancellation for 48 hours.</b>
                                </div>
                                <br />

                                <hr />
                                <br />
                                <h3>What this place offers</h3>
                                <br />
                                <div>
                                    <span><i class="bi bi-water"> </i> River view</span>
                                </div>
                                <br />
                                <div>
                                    <span><i class="bi bi-person-workspace"> </i>Dedicated workspace</span>
                                </div>
                                <br />
                                <div>
                                    <span><i class="bi bi-car-front"></i> Free parking on premises</span>
                                </div>
                                <br />
                                <div>
                                    <span><i class="bi bi-wifi"></i> Fast wifi – 68 Mbps</span>
                                </div>
                                <br />
                                <div>
                                    <span><i class="bi bi-tv"></i> 32" HDTV with standard cable/satellite, cable/satellite TV</span>
                                </div>
                                <br />
                                <div>
                                    <span><i class="bi bi-camera"></i> Security cameras on property</span>
                                </div>
                                <br />
                                <hr />
                            </div>
                            <div class="col-md-5 col-lg-4 col-xl-4 offset-lg-1 offset-xl-2">

                                <div class="card" style={{ width: '21rem', boxShadow: '1px 1px 10px 0px #C0C0C0' }}>
                                    <div class="card-body">
                                        {
                                            data.map((a, b) => {
                                                return <div class="d-flex justify-content-between mt-2">
                                                    <span> <b><i class="bi bi-currency-rupee"></i>{parseInt(a.price).toLocaleString()} </b>night</span> <span><p><i class="bi bi-star-fill"></i> {a.rating} </p></span>
                                                </div>
                                            })
                                        }
                                        <hr />
                                        <form>
                                            <div class="mb-3">
                                                <b for="exampleInputEmail1" style={{ fontSize: '10px' }} class="form-label">CHECK-IN</b>
                                                <input type="date" placeholder='' class="form-control" onChange={() => { calculateDate() }} id="time1" aria-describedby="emailHelp" />
                                            </div>
                                            <div class="mb-3">
                                                <b for="exampleInputPassword1" style={{ fontSize: '10px' }} class="form-label">CHECK-OUT</b>
                                                <input type="date" placeholder='' class="form-control" onChange={() => { calculateDate() }} id="time2" />
                                            </div>
                                            {
                                                date.length !== 0 ?
                                                    < center > <button onClick={goBookingPage} type="submit" class="btn" style={{ backgroundColor: '#FF385C', color: 'white', width: '30vh' }}>Reserve</button></center>
                                                    :
                                                    < center > <button onClick={goBookingPage} type="submit" class="btn" style={{ backgroundColor: '#FF385C', color: 'white', width: '30vh' }} disabled>Reserve</button></center>
                                            }
                                            <center><p style={{ color: '#505050' }} >You won't be charged yet</p></center>
                                        </form>
                                        <hr />
                                        {
                                            data.map((a, b) => {
                                                return <>
                                                    <div key={b} class="d-flex justify-content-between mt-2">
                                                        <span><i class="bi bi-currency-rupee"></i>{parseInt(a.price).toLocaleString()}<i class="bi bi-x"></i>{date.length === 0 ? 1 : date} nights</span> <span><i class="bi bi-currency-rupee"></i>{date.length === 0 ? parseInt(a.price).toLocaleString() : (parseInt(date) * parseInt(a.price)).toLocaleString()}</span>
                                                    </div>
                                                    <hr />
                                                    <div class="d-flex justify-content-between mt-2">
                                                        <span>Weekly stay discount</span> <span><i class="bi bi-currency-rupee"></i>0.0</span>
                                                    </div>
                                                    <div class="d-flex justify-content-between mt-2">
                                                        <span>airRv service fee</span> <span style={{ color: 'green' }}><i class="bi bi-currency-rupee"></i>3,500</span>
                                                    </div>
                                                    <hr />
                                                    <div class="d-flex justify-content-between mt-2">
                                                        <span><b>Total before taxes</b></span><span><b><i class="bi bi-currency-rupee"></i>{date.length === 0 ? (parseInt(a.price) + parseInt(3500)).toLocaleString() : ((parseInt(date) * parseInt(a.price)) + parseInt(3500)).toLocaleString()}</b></span>
                                                    </div ></>
                                            })
                                        }
                                    </div>
                                </div>
                                <br />
                                <div class="card" style={{ width: '21rem', boxShadow: '1px 1px 10px 0px #C0C0C0' }}>
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between mt-2">
                                            {
                                                data.map((a, b) => {
                                                    return <>
                                                        <span> <b>This is a rare find.</b> {a.owner}'s place on Airbnb is usually fully booked.</span><span><i style={{ fontSize: '27px', color: '#FF385C' }} class="bi bi-gem"></i></span>
                                                    </>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* <div class="col-md-7 col-lg-7 col-xl-6 mb-4 mb-md-0" style={{ fontSize: '17px' }}>
                                <div>
                                    <span><i style={{ fontSize: '40px', position: 'relative', top: '6px', left: '10px' }} class="bi bi-person-circle"></i> Hosted by Ajesh</span>
                                </div>
                            </div> */}

                            <div id="host" class="container py-5 h-100">
                                {
                                    data.map((a, b) => {
                                        return <>
                                            <h2 key={b} h2>Hosted by {a.owner}</h2>
                                        </>
                                    })
                                }
                                <div class="row">
                                    <div class="col col-md-9 col-lg-7 col-xl-4">
                                        <div class="card" style={{ borderRadius: '15px', backgroundColor: '#9de2ff', boxShadow: '1px 1px 10px 0px #C0C0C0' }}>
                                            <div class="card-body p-4">
                                                <div class="d-flex text-black">
                                                    <div class="flex-shrink-0">
                                                        <i style={{ fontSize: '90px', position: 'relative', bottom: '30px' }} class="bi bi-person-circle"></i>
                                                        {/* style={{ width: '180px', borderRadius: '10px' }} */}
                                                    </div>
                                                    {
                                                        data.map((a, b) => {
                                                            return <div key={b} class="flex-grow-1 ms-3">
                                                                <h5 class="mb-1">{a.owner}</h5>
                                                                <p class="mb-2 pb-1" style={{ color: '#2b2a2a' }}><i class="bi bi-person-fill"></i>Superhost</p>
                                                                <p class="mb-2 pb-1" style={{ color: '#2b2a2a' }}>Joined in July 2018</p>
                                                                <div class="justify-content-start rounded-3 p-2 mb-2"
                                                                    style={{ backgroundColor: '#efefef' }}>
                                                                    <div>
                                                                        <p class="small text-muted mb-1"><i class="bi bi-person-check"></i> Identity verified</p>
                                                                    </div>
                                                                    <div>
                                                                        <p class="small text-muted mb-1"><i class="bi bi-star-fill"></i> Rating</p>
                                                                        <p class="mb-0">{a.rating}</p>
                                                                    </div>
                                                                </div>
                                                                {/* <div class="d-flex pt-1">
                                                            <button type="button" class="btn btn-outline-primary me-1 flex-grow-1">Chat</button>
                                                            <button type="button" class="btn btn-primary flex-grow-1">Follow</button>
                                                        </div> */}
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr />
                        </div>
                    </section>
                </div >
            </section >

















        </>
    )
}

export default PlaceDetails

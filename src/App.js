import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './component/Signup';
import Login from './component/Login';
import Layout from './component/Layout'
import Addplace from './component/Addplace';
import PlaceDetails from './component/PlaceDetails';
import Booking from './component/Booking';
import BookingDetails from './component/BookingDetails';
import ChangePassword from './component/ChangePassword'
import ForgetPassword from './component/ForgetPassword'
import Contact from './component/Contact';



function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
          </Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/Signup' element={<Signup />}></Route>
          <Route path='/addplace' element={<Addplace />}></Route>
          <Route path='/placedetails/:id' element={<PlaceDetails />}></Route>
          <Route path='/booking' element={<Booking />}></Route>
          <Route path='/bookingdetails/:id' element={<BookingDetails />}></Route>
          <Route path='/changepassword' element={<ChangePassword />}></Route>
          <Route path='/forgetpassword' element={<ForgetPassword />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
        </Routes >
      </BrowserRouter >
    </div >

  );
}

export default App;

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faPlay } from '@fortawesome/free-solid-svg-icons'; 
import Store from './components/Store';
import Login from './components/Login'
import Signup from './components/Signup';
import Checkout from './components/Checkout';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './components/Dashboard';
import UploadBeat from './components/UploadBeat';
import PaymentSuccess from './components/PaymentSuccess';
import LandingPage from './components/LandingPage';
import Account from './components/Account';
import ManageStore from './components/ManageStore';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="/upload-beat" element={<UploadBeat/>}/>
        <Route path="/store" element={<Store/>}/>
        <Route path="/manage-store" element={<ManageStore/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/payment-success" element={<PaymentSuccess/>}/>
        <Route path="/account" element={<Account/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

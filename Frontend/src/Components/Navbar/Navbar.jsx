import React, { useState } from 'react'
// import { BrowserRouter, Routes, Route } from "react-router-dom";

import './Navbar.css'
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [menu,SetMenu]=useState("SHOP");
  return (
    <div className='Navbar'>
        <div className="nav-logo">
            <img src={logo} alt=''/>
            <p>SHOPPER</p>
        </div>
       <div className="tops">
            <ul className='top'>
              <li onClick={()=>{SetMenu("SHOP")}}>
                <Link style={{textDecoration:'None'}} to='/'>SHOP</Link>
                {menu=="SHOP"?<hr></hr>:<></>}
                </li> 
              
              <li onClick={()=>{SetMenu("MEN")}}><Link style={{textDecoration:'None'}} to='/mens'>MEN</Link>{menu=="MEN"?<hr></hr>:<></>}</li> 
              <li onClick={()=>{SetMenu("WOMEN")}}><Link style={{textDecoration:'None'}} to='/women'>WOMEN</Link>{menu=="WOMEN"?<hr></hr>:<></>}</li> 
             <li onClick={()=>{SetMenu("Kids")}}><Link style={{textDecoration:'None'}} to='/kids'>Kids</Link>{menu=="Kids"?<hr></hr>:<></>}</li>  </ul>
                </div>
           
        
        <div className="BTN">
           <Link to='/LoginSignup'><button>lOGIN</button></Link> 
        </div>
       <Link to='/Cart'><img src={cart_icon} alt="" /></Link> 
        <div className="cart_no">
            0
        </div>
    </div>

  )
}

export default Navbar;
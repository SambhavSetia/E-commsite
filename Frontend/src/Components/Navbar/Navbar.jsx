import React, { useContext, useRef, useState } from "react";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from '../Assets/nav_dropdown.png'
const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const {getTotalCartItems}=useContext(ShopContext);
  const menuRef=useRef();

  const nav_dropdown_toggle=(e)=>{
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');


  }
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img  src={logo}></img>
        <p>SHOPPER</p>
      </div>
      <img className="nav-dropdown" onClick={nav_dropdown_toggle} src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link to="/"style={{textDecoration:'none'}}>SHOP</Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("mens");
          }}
        >
          <Link to="/mens" style={{textDecoration:'none'}}>MEN</Link>
          {menu === "mens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("womens");
          }}
        >
          <Link to="women" style={{textDecoration:'none'}}>WOMEN</Link>
          {menu === "womens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          <Link to="/kids" style={{textDecoration:'none'}}>KIDS</Link>
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        <button>
          <Link to="/loginsignup" style={{textDecoration:'none'}}>Login</Link>
        </button>
        <Link to="/cart" style={{textDecoration:'none'}}>
          <img src={cart_icon} alt=""></img>
        </Link>

        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;

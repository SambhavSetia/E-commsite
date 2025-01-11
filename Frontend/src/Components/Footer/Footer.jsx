import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pintester_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png'

const Footer = () => {
  return (
    <div className="footer">
        <div className="footer_logo">
            <img src={footer_logo} alt="" />
            <p>SHOPPER</p>
        </div>
        <ul className='footer_links'>
    <li>Company</li>
    <li>
        products
    </li>
    <li>Offices</li>
    <li>About</li>
    <li>Contract</li>

        </ul>
        <div className="footer_social_icon">
            <div className="footer_icon_container">
                <img src={instagram_icon} alt=''></img>
            </div>
            <div className="footer_icon_container">
                <img src={pintester_icon} alt=''></img>
            </div>
            <div className="footer_icon_container">
                <img src={whatsapp_icon} alt=''></img>
            </div>
        </div>
        <div className="footer_copyright">
            <hr />
            <p>CopyRight @2024 -All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer
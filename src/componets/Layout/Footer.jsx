// work here 
import React from 'react'
import { FiFacebook } from "react-icons/fi";
import { CiInstagram } from "react-icons/ci";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa6";
import '../Layout/Footer.css'


// import '../../Componets/Footer.css'
import { BsTelephone } from "react-icons/bs";
import Logos from '../../assets/Footer_logo.png'
import { MdOutlineMailOutline } from "react-icons/md";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">

            {/* Footer Section */}
            <div className="footer-div">
                    <div className="address">
                    <img src={Logos} alt="" className="foot-logo" />

                    <div className="footer-address">
                        <p > Kilometer 12, Success City, Off <br />Consistency Avenue, Enugu, Enugu <br />State, Nigeria.</p>
                        
                       <div className="call">
                       <BsTelephone className="phone"/>
                       <p>+234 808 516 7132</p>
                       </div>
                       <div className="email">
                       <MdOutlineMailOutline  className="email"/>
                       <p>info@paysum.com</p>
                       </div>
                      </div>
                    
                    </div>

                            {/* Quick Links */}
                 <div className="footer-links">
                    <p className='footer-links-p'>Quick Links</p>
                    <ol className="ol-links-footer">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About us</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#contact">Contact Us</a></li>
                   </ol>
             </div>


                    <div className="legal-notice">
                        <p className="p-legal-notice">Legal Notices </p>
                        <p className="legal-notice-p">Terms of service</p>
                        <p className="legal-notice-p">privacy policy</p>
                    </div>

                    {/* Social Media */}
                    <div className="footer-social">
                        <p className='social-p'>Follow Us</p>
                        <div className='flex justify-between gap-5'>
                            <Link to="https://www.facebook.com/share/1BxNH62UNL/?mibextid=wwXIfr" target='_blank'>< FiFacebook className="icon social_icons"/></Link>
                            <Link to="#"><CiInstagram className="icon social_icons"/></Link>
                            <Link to="https://x.com/paysumpr?s=21&t=Yk_VzQ8DGoSxSq0O7vAGrg" target='_blank'><BsTwitterX  className="icon social_icons"/></Link>
                            <Link to="#"><FaLinkedin className="icon social_icons"/></Link>
                        </div>
                    </div>
                

            </div>
             <div className="bellow-footer">

                <p className="footer-copy">© 2025 Paysum. All Rights Reserved.</p>
             </div>
    </footer>
  )
}

export default Footer
import React from 'react'
import { FiFacebook } from "react-icons/fi";
import { CiInstagram } from "react-icons/ci";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa6";
import '../Layout/Footer.css'

import { BsTelephone } from "react-icons/bs";
import Logos from '../../assets/Footer_logo.png'
import { MdOutlineMailOutline } from "react-icons/md";
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, amount: 0.3 }}
    >

      <motion.div
        className="footer-div"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        viewport={{ once: false }}
      >
        {/* Address */}
        <div className="address">
          <img src={Logos} alt="" className="foot-logo" />
          <div className="footer-address">
            <p>
              Kilometer 12, Success City, Off <br />
              Consistency Avenue, Enugu, Enugu <br />
              State, Nigeria.
            </p>
            <div className="call">
              <BsTelephone className="phone" />
              <p>+234 808 516 7132</p>
            </div>
            <div className="email">
              <MdOutlineMailOutline className="email" />
              <p>info@paysum.com</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <motion.div
          className="footer-links"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          viewport={{ once: false }}
        >
          <p className='footer-links-p'>Quick Links</p>
          <ol className="ol-links-footer">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ol>
        </motion.div>

        {/* Legal */}
        <motion.div
          className="legal-notice font-light"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          viewport={{ once: false }}
        >
          <p className="p-legal-notice">Legal Notices </p>
          <p className="legal-notice-p">Terms of service</p>
          <p className="legal-notice-p">Privacy policy</p>
        </motion.div>

        {/* Social Media */}
        <motion.div
          className="footer-social"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          viewport={{ once: false }}
        >
          <p className='social-p'>Follow Us</p>
          <div className='flex justify-between gap-5'>
            {[FiFacebook, CiInstagram, BsTwitterX, FaLinkedin].map((Icon, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.6,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              >
                <Link to="#">
                  <Icon className="icon social_icons" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Footer Copy */}
      <motion.div
        className="bellow-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        viewport={{ once: false }}
      >
        <p className="footer-copy">© 2025 Paysum. All Rights Reserved.</p>
      </motion.div>
    </motion.footer>
  )
}

export default Footer

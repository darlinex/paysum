import React from 'react'
import { motion } from 'framer-motion'
import '../landingpage/Contact.css'

import Phone from '../../assets/Frame-phone.png'
import Mail from '../../assets/Frame-mail.png'
import Contact_img from "../../assets/Contact_img.png"

const ContactUs = () => {
  return (
    <div className='contact_contain' id='contact'>

      <motion.div
        className='contact_text'
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.h3
        
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          WANT TO KNOW MORE?
        </motion.h3>

        <motion.h2
          className="contact_h2 "
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          CONTACT US
        </motion.h2>

        <motion.p
          className="contact_text_p"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Do you have any questions or in need of assistance? Reach out to our <br />
          committed support team. We value your feedback and inquiry. We are just <br />
          an email or call away, let's hear from you.
        </motion.p>

        <div className="contact-info">
          <motion.div
            className='contact_1'
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <img src={Phone} alt="" className='phone_img' />
            <div className="contact-details">
              <h4 className="h4 font-medium ">Phone</h4>
              <p className='con'>+234 808 516 7132</p>
            </div>
          </motion.div>

          <motion.div
            className='contact_2'
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <img src={Mail} alt="" className='phone_img' />
            <div className="contact-details">
              <h4 className='h4 font-medium'>Mail</h4>
              <p className='con1'>info@paysum.com</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className='contact_pic'
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <img src={Contact_img} alt="" className='cont_pic' />
      </motion.div>

    </div>
  )
}

export default ContactUs

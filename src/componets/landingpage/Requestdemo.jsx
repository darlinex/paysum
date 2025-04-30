
import React from 'react'
import '../landingpage/Requestdemo.css'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Requestdemo = () => {
  return (
    <motion.div
      className='request_container'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.4 }}
    > 
      <motion.div
        className='request_container2'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2>Gain leverage With Paysum</h2>
        <p className='request_p'>
          We believe a payroll should be stress free, seamless, and scalable.
          Schedule a meet for a personalised demo specific to your business needs and goals.           
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Link to={"/demo"}>
          <button className='demo_btn'>Request Demo</button>
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default Requestdemo

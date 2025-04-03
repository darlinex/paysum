
import React from 'react'
import '../landingpage/Requestdemo.css'
import { Link } from 'react-router-dom'

const Requestdemo = () => {
  return (
    <div  className='request_container'> 
        <div className='request_container2'>
            <h2>Gain leverage With Paysum</h2>
            <p className='request_p'>We believe a payroll     should be stress free, seamless, and scalable.
                Schedule a meet for a personalised demo specific to your business needs and goals.           
            </p>
        </div>
        <Link to={"/demo"}>
        
            <button className='demo_btn'>Request Demo</button>
        </Link>
    </div>
  )
}

export default Requestdemo
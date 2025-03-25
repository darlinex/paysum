import React from "react";
import { IoIosCheckmark } from "react-icons/io";
import square3 from '../../assets/Square2.png'
import circle2 from '../../assets/Circle2.png'
// import { FaCheck } from "react-icons/fa";
import '../landingpage/Wedo.css'
function WhatWeDo(){

    return(
        <div className="what-we-do-full-div" id="services">
            <img src={square3} alt="" className="what-we-do-square"/>
            <div className="what-we-do text-[#00294A] text-medium">
                <p className="what-we-do-first-p">WHAT WE DO</p>
                <h3>Our Services</h3>
                <p className="secondp">We offer the luxury of automation in salary calculation, employee management and payslip <br /> generation. Giving room for growth and scalability for SMEs</p>

            
            </div>

            <div className="cards-for-div">
                <div className="card1">
                    <h3>Salary Calculation & <br /> processing</h3>
                    <div>
                        <div className="check-div">

                     <IoIosCheckmark  className="i" />
                        </div>
                     <p>Computes salaries based on work hours,  days, deductions, and bonuses.</p>
                    </div>
                
                    <div>
                      <div className="check-div">

                     <IoIosCheckmark  className="i" />
                        </div>
                     <p>Applies tax rates, pension contributions, <br />and other statutory deductions.</p>
                    </div>
                
                    <div>
                      <div className="check-div">

                     <IoIosCheckmark   className="i" />
                        </div>
                     <p>Manages payroll periods (monthly, bi- <br />weekly, etc.)</p>
                    </div>
                
                </div>



                <div className="card1">
                    <h3>Employee Data <br /> Management</h3>
                    <div>
                      <div className="check-div">

                     <IoIosCheckmark className="i" />
                        </div>
                     <p>Stores employee information and <br /> details.</p>
                    </div>
                
                    <div>
                      <div className="check-div">

                     <IoIosCheckmark   className="i" />
                        </div>
                     <p>Manages salary structures, deductions, and  benefits.</p>
                    </div>
                
                    <div>
                      <div className="check-div">

                     <IoIosCheckmark   className="i" />
                        </div>
                     <p>Handles new hires, terminations, and <br />promotions.</p>
                    </div>
                
                </div>


                <div className="card1">
                    <h3>Payslip Generation & <br />Distribution</h3>
                    <div>
                      <div className="check-div">

                     <IoIosCheckmark   className="i" />
                        </div>
                     <p>Creates and distributes digital or printed  payslips.</p>
                    </div>
                
                
                    <div>
                     <div className="check-div">

                     <IoIosCheckmark   className="i" />
                        </div>
                     <p>Provides salary breakdowns with <br />deductions and net pay</p>
                    </div>


                
                </div>

                <img src={circle2} alt="" className="circle-for-what-we-do"/>
            </div>
            <div className="contact-btn-div">

            <button className="contact-btn">Contact us</button>
            </div>
        </div>
    )
}
export default WhatWeDo

import React from "react";
import square3 from "../../assets/Square3.png";
import man3 from "../../assets/Male3.png";
import circle3 from "../../assets/Circle3.png";
import '../landingpage/ChooseUs.css'

function Choose() {
  return (
    <div className="chooseUs">
      {/* Left side - Image section */}
      <div className="man-circle-square">
        <img src={square3} alt="" className="square-choose-us" />
        <div className="man-circle">
          <img src={man3} alt="" className="man-choose-us" />
          <img src={circle3} alt="" className="circle-choose-us" />
        </div>
      </div>

      {/* Right side - Text section */}
      <div className="why-us-text">
        {/* <div className="why-choose-p3"> */}
        <p className="why_choose_p " text-bold>WHY CHOOSE US?</p>
        <h2 className="why_pay">Why Paysum?</h2>

        <p className="why-choose-p2">
          Businesses grow and evolve, your payroll should too. We eliminate manual
          calculations, tax worries, and compliance headaches so you can focus on
          scaling.
        </p>
        {/* </div> */}
        
        {/* Feature sections */}
        <div className="div-choose">
          <div className="small-circle"></div>
          <div className="text-p">
            <p className="text_head ">Seamless Automation And Flexibility</p>
            <p className="div-choose-p">
              Our clients enjoy automated salary calculations, payslip generation, and 
              distribution with more flexibility than the manual system.
            </p>
          </div>
        </div>

        <div className="div-choose">
          <div className="small-circle"></div>
          <div className="text-p">
            <p className="text_head">We Grow With You</p>
            <p className="div-choose-p">
              As our clients grow and evolve, we do too. With an increase in staff 
              numbers and adjustments to their pay structure, we are with you every 
              step of the way.
            </p>
          </div>
        </div>

        <div className="div-choose">
          <div className="small-circle"></div>
          <div className="text-p">
            <p className="text_head">Full Compliance</p>
            <p className="div-choose-p">
              With us, you have nothing to worry about regarding tax compliance 
              and statutory regulations.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Choose;

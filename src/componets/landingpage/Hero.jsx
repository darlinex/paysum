import React from "react";
import { Link } from 'react-router-dom'
import male1 from '../../assets/Male1.png'
import female1 from '../../assets/Female1.png'
import male2 from '../../assets/Male2.png'
import square1 from '../../assets/Square1.png'
import square2 from '../../assets/Square2.png'
import circle1 from '../../assets/Circle1.png'
import circle2 from '../../assets/Circle2.png'
import './Hero.css'

function HeroSection() {
    return (
            <div className="herosection " id="home">
                <div className="left-side" >
                    <h1 className="font-medium">Simple and convenient payroll system for SMEs.</h1>
                    <p className="text-white">Seamlessly automate, document and manage payroll 
                        calculations and employee details. Embrace convenience,
                        affordability and organization with our payroll system. </p>
                    <div className="herobtns">
                        <Link to={"/demo"}>
                        
                        <button className="request-btn">Request demo</button>
                        </Link>
                        <Link to={"/register"}>
                        
                        <button className="button1"> Register Now </button>
                        </Link>
                        
                       

                    </div>
                </div>

                <div className="right-side">
                    <div className="man2">
                        <img src={square1} alt="" className="square1" />
                        <img src={male1} alt="" className="male1" />
                        <img src={square2} alt="" className="square2" />
                    </div>

                    <div className="man">
                        <div className="circle-woman">

                            <img src={circle1} alt="" className="circle-beside-woman" />
                            <img src={female1} alt="" className="woman-above-circle" />
                        </div>
                        <div className="circle-man">

                            <img src={male2} alt="" className="male-beside-circle" />
                            <img src={circle2} alt="" className="circle-beside-male" />
                        </div>
                    </div>
                </div>
            </div>

    )
}

export default HeroSection 
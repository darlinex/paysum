import React from 'react'
import HeroSection from './Hero';
import NavBar from '../Layout/Nav';
import AboutUs from './Aboutus';
import Choose from './ChooseUs';
import WhatWeDo from './WeDo';
import ContactUs from './ContactUs';
import Requestdemo from './Requestdemo';
import Footer from '../Layout/Footer';
import SeePricing from '../seepricing/SeePricing';
function LandingPage(){    
    return (<>

    
    <NavBar />
    <HeroSection />
    <AboutUs/>
    <WhatWeDo/>
    <Choose/>
    <ContactUs/>
    <Requestdemo/>
    <SeePricing/>
    
    <Footer/>
    </>
    )
}

export default LandingPage
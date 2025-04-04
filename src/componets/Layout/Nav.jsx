import { Link } from 'react-router-dom'
import logo from '../../assets/Logo.png'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RxHamburgerMenu } from "react-icons/rx";
import { TbLetterX } from "react-icons/tb";
import '../Layout/Nav.css';
import { useNavigate } from 'react-router-dom';
import { div } from 'framer-motion/m';



function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        console.log('clicked')
        setMenuOpen(!menuOpen)
    }

    return (
        <div>
            {/* hero section nav ,links*/}

            <div className="navdiv">
                <nav className='nav-hero-section'>

                    <a href={'/LandingPage'}>
                        <div className="logo">
                            <img src={logo} alt="" />
                        </div>
                    </a>

                    <div className="links">
                        <ul>
                            <li className="nav-links">About us</li>
                            <li className="nav-links">Services</li>

                            <li className="nav-links">Contact Us</li>

                        </ul>
                    </div>

                    {/* {!(localStorage.getItem("ACCESS_TOKEN")) ?
                        (<div className="button flex">
                            <Link to={"/login"}>

                                <button className="">Sign in</button>
                            </Link>
                            <Link to={"/demo"}>
                                <button className="button2">Request demo</button>
                            </Link>
                        </div>) :
                        <div className="button">
                            <Link to={"/dashboard/home"}>
                                <button className="button2"> dashboard </button>
                            </Link>
                            <button className="button2" onClick={() => {
                                localStorage.removeItem("ACCESS_TOKEN")
                                window.location.reload()
                            }
                            }> Log Out </button>
                        </div>
                    } */}

                </nav>

                {/* main hero section */}
            </div>

            <div className="navdiv">
                <nav className='nav-hero-section'>
                    <div className="logo">
                        <img src={logo} alt="" />

                    </div>

                    <div className="links">
                        <ul>
                            <li className="nav-links">
                                <a href="#about">About us</a>
                            </li>
                            <li className="nav-links">
                                <a href="#services">Services</a>
                            </li>
                            <li className="nav-links">
                                <a href="#contact">Contact Us</a>
                            </li>
                        </ul>
                    </div>


                    {!(localStorage.getItem("ACCESS_TOKEN")) ?
                        (<div className="button flex">
                            <Link to={"/login"}>
                                <button className="button11 hidden md:flex">Sign in</button>
                            </Link>
                            <Link to={"/demo"}>
                                <button className="button2">Request demo</button>
                            </Link>
                        </div>) :
                        <div className="button">
                            <Link to={"/dashboard/home"}>
                                <button className="button2"> Dashboard </button>
                            </Link>
                            <button className="button2" onClick={() => {
                                localStorage.removeItem("ACCESS_TOKEN")
                                window.location.reload()
                            }
                            }> Log Out </button>
                        </div>
                    }

                    <RxHamburgerMenu onClick={toggleMenu} className="md:hidden hamburger" />



                </nav>
                <AnimatePresence>
                    {
                        menuOpen && (
                            <motion.div
                                initial={{ y: '-100vh' }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5, stiffness: 120, type: 'spring' }}
                                exit={{ opacity: 0, delay: 0.2, duration: 0.5 }}
                                className='fixed inset-0 w-full bg-white h-full
                    backdrop-blur-sm mt-20 text-white bg-opacity-50 z-[2000]'>
                                <TbLetterX color='black' size={30} className=" letter_x absolute right-8 top-6 cursor-pointer z-50" onClick={toggleMenu} />

                                <div>
                                    <div>


                                    <ul className='motion-ul'>
                                        <li className='motion-li text-[#FF7943]'>
                                            <a href="#about">About us</a>
                                        </li>
                                        <li className='motion-li text-[#FF7943]'>
                                            <a href="#services">Services</a>
                                        </li>
                                        <li className='motion-li text-[#FF7943]'>
                                            <a href="#contact">Contact us</a>
                                        </li>
                                    </ul>
                                    <div className="button-motion">
                                            <Link to={"/login"}>
                                                <button className="request-btn">Sign in</button>
                                            </Link>
                                            <Link to={"/demo"}>
                                                <button className="request-btn ">Request demo</button>
                                            </Link>
                                        </div>
                                    </div>


                                    {!(localStorage.getItem("ACCESS_TOKEN")) ?
                                        (<div className="button-motion">
                                            <Link to={"/login"}>
                                                <button className="button1">Sign in</button>
                                            </Link>
                                            <Link to={"/demo"}>
                                                <button className="request-btn ">Request demo</button>
                                            </Link>
                                        </div>) :
                                        <div className="button-motion">
                                            <Link to={"/dashboard/home"}>
                                                <button className="button2"> Dashboard </button>
                                            </Link>
                                            <button className="button2" onClick={() => {
                                                localStorage.removeItem("ACCESS_TOKEN")
                                                window.location.reload()
                                            }
                                            }> Log Out </button>
                                        </div>
                                    }

                                </div>
                            </motion.div>


                        )
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}

export default NavBar 

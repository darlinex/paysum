import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RxHamburgerMenu } from "react-icons/rx";
import { TbLetterX } from "react-icons/tb";
import "../Layout/Nav.css";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Detect scroll to add shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Navbar Section */}
      <div className={`navdiv ${isScrolled ? "shadow-lg bg-white" : ""}`}>
        <nav className="nav-hero-section">
          <Link to={"/LandingPage"}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="logo"
            >
              <img src={logo} alt="Logo" />
            </motion.div>
          </Link>

          <div className="links">
            <ul>
              <motion.li whileHover={{ scale: 1.1 }} className="nav-links">
                <a href="#about">About us</a>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }} className="nav-links">
                <a href="#services">Services</a>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }} className="nav-links">
                <a href="#contact">Contact Us</a>
              </motion.li>
            </ul>
          </div>

          {!(localStorage.getItem("ACCESS_TOKEN")) ? (
            <motion.div 
              className="button flex"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to={"/login"}>
                <button className="button11 hidden md:flex">Sign in</button>
              </Link>
              <Link to={"/demo"}>
                <button className="button2">Request demo</button>
              </Link>
            </motion.div>
          ) : (
            <div className="button">
              <Link to={"/dashboard/home"}>
                <button className="button2">Dashboard</button>
              </Link>
              <button
                className="button2"
                onClick={() => {
                  localStorage.removeItem("ACCESS_TOKEN");
                  window.location.reload();
                }}
              >
                Log Out
              </button>
            </div>
          )}

          <RxHamburgerMenu
            onClick={toggleMenu}
            className="md:hidden hamburger"
          />
        </nav>
      </div>

      {/* Mobile Menu Animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "-100vh" }}
            animate={{ y: 0 }}
            exit={{ y: "-100vh" }}
            transition={{ type: "spring", stiffness: 120, duration: 0.6 }}
            className="fixed inset-0 w-full bg-white h-full backdrop-blur-md bg-opacity-90 z-[2000]"
          >
            <TbLetterX
              color="black"
              size={30}
              className="absolute right-8 top-6 cursor-pointer z-50"
              onClick={toggleMenu}
            />

            <div className="flex flex-col items-center mt-20">
              <motion.ul
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
                  exit: { opacity: 0, transition: { duration: 0.3 } },
                }}
                className="motion-ul text-center"
              >
                <motion.li
                  variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
                  className="motion-li text-[#FF7943]"
                >
                  <a href="#about">About us</a>
                </motion.li>
                <motion.li
                  variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
                  className="motion-li text-[#FF7943]"
                >
                  <a href="#services">Services</a>
                </motion.li>
                <motion.li
                  variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
                  className="motion-li text-[#FF7943]"
                >
                  <a href="#contact">Contact us</a>
                </motion.li>
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="button-motion mt-6"
              >
                <Link to={"/login"}>
                  <button className="request-btn">Sign in</button>
                </Link>
                <Link to={"/demo"}>
                  <button className="request-btn">Request demo</button>
                </Link>
              </motion.div>

              {localStorage.getItem("ACCESS_TOKEN") && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="button-motion mt-4"
                >
                  <Link to={"/dashboard/home"}>
                    <button className="button2">Dashboard</button>
                  </Link>
                  <button
                    className="button2"
                    onClick={() => {
                      localStorage.removeItem("ACCESS_TOKEN");
                      window.location.reload();
                    }}
                  >
                    Log Out
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default NavBar;


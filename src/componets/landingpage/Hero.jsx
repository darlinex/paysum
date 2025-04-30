import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import male1 from "../../assets/Male1.png";
import female1 from "../../assets/Female1.png";
import male2 from "../../assets/Male2.png";
import square1 from "../../assets/Square1.png";
import square2 from "../../assets/Square2.png";
import circle1 from "../../assets/Circle1.png";
import circle2 from "../../assets/Circle2.png";
import "./Hero.css";

function HeroSection() {
  return (
    <motion.div
      className="herosection"
      id="home"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: false }}
    >
      <div className="left-side">
        {/* Heading Animation with Word-by-Word Reveal */}
        <motion.h1
          className="font-medium"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }} // Small hover effect
        >
          Simple and convenient payroll system for SMEs.
        </motion.h1>

        {/* Paragraph Animation with a Soft Bounce */}
        <motion.p
          className="text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Seamlessly automate, document and manage payroll calculations and employee details. 
          Embrace convenience, affordability and organization with our payroll system.
        </motion.p>

        {/* Buttons with Hover Glow Effect */}
        <motion.div
          className="herobtns"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <Link to={"/demo"}>
            <motion.button
              className="request-btn"
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px rgba(255, 121, 67, 0.7)" }}
              whileTap={{ scale: 0.95 }}
            >
              Request demo
            </motion.button>
          </Link>
          <Link to={"/register"}>
            <motion.button
              className="button1"
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px rgba(255, 121, 67, 0.7)" }}
              whileTap={{ scale: 0.95 }}
            >
              Register Now
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <div className="right-side">
        {/* Man 1 Floating Animation */}
        <div className="man2">
          <motion.img
            src={square1}
            alt=""
            className="square1"
            initial={{ rotate: 0 }}
            // animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }} 
          />
          <motion.img
            src={male1}
            alt=""
            className="male1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            whileHover={{ scale: 1.05 }} // Small hover effect
            whileInView={{ opacity: 1, x: 0 }}
          />
          <motion.img
            src={square2}
            alt=""
            className="square2"
            initial={{ rotate: 0 }}
            // animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }} // Smooth inverse rotation
          />
        </div>

        {/* Woman & Man Floating with Bouncy Effect */}
        <div className="man">
          <div className="circle-woman">
            <motion.img
              src={circle1}
              alt=""
              className="circle-beside-woman"
              animate={{ y: [0, 10, 0] }}
              // transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} 
              whileInView={{ opacity: 1 }}
            />
            <motion.img
              src={female1}
              alt=""
              className="woman-above-circle"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              whileInView={{ opacity: 1, y: 0 }}
            />
          </div>
          <div className="circle-man">
            <motion.img
              src={male2}
              alt=""
              className="male-beside-circle"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileInView={{ opacity: 1, x: 0 }}
            />
            <motion.img
              src={circle2}
              alt=""
              className="circle-beside-male"
              animate={{ y: [0, -10, 0] }}
              // transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} 
              whileInView={{ opacity: 1 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default HeroSection;

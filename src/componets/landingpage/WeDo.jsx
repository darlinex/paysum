import React from "react";
import { IoIosCheckmark } from "react-icons/io";
import square3 from '../../assets/Square2.png';
import circle2 from '../../assets/Circle2.png';
import '../landingpage/Wedo.css';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function WhatWeDo() {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="what-we-do-full-div" id="services">
      <motion.img
        src={square3}
        alt=""
        className="what-we-do-square"
        initial={{ opacity: 0, rotate: -20 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      />

      <motion.div
        className="what-we-do text-[#00294A] text-medium"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <p className="what-we-do-first-p">What We Do</p>
        <h3 className="font-bold">OUR SERVICES</h3>
        <p className="secondp">
          We offer the luxury of automation in salary calculation, employee management and payslip <br />
          generation. Giving room for growth and scalability for SMEs
        </p>
      </motion.div>

      <motion.div
        className="cards-for-div"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="card1 card-special" variants={cardVariants}>
          <h3 className="font-bold text-[#00294A]">Salary Calculation & <br /> processing</h3>
          <div><div className="check-div"><IoIosCheckmark className="i" /></div>
            <p>Computes salaries based on work hours, days, deductions, and bonuses.</p></div>
          <div><div className="check-div"><IoIosCheckmark className="i" /></div>
            <p>Applies tax rates, pension contributions, <br />and other statutory deductions.</p></div>
          <div><div className="check-div"><IoIosCheckmark className="i" /></div>
            <p>Manages payroll periods (monthly, bi- <br />weekly, etc.)</p></div>
        </motion.div>

        <motion.div className="card1" variants={cardVariants}>
          <h3 className="font-bold text-[#00294A]" >Employee Data <br /> Management</h3>
          <div><div className="check-div"><IoIosCheckmark className="i" /></div>
            <p>Stores employee information and <br /> details.</p></div>
          <div><div className="check-div"><IoIosCheckmark className="i" /></div>
            <p>Manages salary structures, deductions, and benefits.</p></div>
          <div><div className="check-div"><IoIosCheckmark className="i" /></div>
            <p>Handles new hires, terminations, and <br />promotions.</p></div>
        </motion.div>

        <motion.div className="card1" variants={cardVariants}>
          <h3 className="font-bold text-[#00294A]">Payslip Generation & <br />Distribution</h3>
          <div><div className="check-div"><IoIosCheckmark className="i" /></div>
            <p>Creates and distributes digital or printed payslips.</p></div>
          <div><div className="check-div"><IoIosCheckmark className="i" /></div>
            <p>Provides salary breakdowns with <br />deductions and net pay</p></div>
        </motion.div>

        <motion.img
          src={circle2}
          alt=""
          className="circle-for-what-we-do"
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        />
      </motion.div>

      <motion.div
        className="contact-btn-div"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <button className="contact-btn">
          <a href="#contact">Contact us</a>
        </button>
      </motion.div>
    </div>
  );
}

export default WhatWeDo;

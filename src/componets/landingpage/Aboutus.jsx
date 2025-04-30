import React from "react";
import { motion } from "framer-motion";
import dashboard from '../../assets/Group1.png';
import vector from '../../assets/Vector1.png';
import '../landingpage/Aboutus.css';

function AboutUs() {
  return (
    <div className="about-us-container" id="about">
      <div className="about-us-dashboards">
        <motion.img
          src={dashboard}
          alt=""
          className="dashboard-images"
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 60 }}
          viewport={{ once: true, amount: 0.3 }}
        />
        <img src={vector} alt="" className="vector-lines" />
      </div>

      <motion.div
        className="about-us-text"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p
          className="about-us-p font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          About us
        </motion.p>

        <motion.h2
          className="text-[#00294A] font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          WHO WE ARE
        </motion.h2>

        <motion.p
          className="who-we-are-p"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          We make payroll management convenient. Our platform automates <br /> 
          salary payment calculations, tax filings, and compliance—so you can <br /> 
          focus on building, not bureaucracy.
        </motion.p>

        <motion.p
          className="who-we-are-p"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          We also keep record of employee details, payroll history and <br /> 
          Whether you're paying employees, contractors, or a hybrid team, we  <br /> 
          ensure the payroll fits seamlessly into your business workflow.
        </motion.p>
      </motion.div>
    </div>
  );
}

export default AboutUs;

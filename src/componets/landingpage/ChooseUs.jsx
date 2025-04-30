import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import square3 from "../../assets/Square3.png";
import man3 from "../../assets/Male3.png";
import circle3 from "../../assets/Circle3.png";
import '../landingpage/ChooseUs.css';

function Choose() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div className="chooseUs" ref={ref}>
      {/* Left side - Image section */}
      <div className="man-circle-square">
        <motion.img
          src={square3}
          alt=""
          className="square-choose-us"
          initial={{ opacity: 0, rotate: -90 }}
          animate={isInView ? { opacity: 1, rotate: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
        />
        <div className="man-circle">
          <motion.img
            src={man3}
            alt=""
            className="man-choose-us"
            initial={{ y: -100, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.6 }}
          />
          <motion.img
            src={circle3}
            alt=""
            className="circle-choose-us"
            initial={{ y: -150, rotate: 0, opacity: 0 }}
            animate={isInView ? { y: 0, rotate: 360, opacity: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Right side - Text section */}
      <motion.div
        className="why-us-text"
        initial={{ x: 100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        <p className="why_choose_p font-bold text-[#00294A]">WHY CHOOSE US?</p>
        <h2 className="why_pay text-[#00294A]">Why Paysum?</h2>

        <p className="why-choose-p2 text-[#00294A]">
          Businesses grow and evolve, your payroll should too. We eliminate manual
          calculations, tax worries, and compliance headaches so you can focus on
          scaling.
        </p>

        {[
          {
            title: "Seamless Automation And Flexibility",
            text: "Our clients enjoy automated salary calculations, payslip generation, and distribution with more flexibility than the manual system.",
          },
          {
            title: "We Grow With You",
            text: "As our clients grow and evolve, we do too. With an increase in staff numbers and adjustments to their pay structure, we are with you every step of the way.",
          },
          {
            title: "Full Compliance",
            text: "With us, you have nothing to worry about regarding tax compliance and statutory regulations.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="div-choose"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 + index * 0.3 }}
          >
            <div className="small-circle"></div>
            <div className="text-p">
              <p className="text_head text-[#00294A] font-medium">{item.title}</p>
              <p className="div-choose-p text-[#00294A]">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Choose;

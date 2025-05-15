import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Demo.css';
import Ent from '../../assets/Entreprenuer.png';
import instance from '../axios/axiosinstance';

const Demo = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    phoneNumber: '',
    companyName: '',
    companyRole: '',
    employeeHeadcount: 0,
    contactPreference: 'phone',
  });

  const [loading, setLoading] = useState(false); // ✅ loading state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, contactPreference: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.workEmail ||
      !formData.phoneNumber ||
      !formData.companyName ||
      !formData.companyRole ||
      !formData.employeeHeadcount
    ) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true); // ✅ Set loading before request
    try {
      const response = await instance.post('/demo', {
        ...formData,
        employeeHeadcount: parseInt(formData.employeeHeadcount),
      });

      if (response.status === 200 || response.status === 201) {
        toast.success('Form submitted successfully!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('API Error:', error);
    } finally {
      setLoading(false); // ✅ Reset loading after request
    }
  };

  return (
    <div className="demo_container">
      <ToastContainer />
      <h1 className="demo_intro">Choose the convenience of automation</h1>
      <p className="demo_intro2">
        See why SMEs rely and trust us to handle their payroll calculation, employee management,
        and payslip generation. Switch to an automated and convenient lane.
      </p>

      <motion.div
        className="demo_cont"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="pic_cont">
          <img src={Ent} alt="Entrepreneur" className="entre" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form_cont">
            <div className="form1">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleInputChange}
              />

              <label>Work Email</label>
              <input
                type="email"
                name="workEmail"
                placeholder="Enter email address"
                value={formData.workEmail}
                onChange={handleInputChange}
              />

              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={handleInputChange}
              />

              <label>Employee Headcount</label>
              <input
                type="number"
                name="employeeHeadcount"
                placeholder="Employee Size"
                value={formData.employeeHeadcount}
                onChange={handleInputChange}
              />
            </div>

            <div className="form2">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleInputChange}
              />

              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />

              <label>Company Role</label>
              <input
                type="text"
                name="companyRole"
                placeholder="Enter role in company"
                value={formData.companyRole}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <p className="terms">
            By submitting this form, you consent to the terms and conditions <br />
            stated with our privacy policy.
          </p>

          <div className="div-demo-btn">
            <button type="submit" className="demo_btn2" disabled={loading}>
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Demo;

import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../authentication/Otp.css';

const Otp = () => {
  const navigate = useNavigate();
  const {email} = useParams()
  console.log(email)

  // State to store the OTP input
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus to the next input field
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine the OTP digits into a single string
    const otpCode = otp.join('');

    // Validate OTP
    if (otpCode.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP.');
      return;
    }

    try {
        console.log(       { otp: otpCode,
            email: email
         })
      // Send the OTP to the API for verification
      const response = await axios.post(
        'https://payrum-1.onrender.com/api/auth/verify',
        { otp: otpCode,
            email: email
         } // Adjust the payload based on API requirements
      );

      // Handle success
      if (response.status === 200 || response.status === 201) {
        toast.success('OTP verified successfully!');
        setTimeout(() => {
          navigate('/login'); // Redirect to the login page
        }, 2000); // Wait 2 seconds before redirecting
      }
    } catch (error) {
      // Handle error
      console.error('API Error:', error.response?.data || error.message);
      toast.error('OTP verification failed. Please try again.');
    }
  };

  return (
    <div className="otp_containerr">
      <ToastContainer /> {/* For displaying toasts */}
      <div className="otp_bord">
        <h1>Verify your email</h1>
        <p>
          Enter the 6-digit OTP code sent to your email to <br />
          help verify your account.
        </p>

        <div className="otp_ver">
          <form onSubmit={handleSubmit} className='form-otp'>
            {otp.map((digit, index) => (
              
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                className="otpp"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
              />
            ))}
          </form>
        </div>

        <p className="resend_msg">
          Didn't get the code? Let's try again <br />
          <span className="resend_msg2">Resend</span>
        </p>

        <button className="verify_btn" onClick={handleSubmit}>
          Verify
        </button>
      </div>
    </div>
  );
};

export default Otp;
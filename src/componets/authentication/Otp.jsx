import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../authentication/Otp.css';

const Otp = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false); // <-- Added loading state

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP.');
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        'https://payrum-1.onrender.com/api/auth/verify',
        { otp: otpCode, email: email }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success('OTP verified successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      toast.error('OTP verification failed. Please try again.');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="otp_containerr">
      <ToastContainer />
      <div className="otp_bord">
        <h1>Verify your email</h1>
        <p>
          Enter the 6-digit OTP code sent to your email to <br />
          help verify your account.
        </p>

        <div className="otp_ver">
          <form onSubmit={handleSubmit} className="form-otp">
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

        <button
          className={`verify_btn ${loading ? 'loading-btn' : ''}`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <span>
              Loading<span className="dot1">.</span>
              <span className="dot2">.</span>
              <span className="dot3">.</span>
            </span>
          ) : (
            'Verify'
          )}
        </button>
      </div>
    </div>
  );
};

export default Otp;

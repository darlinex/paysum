import { MdNavigateNext } from "react-icons/md";
import { RiBuilding2Fill } from "react-icons/ri";
import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import "./Dashcontent.css";

function Content() {
  return (
    <div className="content">
      <h1>Welcome Back, Admin</h1>

      <div className="everything">
        {/* First Section (4 Cards) */}
        <div className="first-div">
          {/* Payroll Calculation Card */}
          <div className="payroll-card">
            <h3 className="title">Payroll Calculation</h3>

            <div className="progress-container">
              <svg className="progress-ring" width="80" height="80">
                <circle className="background-circle" cx="40" cy="40" r="30"></circle>
                <circle className="progress-circle" cx="40" cy="40" r="30"></circle>
                <text x="40" y="45" className="progress-text">75%</text>
              </svg>

              <div className="legend">
                <div className="legend-item">
                  <span className="ready"></span> Ready
                </div>
                <div className="legend-item">
                  <span className="not-ready"></span> Not Ready
                </div>
                <p className="status-text">30 out of 40 employees ready for salary calculation.</p>
              </div>
            </div>

            <button className="next-btn">
              <MdNavigateNext />
            </button>
          </div>

          {/* Last Payroll Card */}
          <div className="secondcard">
            <div className="last">
              <h3>Last Payroll</h3>
              <div className="last-text">
                <p>Feb 23, 2025</p>
                <p>₦650,500</p>
              </div>
            </div>
            <div className="icons-last">
              <button className="next-btn2">
                <MdNavigateNext />
              </button>
              <button className="build-btn">
                <RiBuilding2Fill className="building" />
              </button>
            </div>
          </div>

          {/* Next Payroll Card */}
          <div className="thirdcard">
            <div className="last">
              <h3>Next Payroll</h3>
              <div className="last-text">
                <p>Mar 23, 2025</p>
                <p>7 days left...</p>
              </div>
            </div>
            <div className="icons-last">
              <button className="notify-btn">
                <IoMdNotificationsOutline />
              </button>
            </div>
          </div>

          {/* New Hires Card */}
          <div className="secondcard">
            <div className="last">
              <h3>New Hires</h3>
              <div className="last-text">
                <p>This Month</p>
                <p>2 employees</p>
              </div>
            </div>
            <div className="icons-last">
              <button className="next-btn2">
                <MdNavigateNext />
              </button>
              <button className="person-btn">
                <IoPersonOutline />
              </button>
            </div>
          </div>
        </div>
        
        {/* Second Section (Distributed Payslips Card) */}
        <div className="second-card">
          <div className="fifthcard">
            <div className="payslip-card">
              {/* Header */}
              <div className="payslip-header">
                <h3>Distributed Payslips</h3>
                <button className="next-btn3">
                  <MdNavigateNext />
                </button>
              </div>

              {/* Subtitle */}
              <p className="subtitle">February 2025</p>

              {/* Progress Circle */}
              <div className="progress-container2">
                <svg width="80" height="80" viewBox="0 0 100 100" className="progress-ring2">
                  <circle cx="50" cy="50" r="40" className="background-circle2" />
                  <circle cx="50" cy="50" r="40" className="progress-circle2" />
                  <text x="50" y="55" className="progress-text2">90%</text>
                </svg>
              </div>

              {/* Status Labels */}
              <div className="status-container">
                <div className="status-item">
                  <span className="status-indicator green"></span>
                  <p>Successful</p>
                </div>
                <div className="status-item">
                  <span className="status-indicator red"></span>
                  <p>Pending</p>
                </div>
              </div>

              {/* Summary */}
              <p className="summary">36 out of 40 employees have received payslips.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;



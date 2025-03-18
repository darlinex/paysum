import { div } from "framer-motion/client";
import React from "react";
import './Sidebar.css'
import sidelogo from '../../assets/Footer_logo.png'
import { IoPersonOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";

const Sidebar = () => {
    // const [active, setActive] = useState("Home")
    return (
      <aside
        className=" entire-div fixed left-0 top-0 h-full w-64 bg-[rgba(0,41,74,1)] text-white p-5 flex flex-col justify-between "
      >
        {/* Logo Section */}
        <div className="side-bar-logo flex justify-start mb-6">
          <img src={sidelogo} alt="Logo" className="h-12" />
        </div>
        
        {/* Navigation Section */}
        <Link className="side-select space-y-4">
          <Link to={"/dashboard/home"} className="select flex items-center gap-22 cursor-pointer hover:opacity-75">
            <IoPersonOutline />
            <p>Home</p>
          </Link>
          <Link to={'/dashboard/calculator'} className="select flex items-center gap-2 cursor-pointer hover:opacity-75">
            <IoPersonOutline />
            <p>Calculator</p>
          </Link>
          <Link to={"/dashboard/allemployees"} className="select flex items-center gap-2 cursor-pointer hover:opacity-75">
            <IoPersonOutline />
            <p>Employees</p>
          </Link>
          <Link className="select flex items-center gap-2 cursor-pointer hover:opacity-75">
            <IoPersonOutline />
            <p>Payslip</p>
          </Link>
        </Link>
        
        {/* Settings Section */}
        <Link className="seetings-sidebar flex items-center gap-2 cursor-pointer hover:opacity-75">
          <CiSettings />
          <p>Settings</p>
        </Link>
      </aside>
    );
  };


export default Sidebar
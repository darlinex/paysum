import React, { useState } from "react";
import './Sidebar.css';
import sidelogo from '../../assets/Footer_logo.png';
import { CiHome } from "react-icons/ci";
import { BsCalculator } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { BiBookmarkAltMinus } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { MenuIcon, X } from "lucide-react";
import logo from '../../assets/Logo.png';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={`entire-div fixed left-0 top-0 h-full w-64 bg-[rgba(0,41,74,1)] text-white p-5 flex-col justify-between transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:translate-x-0 md:flex`}>      
      {/* Close Button for Mobile */}
      <div className="flex justify-between items-center ">
        <Link to={"/"}>
        <img src={sidelogo} alt="Logo" className="h-12" />
        <X className="text-white cursor-pointer" onClick={toggleSidebar} />
        </Link>
      </div>

      {/* Navigation Section */}
      <nav className="space-y-4 mt-6">
        <Link to="/dashboard/home" className="select flex items-center gap-2 cursor-pointer hover:opacity-75">
          <CiHome /> <p>Home</p>
        </Link>
        <Link to='/dashboard/calculator' className="select flex items-center gap-2 cursor-pointer hover:opacity-75">
          <BsCalculator /> <p>Payroll</p>
        </Link>
        <Link to="/dashboard/allemployees" className="select flex items-center gap-2 cursor-pointer hover:opacity-75">
          <IoPersonOutline /> <p>Employees</p>
        </Link>
        <Link to="/dashboard/payslip" className="select flex items-center gap-2 cursor-pointer hover:opacity-75">
          <BiBookmarkAltMinus /> <p>Payslip</p>
        </Link>
      </nav>

      {/* Settings Section */}
      <Link className="seetings-sidebar flex items-center gap-2 cursor-pointer hover:opacity-75">
        <CiSettings /> <p>Settings</p>
      </Link>
    </aside>
  );
};

export function ResponsiveNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleSidebar = () => setMenuOpen(!menuOpen);

  return (
    <div className="flex items-center justify-between md:hidden p-4 bg-[rgba(0,41,74,1)] text-white w-full fixed top-0 z-50">
      <img src={logo} alt="Logo" className="h-10" />
      <MenuIcon className="cursor-pointer" onClick={toggleSidebar} />
      <Sidebar isOpen={menuOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
}

export default Sidebar;

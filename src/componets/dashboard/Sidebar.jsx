import React, { useState } from "react";
import './Sidebar.css';
import sidelogo from '../../assets/Footer_logo.png';
import { CiHome, CiSettings } from "react-icons/ci";
import { BsCalculator } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { MenuIcon, X } from "lucide-react";
import logo from '../../assets/Logo.png';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  // Check if current route matches path
  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`entire-div fixed left-0 top-0 h-full w-64 bg-[rgba(0,41,74,1)] text-white p-5 flex-col justify-between transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:translate-x-0 md:flex`}>
      
      {/* Top Logo and Close */}
      <div className="flex justify-between items-center">
        <Link to="/">
          <img src={sidelogo} alt="Logo" className="h-12" />
        </Link>
        <X className="text-white cursor-pointer" onClick={toggleSidebar} />
      </div>

      {/* Navigation Links */}
      <nav className="side-nav space-y-4 mt-6">
        <Link
          to="/dashboard/home"
          className={`select flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md ${
            isActive("/dashboard/home") ? "bg-gray-600" : "hover:bg-gray-600"
          }`}
        >
          <CiHome /> <p>Home</p>
        </Link>
        <Link
          to="/dashboard/calculator"
          className={`select flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md ${
            isActive("/dashboard/calculator") ? "bg-gray-600" : "hover:bg-gray-600"
          }`}
        >
          <BsCalculator /> <p>Payroll</p>
        </Link>
        <Link
          to="/dashboard/allemployees"
          className={`select flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md ${
            isActive("/dashboard/allemployees") ? "bg-gray-600" : "hover:bg-gray-600"
          }`}
        >
          <IoPersonOutline /> <p>Employees</p>
        </Link>
        <Link
          to="/dashboard/payslip"
          className={`select flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md ${
            isActive("/dashboard/payslip") ? "bg-gray-600" : "hover:bg-gray-600"
          }`}
        >
          <IoPersonOutline /> <p>Payslip</p>
        </Link>

        
      </nav>

      {/* Settings Link */}
      <Link
        to="/dashboard/settings"
        className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md mt-6 ${
          isActive("/dashboard/settings") ? "bg-gray-600" : "hover:bg-gray-600"
        }`}
      >
        <CiSettings /> <p>Settings</p>
      </Link>
    </aside>
  );
};

export function ResponsiveNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleSidebar = () => setMenuOpen(!menuOpen);

  return (
    <div className="respside flex items-center justify-between md:hidden p-4 bg-[rgba(0,41,74,1)] !text-white w-full fixed top-0 z-50">
      <img src={logo} alt="Logo" className="h-10" />
      <MenuIcon className="cursor-pointer" onClick={toggleSidebar} />
      <Sidebar isOpen={menuOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
}

export default Sidebar;

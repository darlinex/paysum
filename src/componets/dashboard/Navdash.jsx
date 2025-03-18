import { div } from "framer-motion/m";
import React, { useState } from "react";
import './Navdash.css';
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoPerson } from "react-icons/io5";

function Navdashhboard() {
    const [activeIcon, setActiveIcon] = useState(null);

    const handleClick = (icon) => {
        setActiveIcon(icon); // Set the clicked icon as active
    };

    return (
        <div className="full-div">
            <div className="search-container">
                <CiSearch className="search-icon" />
                <input type="search" placeholder="Search..." className="search-input" />
            </div>

            <div className="user-notify">
                <IoIosNotificationsOutline 
                    className={`icon ${activeIcon === "notifications" ? "active" : ""}`} 
                    onClick={() => handleClick("notifications")} 
                />
                <IoPerson 
                    className={`icon ${activeIcon === "person" ? "active" : ""}`} 
                    onClick={() => handleClick("person")} 
                />
            </div>
        </div>
    );
}

export default Navdashhboard;

import { div } from "framer-motion/m";
import React, { useState } from "react";
import './Navdash.css';
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { LogOutIcon } from "lucide-react";

function Navdashhboard() {
    const [activeIcon, setActiveIcon] = useState(null);
    const [dropDown, setDropdown] = useState(null);

    const handleClick = (icon) => {
        setActiveIcon(icon); // Set the clicked icon as active
        setDropdown(!dropDown)
    };

    return (
        <div className="full-div">
            <div className="search-container">
                <CiSearch className="search-icon" />
                <input type="search" placeholder="Search..." className="search-input" />
            </div>

            <div className="user-notify relative">
                <IoIosNotificationsOutline
                    className={`icon ${activeIcon === "notifications" ? "active" : ""}`}
                    onClick={() => handleClick("notifications")}
                />
                <IoPerson
                    className={`icon ${activeIcon === "person" ? "active" : ""}`}
                    onClick={() => handleClick("person")}
                />
                {dropDown && <div className="absolute shadow-md !px-4 !py-4 border border-gray-200 -right-3 -bottom-15 text-sm text-nowrap">
                    <button 
                    className="flex gap-4 "
                    onClick={() => {
                        localStorage.removeItem("ACCESS_TOKEN")
                        window.location.reload()
                    }
                    }>
                        <LogOutIcon size={20}/>
                        LOG OUT
                    </button>
                </div>
                }
            </div>

        </div>
    );
}

export default Navdashhboard;

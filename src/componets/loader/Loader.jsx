import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../loader/Loader.css";
import { div } from "framer-motion/m";
function Loader() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      navigate("/dashboard/home");
    }, 3000); // Wait 3 seconds before navigating

    return () => clearTimeout(timer); // Cleanup timeout
  }, [navigate]);

  return (
 <div className="div-loader-container">

    <div className="loader-container">
      {loading && (
       
        <motion.div
          className="spinner"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      )}
    </div>
 </div>
  );
}

export default Loader;


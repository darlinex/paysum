import React from 'react'
import './Payslip.css'
import { FiDownload } from "react-icons/fi";
import { IoMdArrowUp } from "react-icons/io";

import { CiClock2 } from 'react-icons/ci';

export default function Payslip() {
  return (
    <div className='payslipp-div bg-[#E6EDF3] text-white' >
      <div className="view-payslip flex items-center justify-between ">
        <h1 className="font-medium  flex items-center text-[#00294A] text-lg ">Payslip-March 2025</h1>

        <button className='text-white flex items-center justify-items-start gap-6 bg-[#FF7943]'>
        <FiDownload />

        <IoMdArrowUp />

        </button>
      </div>
       <div className="view-history">
             <button>
               <CiClock2 className="icon4" /> View History
             </button>
           </div>
     
    </div>
  )
}

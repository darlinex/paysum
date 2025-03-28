import React, { useEffect, useState } from 'react';
import './Payslip.css';
import { FiDownload } from "react-icons/fi";
import { IoMdArrowUp } from "react-icons/io";
import { CiClock2 } from 'react-icons/ci';
import { authInstance } from '../axios/axiosinstance';

export default function Payslip() {
  const [payslipUrlCSV, setPayslipUrlCSV] = useState('');
  const [payslipUrlPDF, setPayslipUrlPDF] = useState('');

  useEffect(() => {
    const fetchPayslip = async () => {
      try {
        // Fetch CSV
        const responseCSV = await authInstance.get('/payslip/exportcsv', {
          responseType: 'blob', // Ensure we get binary data
        });
        const urlCSV = URL.createObjectURL(responseCSV.data);
        setPayslipUrlCSV(urlCSV);

        // Fetch PDF
        const responsePDF = await authInstance.get('/payslip/exportpdf', {
          responseType: 'blob',
        });
        const urlPDF = URL.createObjectURL(responsePDF.data);
        setPayslipUrlPDF(urlPDF);

      } catch (error) {
        console.error('Error fetching payslip:', error);
      }
    };

    fetchPayslip();
  }, []); // Add dependency array to prevent infinite re-renders

  return (
    <div className='div'>

    <div className='payslipp-div bg-[#E6EDF3] text-white'>
      <div className="view-payslip flex items-center justify-between">
        <h1 className="font-medium flex items-center text-[#00294A] text-lg">
          Payslip - March 2025
        </h1>

        <button className='text-white flex items-center justify-items-start gap-6 bg-[#FF7943]'>
          <FiDownload />
          <IoMdArrowUp />
        </button>
      </div>
      </div>


        <div className='div2'>


          <div className="view-history2">
            <button>
              <CiClock2 className="icon4" /> View History
            </button>
          </div>

          {(payslipUrlCSV || payslipUrlPDF) && (
  <div className="download-buttons">
        {payslipUrlCSV && (
          <button>
            <a download="payslip.csv" href={payslipUrlCSV}>
              Download CSV
            </a>
          </button>
        )}

        {payslipUrlPDF && (
          <button>
            <a download="payslip.pdf" href={payslipUrlPDF}>
              Download PDF
            </a>
          </button>
        )}
      </div>
    )}
        </div>
    
    </div>

  );
}

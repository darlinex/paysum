import React, { useEffect, useState } from 'react';
import './Payslip.css';
import { CiClock2 } from 'react-icons/ci';
import { FiFilter } from "react-icons/fi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { authInstance } from '../axios/axiosinstance';

export default function Payslip() {
  const [payslipUrlCSV, setPayslipUrlCSV] = useState('');
  const [payslipUrlPDF, setPayslipUrlPDF] = useState('');
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({ name: '', role: '', employmentType: '', date: '' });

  useEffect(() => {
    const fetchPayslip = async () => {
      try {
       
        
        const responseCSV = await authInstance.get('/payslip/exportcsv', { responseType: 'blob' });
        const urlCSV = URL.createObjectURL(responseCSV.data);
        setPayslipUrlCSV(urlCSV);

        const responsePDF = await authInstance.get('/payslip/exportpdf', { responseType: 'blob' });
        const urlPDF = URL.createObjectURL(responsePDF.data);
        setPayslipUrlPDF(urlPDF);
      } catch (error) {
        console.error('Error fetching payslip:', error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await authInstance.get('/employees');
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchPayslip();
    fetchEmployees();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilter = () => {
    let filtered = employees.filter(emp =>
      (!filters.name || emp.fullName.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.role || emp.jobTitle.toLowerCase().includes(filters.role.toLowerCase())) &&
      (!filters.employmentType || emp.employmentType.toLowerCase().includes(filters.employmentType.toLowerCase())) &&
      (!filters.date || new Date(emp.joinDate).toDateString() === new Date(filters.date).toDateString())
    );
    setFilteredEmployees(filtered);
    setShowFilterModal(false);
  };

  return (
    <div className='div'>
      <div className='payslipp-div bg-[#E6EDF3] text-white'>
        <div className="view-payslip flex items-center justify-between">
          <h1 className="font-medium flex items-center text-[#00294A] text-lg">Payslip - March 2025</h1>
          <button className='text-white flex items-center gap-6 bg-[#FF7943] !px-6'>
            Download Report <IoCloudDownloadOutline />
          </button>
        </div>
      </div>

      <div className='div2'>
        <div className='flex items-center justify-between'>
          <div className="view-history2">
            <button><CiClock2 className="icon4" /> View History</button>
          </div>
          <div className="filter-box" onClick={() => setShowFilterModal(true)}>
            <FiFilter className="filter-icon" />
            <span>Filter</span>
            <MdOutlineKeyboardArrowDown className="dropdown-icon" />
          </div>
        </div>

        {showFilterModal && (
          <div className='filter-modal'>
            <div className='clode-button-div'>

            <button className='close-icon'  onClick={() => setShowFilterModal(false)}>
              <AiOutlineClose />
            </button>
            </div>
            <input type='text' name='name' placeholder='Name' value={filters.name} onChange={handleFilterChange} />
            <input type='text' name='role' placeholder='Role' value={filters.role} onChange={handleFilterChange} />
            <input type='text' name='employmentType' placeholder='Employment Type' value={filters.employmentType} onChange={handleFilterChange} />
            <input type='date' name='date' value={filters.date} onChange={handleFilterChange} />
            <button className='apply-filter' onClick={applyFilter}>Apply</button>
          </div>
        )}

        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-md !p-130">
          <thead  className="bg-gray-300 text-[#00294A] font-medium  p-20">
            <tr>
              <th>Full Name</th>
              <th>Gross Pay</th>
              <th>Net Pay</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp, index) => (
              <tr key={index}
              className="border-b hover:bg-gray-100">
                <td>{emp.fullName}</td>
                <td>{emp.grossPay}</td>
                <td>{emp.netPay}</td>
                <td>
                  <button> 
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
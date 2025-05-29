import React, { useEffect, useState, useRef } from 'react';
import './Payslip.css';
import { CiClock2 } from 'react-icons/ci';
import { FiFilter } from "react-icons/fi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { authInstance } from '../axios/axiosinstance';
import { useSearchEmployeeStore } from '../../store/seacrh-employee';
import { GrPrevious, GrNext } from "react-icons/gr";

export default function Payslip() {
  const { search } = useSearchEmployeeStore(); // Only get search from the store
  const [payslipUrlCSV, setPayslipUrlCSV] = useState('');
  const [payslipUrlPDF, setPayslipUrlPDF] = useState('');
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({ name: '', role: '', employmentType: '', date: '' });
  const [refreshKey, setRefreshKey] = useState(0);
  const [downloadHistory, setDownloadHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const actionModalRef = useRef(null);
  const [isSendingPayroll, setIsSendingPayroll] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(15);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Click outside handler for action modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionModalRef.current && !actionModalRef.current.contains(event.target)) {
        setShowModal(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch employees and payslip data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCSV = await authInstance.get('/payslip/exportcsv', { responseType: 'blob' });
        const urlCSV = URL.createObjectURL(responseCSV.data);
        setPayslipUrlCSV(urlCSV);

        const responsePDF = await authInstance.get('/payslip/exportpdf', { responseType: 'blob' });
        const urlPDF = URL.createObjectURL(responsePDF.data);
        setPayslipUrlPDF(urlPDF);

        const response = await authInstance.get('/employee');
        const employeesWithStatus = response.data.data.map(emp => ({
          ...emp,
          statusDelivered: emp.payrollStatus === 'Ready' ? 'Delivered' : 'Pending'
        }));
        setEmployees(employeesWithStatus);
        setFilteredEmployees(employeesWithStatus);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [refreshKey]);

  useEffect(() => {
    const handlePayrollSuccess = () => {
      setRefreshKey(prev => prev + 1);
    };
    window.addEventListener('payrollSuccess', handlePayrollSuccess);
    return () => window.removeEventListener('payrollSuccess', handlePayrollSuccess);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilter = () => {
    const filtered = employees.filter(emp =>
      (!filters.name || emp.fullName.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.role || emp.jobTitle.toLowerCase().includes(filters.role.toLowerCase())) &&
      (!filters.employmentType || emp.employmentType.toLowerCase().includes(filters.employmentType.toLowerCase())) &&
      (!filters.date || new Date(emp.joinDate).toDateString() === new Date(filters.date).toDateString())
    );
    setFilteredEmployees(filtered);
    setShowFilterModal(false);
  };

  // Send all payroll function
  const handleSendAllPayroll = async () => {
    try {
      setIsSendingPayroll(true);
      const response = await authInstance.post('/payslip/send-all');
      alert("Payroll sent successfully to all employees!");
      setRefreshKey(prev => prev + 1); // Refresh the data
    } catch (error) {
      console.error("Error sending payroll:", error);
      alert("Failed to send payroll. Please try again.");
    } finally {
      setIsSendingPayroll(false);
    }
  };

  function handleDownload(id, fullName, grossPay, email) {
    authInstance.get(`/payslip/pdf/${id}`, { responseType: 'blob' })
      .then(response => {
        const url = URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `payslip_${fullName}_${id}.pdf`);
        document.body.appendChild(link);
        link.click();

        // Simplified calculations - adjust as needed
        const deductions = grossPay * 0.2;
        const netPay = grossPay - deductions;

        setDownloadHistory(prevHistory => [
          ...prevHistory,
          {
            fullName,
            email,
            grossPay,
            deductions,
            netPay,
            downloadTime: new Date().toLocaleString()
          }
        ]);
      })
      .catch(error => {
        console.error("Error downloading payslip:", error);
      });
  }

  const ViewHistoryModal = ({ onClose, history }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [localHistory, setLocalHistory] = useState(history);
  
    useEffect(() => {
      setLocalHistory(history);
    }, [history]);
  
    // Filter history based on both searchTerm and global search from Zustand store
    const filteredHistory = localHistory.filter((item) =>
      (searchTerm === '' || 
        item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (search === '' || 
        item.fullName.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()))
    );
  
    const clearHistory = () => {
      setLocalHistory([]);
      setDownloadHistory([]);
    };
  
    return (
      <div className="fixed inset-0 bg-white z-50 p-4 overflow-auto">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-semibold text-[#00294A]">
            Download History - {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-600 hover:text-[#00294A] transition-colors duration-200 rounded-full h-8 w-8 flex items-center justify-center border border-gray-300 hover:border-[#00294A]"
          >
            <AiOutlineClose size={18} />
          </button>
        </div>
  
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#00447B] focus:border-transparent transition-all duration-200"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <AiOutlineClose size={16} />
              </button>
            )}
          </div>
          
          <button
            onClick={clearHistory}
            className="bg-[#FF7943] text-white px-3 py-1.5 rounded hover:bg-[#F05B25] transition-colors duration-200 text-sm flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear
          </button>
        </div>
  
        <table className="w-full border-collapse text-sm shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-[#E6EDF3] text-[#00294A] font-medium">
            <tr>
              <th className="p-3 text-left">Full Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Gross Pay</th>
              <th className="p-3 text-left">Deductions</th>
              <th className="p-3 text-left">Net Pay</th>
              <th className="p-3 text-left">Download Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.length > 0 ? (
              filteredHistory.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition-colors duration-150">
                  <td className="p-3">{item.fullName}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">{item.grossPay}</td>
                  <td className="p-3">{item.deductions}</td>
                  <td className="p-3">{item.netPay}</td>
                  <td className="p-3">{item.downloadTime}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500 bg-gray-50">
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="font-medium">No download history available</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  // Modal for actions
  const ActionModal = ({ employee, onClose }) => {
    return (
      <div ref={actionModalRef} className="absolute z-50 bg-white shadow-lg rounded-md p-3 right-0 mt-2 w-40 border border-gray-300">
        <button
          onClick={() => {
            handleDownload(employee.id, employee.fullName, employee.grossPay, employee.email);
            onClose();
          }}
          className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-sm text-[#00447B]"
        >
          Download
        </button>
       
<button
  onClick={async () => {
    const handleSend = async (id) => {
      try {
        await authInstance.post(`/payslip/send/${id}`);
        alert("Payslip sent successfully!");
      } catch (error) {
        console.error("Failed to send payslip:", error);
        alert("Failed to send payslip. Please try again.");
      } finally {
        onClose(); // Ensure the modal or dialog closes after the action
      }
    };

    await handleSend(employee.id); // Call it with the dynamic id
  }}
  className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-sm text-[#00447B]"
>
  Send
</button>

        <button
          onClick={() => {
            console.log("Delete clicked"); // Replace with actual delete logic
            onClose();
          }}
          className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-sm text-red-500"
        >
          Delete
        </button>
      </div>
    );
  };

  // Apply zustand search to filter employees
  const displayEmployees = search.toLowerCase().trim() === '' 
    ? filteredEmployees 
    : filteredEmployees.filter(emp => 
        emp.fullName.toLowerCase().includes(search.toLowerCase()) || 
        emp.email?.toLowerCase().includes(search.toLowerCase())
      );

  // Pagination logic with filtered results
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = displayEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(displayEmployees.length / employeesPerPage);

  return (
    <div className='div'>
      <div className='payslipp-div bg-[#E6EDF3] text-white'>
        <div className="view-payslip flex items-center justify-between">
          <h1 className="font-medium flex items-center text-[#00294A] text-lg">Payslip - {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</h1>
          <button 
            onClick={handleSendAllPayroll}
            disabled={isSendingPayroll}
            className='text-white flex items-center gap-6 bg-[#FF7943] !px-6 py-2 rounded hover:bg-[#F05B25] transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed'
          >
            {isSendingPayroll ? 'Sending...' : 'Send Payroll'} <IoCloudDownloadOutline />
          </button>
        </div>
      </div>

      <div className='div2'>
        <div className='flex items-center justify-between mb-4'>
          <div className="view-history2">
            <button onClick={() => setShowHistory(true)} className="flex items-center gap-2 text-blue-600 hover:underline">
              <CiClock2 className="icon4" /> View History
            </button>
          </div>
          <div className="filter-box cursor-pointer" onClick={() => setShowFilterModal(true)}>
            <FiFilter className="filter-icon" />
            <span>Filter</span>
            <MdOutlineKeyboardArrowDown className="dropdown-icon" />
          </div>
        </div>

        {showFilterModal && (
          <div className='filter-modal'>
            <div className='clode-button-div'>
              <button className='close-icon' onClick={() => setShowFilterModal(false)}>
                <AiOutlineClose />
              </button>
            </div>
            <input 
              type='text' 
              name='name' 
              placeholder='Name' 
              value={filters.name} 
              onChange={handleFilterChange} 
            />
            <input 
              type='text' 
              name='role' 
              placeholder='Role' 
              value={filters.role} 
              onChange={handleFilterChange} 
            />
            <input 
              type='text' 
              name='employmentType' 
              placeholder='Employment Type' 
              value={filters.employmentType} 
              onChange={handleFilterChange} 
            />
            <input 
              type='date' 
              name='date' 
              value={filters.date} 
              onChange={handleFilterChange} 
            />
            <button className='apply-filter' onClick={applyFilter}>Apply</button>
          </div>
        )}

        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-md">
          <thead className="bg-[#E6EDF3] text-[#00294A] font-medium">
            <tr>
              <th className="p-3 text-left font-medium">Full Name</th>
              <th className="p-3 text-left font-medium">Status</th>
              <th className="p-3 text-left font-medium">Gross Pay</th>
              <th className="p-3 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.length > 0 ? (
              currentEmployees.map((emp, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="p-3">{emp.fullName}</td>
                  <td className="p-3">{emp.statusDelivered}</td>
                  <td className="p-3">{emp.grossPay}</td>
                  <td className="p-3 text-center">
                    <div className="relative inline-block text-left">
                      <button 
                        onClick={() => {
                          setSelectedEmployee(emp);
                          setShowModal(emp.id); // Store ID of selected employee
                        }}
                        className="text-[#00447B] hover:text-blue-800 flex items-center justify-center mx-auto"
                      >
                        <BsThreeDotsVertical size={18} />
                      </button>

                      {showModal === emp.id && (
                        <ActionModal employee={emp} onClose={() => setShowModal(null)} />
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-5 text-center font-semibold text-gray-500">
                  No employee found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        {/* Pagination Controls */}
        <div className="flex justify-end mt-4">
          <div className="flex items-center space-x-2 gap-4 !my-5">
            {/* Previous */}
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded border flex items-center justify-center ${currentPage === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400'
                : 'bg-white text-[#336F9F] border-[#336F9F] border-2 font-extrabold hover:bg-blue-100'
                }`}
            >
              <GrPrevious />
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages).keys()].map(number => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`w-10 h-10 rounded border flex items-center justify-center font-semibold ${currentPage === number + 1
                  ? 'bg-[#00447B] text-[#ffffff] border-blue-800'
                  : 'bg-white text-[#00447B] border-blue-600 hover:bg-blue-100'
                  }`}
              >
                {number + 1}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className={`w-10 h-10 rounded border flex items-center justify-center ${currentPage >= totalPages
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400'
                : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-100'
                }`}
            >
              <GrNext />
            </button>
          </div>
        </div>
      </div>

      {showHistory && <ViewHistoryModal onClose={() => setShowHistory(false)} history={downloadHistory} />}
    </div>
  );
}
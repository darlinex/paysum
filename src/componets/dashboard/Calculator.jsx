import React, { useState, useEffect, useRef } from 'react';
import './Calculator.css';
import { CiMenuKebab } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { GrNext, GrPrevious } from "react-icons/gr";
import { authInstance } from '../axios/axiosinstance';
import { DownloadIcon, Trash2Icon, User, Phone, Mail, Edit } from 'lucide-react';
import { useSearchEmployeeStore } from '../../store/seacrh-employee';
import AddEmployeeModal from './add_emplotee_modal/AddEmployeeModal';

// Employee Details Modal Component
const EmployeeModal = ({ employee, onClose, onEdit }) => {
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(55, 65, 81, 0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      zIndex: 1000
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      width: '100%',
      maxWidth: '512px',
      position: 'relative'
    },
    header: {
      position: 'absolute',
      top: '16px',
      left: '24px'
    },
    headerTitle: {
      color: '#6b7280',
      fontWeight: '500',
      fontSize: '14px',
      margin: 0
    },
    closeButton: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      backgroundColor: '#ef4444',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    employeeInfo: {
      paddingTop: '64px',
      paddingBottom: '24px',
      textAlign: 'center'
    },
    avatar: {
      width: '80px',
      height: '80px',
      backgroundColor: '#e5e7eb',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px'
    },
    employeeName: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#111827',
      margin: '0 0 4px 0'
    },
    employeeRole: {
      color: '#6b7280',
      fontSize: '14px',
      margin: 0
    },
    content: {
      padding: '0 24px 24px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '32px',
      marginBottom: '24px'
    },
    section: {},
    sectionTitle: {
      color: '#111827',
      fontWeight: '600',
      marginBottom: '12px',
      fontSize: '14px',
      margin: '0 0 12px 0'
    },
    detailItem: {
      marginBottom: '8px',
      fontSize: '12px'
    },
    detailLabel: {
      color: '#6b7280'
    },
    detailValue: {
      color: '#111827'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '8px',
      fontSize: '12px'
    },
    contactIcon: {
      width: '12px',
      height: '12px',
      color: '#f97316',
      marginRight: '8px',
      flexShrink: 0
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '12px'
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      color: 'white',
      borderRadius: '4px',
      fontSize: '14px',
      fontWeight: '500',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    editButton: {
      backgroundColor: '#3b82f6'
    },
    deleteButton: {
      backgroundColor: '#ef4444'
    },
    buttonIcon: {
      width: '16px',
      height: '16px'
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.headerTitle}>Employee Details</h2>
        </div>
        <button 
          onClick={onClose}
          style={styles.closeButton}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
        >
          ×
        </button>

        {/* Employee Info */}
        <div style={styles.employeeInfo}>
          <div style={styles.avatar}>
            <User style={{width: '48px', height: '48px', color: '#6b7280'}} />
          </div>
          <h3 style={styles.employeeName}>{employee.employeeFullName}</h3>
          <p style={styles.employeeRole}>{employee.employee?.jobTitle || 'Employee'}</p>
        </div>

        {/* Content */}
        <div style={styles.content}>
          <div style={styles.grid}>
            {/* Company Details */}
            <div style={styles.section}>
              <h4 style={styles.sectionTitle}>Company Details</h4>
              <div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Employee ID: </span>
                  <span style={styles.detailValue}>{employee.id}</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Department: </span>
                  <span style={styles.detailValue}>{employee.employee?.department || 'N/A'}</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Employment Type: </span>
                  <span style={styles.detailValue}>{employee.employee?.employmentType || 'Full-time'}</span>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div style={styles.section}>
              <h4 style={styles.sectionTitle}>Contact Details</h4>
              <div>
                <div style={styles.contactItem}>
                  <Phone style={styles.contactIcon} />
                  <span style={styles.detailValue}>{employee.employee?.phone || 'N/A'}</span>
                </div>
                <div style={styles.contactItem}>
                  <Mail style={styles.contactIcon} />
                  <span style={styles.detailValue}>{employee.employee?.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.grid}>
            {/* Account Details */}
            <div style={styles.section}>
              <h4 style={styles.sectionTitle}>Account Details</h4>
              <div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Bank Name: </span>
                  <span style={styles.detailValue}>{employee.employee?.bankName || 'N/A'}</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Account Number: </span>
                  <span style={styles.detailValue}>{employee.employee?.accountNumber || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Payroll Details */}
            <div style={styles.section}>
              <h4 style={styles.sectionTitle}>Payroll Details</h4>
              <div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Gross Pay: </span>
                  <span style={styles.detailValue}>₦{employee.grossPay}</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Deductions: </span>
                  <span style={styles.detailValue}>₦{employee.deductions}</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Net Pay: </span>
                  <span style={styles.detailValue}>₦{employee.netPay}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={styles.buttonContainer}>
            <button 
              style={{...styles.button, ...styles.editButton}}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
              onClick={() => onEdit(employee)}
            >
              <Edit style={styles.buttonIcon} />
              Edit
            </button>
            <button 
              style={{...styles.button, ...styles.deleteButton}}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
              onClick={() => {
                // You can add delete functionality here
                console.log('Delete employee:', employee.id);
              }}
            >
              <Trash2Icon style={styles.buttonIcon} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function CalculatorScreen() {
  const {search, setSearch} = useSearchEmployeeStore();
  const [payroll, setPayroll] = useState([]);
  const [payslipUrlCSV, setPayslipUrlCSV] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activePopoverId, setActivePopoverId] = useState(null);
  const [viewHistory, setViewHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [popoverDirection, setPopoverDirection] = useState('down');
  
  // New state for employee modal and edit functionality
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const popoverRef = useRef(null);
  const employeesPerPage = 10;

  // Function to handle view details
  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeModal(true);
    setActivePopoverId(null); // Close the popover
  };

  // Function to close employee modal
  const handleCloseEmployeeModal = () => {
    setShowEmployeeModal(false);
    setSelectedEmployee(null);
  };

  // Function to handle edit employee
  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setShowEmployeeModal(false); // Close details modal
    setShowAddEmployeeModal(true); // Open add/edit modal
  };

  // Function to close add/edit modal
  const handleCloseAddEmployeeModal = () => {
    setShowAddEmployeeModal(false);
    setEditingEmployee(null);
  };

  // Function to update employee list after edit
  const handleEmployeeUpdated = (updatedEmployee) => {
    setPayroll(prevPayroll => 
      prevPayroll.map(emp => 
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
  };

  useEffect(() => {
    async function getEmployees() {
      try {
        const responseCSV = await authInstance.get('/payslip/exportcsv', { responseType: 'blob' });
        const urlCSV = URL.createObjectURL(responseCSV.data);
        setPayslipUrlCSV(urlCSV);

        const response = await authInstance.get('/payroll/');
        if (response.status === 201 || response.status === 200) {
          setPayroll(response.data.payrolls);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    }
    getEmployees();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setActivePopoverId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function payrollDownload(id, fullName, grossPay, deductions, netPay, email) {
    authInstance.get(`/payslip/pdf/${id}`, { responseType: 'blob' })
      .then(response => {
        const url = URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `payslip_${fullName}_${id}.pdf`);
        document.body.appendChild(link);
        link.click();

        const updatedPayroll = payroll.filter(emp => emp.id !== id);
        setPayroll(updatedPayroll);

        setViewHistory(prevHistory => [
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
        console.error(error);
      });
  }

  async function deleteEmp(id) {
    try {
      const response = await authInstance.delete(`/payroll/${id}`);
      if (response.status === 201 || response.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = payroll.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const ViewHistoryModal = ({ onClose, history }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [localHistory, setLocalHistory] = useState(history);
  
    useEffect(() => {
      setLocalHistory(history);
    }, [history]);
  
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
      setViewHistory([]);
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
            <span className="text-lg">&times;</span>
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
                <span className="text-sm">&times;</span>
              </button>
            )}
          </div>
          
          <button
            onClick={clearHistory}
            className="bg-[#FF7943] text-white px-3 py-1.5 rounded hover:bg-[#F05B25] transition-colors duration-200 text-sm flex items-center gap-1.5"
          >
            <Trash2Icon size={16} />
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
              (search.toLowerCase().trim() === '' 
                ? filteredHistory 
                : filteredHistory.filter(emp => 
                    emp.fullName.toLowerCase().includes(search.toLowerCase()) || 
                    emp.email.toLowerCase().includes(search.toLowerCase())
                  )
              ).map((item, index) => (
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

  return (
    <div className="calculator p-4">
      <div className="payroll flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Payroll - {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
        <button onClick={() => window.open(payslipUrlCSV, '_blank')} disabled={!payslipUrlCSV} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2">
          Download payroll <DownloadIcon size={16} />
        </button>
      </div>

      <div className="view-history mb-4">
        <button onClick={() => setShowHistory(true)} className="text-blue-600 hover:underline flex items-center gap-2 ">
          <CiClock2 size={20} /> View History
        </button>
      </div>

      <table className="payroll-table w-full border-collapse rounded-lg overflow-hidden shadow-md">
        <thead className="bg-[#E6EDF3] text-[#00294A] font-medium">
          <tr>
            <th className="p-3 text-left">Full Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Gross Pay</th>
            <th className="p-3 text-left">Deductions</th>
            <th className="p-3 text-left">Net Pay</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payroll.length > 0 ? search.toLowerCase().trim() === '' ? (
            currentEmployees.map((emp) => (
              <tr key={emp.id} className="border-b hover:bg-blue-50 text-sm">
                <td className="p-4">{emp.employeeFullName}</td>
                <td className="p-4">{emp.employee.email}</td>
                <td className="p-4">{emp.grossPay}</td>
                <td className="p-4">{emp.deductions}</td>
                <td className="p-4">{emp.netPay}</td>
                <td className="p-4 relative">
                  <button
                    onClick={() => setActivePopoverId(emp.id === activePopoverId ? null : emp.id)}
                    className="text-gray-700 hover:text-blue-700"
                  >
                    <CiMenuKebab size={20} />
                  </button>
                  {activePopoverId === emp.id && (
                    <div
                      ref={popoverRef}
                      className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg z-10"
                    >
                      <button
                        onClick={() => {
                          payrollDownload(emp.id, emp.employeeFullName, emp.grossPay, emp.deductions, emp.netPay, emp.employee.email);
                          setActivePopoverId(null);
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                      >
                        <DownloadIcon size={16} /> Download
                      </button>

                      <button
                        onClick={() => handleViewDetails(emp)}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                      >
                        <User size={16} /> View Details
                      </button>

                      <button
                        onClick={() => {
                          deleteEmp(emp.id);
                          setActivePopoverId(null);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Trash2Icon size={16} /> Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            currentEmployees.filter(emp => emp.employeeFullName.toLowerCase().includes(search.toLowerCase()) || emp.employee.email.toLowerCase().includes(search.toLowerCase()))
              .map((emp) => (
                <tr key={emp.id} className="border-b hover:bg-blue-50 text-sm">
                  <td className="p-4">{emp.employeeFullName}</td>
                  <td className="p-4">{emp.employee.email}</td>
                  <td className="p-4">{emp.grossPay}</td>
                  <td className="p-4">{emp.deductions}</td>
                  <td className="p-4">{emp.netPay}</td>
                  <td className="p-4 relative">
                    <button
                      onClick={() => setActivePopoverId(emp.id === activePopoverId ? null : emp.id)}
                      className="text-gray-700 hover:text-blue-700"
                    >
                      <CiMenuKebab size={20} />
                    </button>
                    {activePopoverId === emp.id && (
                      <div
                        ref={popoverRef}
                        className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg z-10"
                      >
                        <button
                          onClick={() => {
                            payrollDownload(emp.id, emp.employeeFullName, emp.grossPay, emp.deductions, emp.netPay, emp.employee.email);
                            setActivePopoverId(null);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                        >
                          <DownloadIcon size={16} /> Download
                        </button>

                        <button
                          onClick={() => handleViewDetails(emp)}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                        >
                          <User size={16} /> View Details
                        </button>

                        <button
                          onClick={() => {
                            deleteEmp(emp.id);
                            setActivePopoverId(null);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Trash2Icon size={16} /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-end mt-4 ">
        <div className="flex items-center space-x-2 gap-4 !my-5">
          {/* Previous Button */}
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-10 h-10 rounded border flex items-center justify-center ${
              currentPage === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400'
                : 'bg-white text-[#336F9F] border-[#336F9F ] border-2 font-extrabold hover:bg-blue-100 '
            }`}
          >
            <GrPrevious />
          </button>

          {/* Page Numbers */}
          {[...Array(Math.ceil(payroll.length / employeesPerPage)).keys()].map(number => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={`w-10 h-10 rounded border flex items-center justify-center font-semibold ${
                currentPage === number + 1
                  ? 'bg-[#00447B] text-[#ffffff] border-blue-800'
                  : 'bg-white text-[#00447B] border-blue-600 hover:bg-blue-100'
              }`}
            >
              {number + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastEmployee >= payroll.length}
            className={`w-10 h-10 rounded border flex items-center justify-center ${
              indexOfLastEmployee >= payroll.length
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400'
                : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-100'
            }`}
          >
            <GrNext />
          </button>
        </div>
      </div>

      {/* Modals */}
      {showHistory && <ViewHistoryModal onClose={() => setShowHistory(false)} history={viewHistory} />}
      {showEmployeeModal && selectedEmployee && (
        <EmployeeModal 
          employee={selectedEmployee} 
          onClose={handleCloseEmployeeModal}
          onEdit={handleEditEmployee}
        />
      )}
      {showAddEmployeeModal && (
        <AddEmployeeModal
          setEmployees={setPayroll}
          setShowModal={handleCloseAddEmployeeModal}
          setFilteredEmployees={setPayroll}
          editingEmployee={editingEmployee}
          onEmployeeUpdated={handleEmployeeUpdated}
        />
      )}
    </div>
  );
}

export default CalculatorScreen;
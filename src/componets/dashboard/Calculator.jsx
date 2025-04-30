import React, { useState, useEffect, useRef } from 'react';
import './Calculator.css';
import { CiMenuKebab } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { GrNext, GrPrevious } from "react-icons/gr";
import { authInstance } from '../axios/axiosinstance';
import { DownloadIcon, Trash2Icon } from 'lucide-react';

function CalculatorScreen() {
  const [payroll, setPayroll] = useState([]);
  const [payslipUrlCSV, setPayslipUrlCSV] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activePopoverId, setActivePopoverId] = useState(null);

  const popoverRef = useRef(null);

  const employeesPerPage = 10;

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

  // Close popover on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setActivePopoverId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function payrollDownload(id, fullName) {
    authInstance.get(`/payslip/pdf/${id}`, { responseType: 'blob' })
      .then(response => {
        const url = URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `paysum_${fullName}_payslip_${id}.pdf`);
        document.body.appendChild(link);
        link.click();

        const updatedPayroll = payroll.filter(emp => emp.id !== id);
        setPayroll(updatedPayroll);

        const downloaded = JSON.parse(localStorage.getItem('downloadedPayslips') || '[]');
        if (!downloaded.includes(id)) {
          downloaded.push(id);
          localStorage.setItem('downloadedPayslips', JSON.stringify(downloaded));
        }
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

  return (
    <div className='calculator'>
      <div className="payroll flex items-center justify-between">
        <h3>Payroll - {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
        <div className="run-payroll">
          <button onClick={() => window.open(payslipUrlCSV, '_blank')} disabled={!payslipUrlCSV}>
            Download payroll <DownloadIcon className="icon3" />
          </button>
        </div>
      </div>

      <div className="view-history">
        <button>
          <CiClock2 className="icon4" /> View History
        </button>
      </div>

      <table className="payroll-table w-full border-collapse rounded-lg overflow-hidden shadow-md">
        <thead className="bg-[#E6EDF3] text-[#00294A] font-medium">
          <tr>
            <th className="p-3 text-left font-medium">Full Name</th>
            <th className="p-3 text-left font-medium">Email</th>
            <th className="p-3 text-left font-medium">Gross Pay</th>
            <th className="p-3 text-left font-medium">Deductions</th>
            <th className="p-3 text-left font-medium">Net Pay</th>
            <th className="p-3 text-left font-medium">Actions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {payroll.length > 0 ? (
            currentEmployees.map((emp) => (
              <tr key={emp.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{emp.employeeFullName}</td>
                <td className="p-3">{emp.employee.email}</td>
                <td className="p-3">{emp.grossPay}</td>
                <td className="p-3">{emp.deductions}</td>
                <td className="p-3">{emp.netPay}</td>
                <td className="p-3 relative">
                  <button
                    onClick={() => setActivePopoverId(emp.id === activePopoverId ? null : emp.id)}
                    className="text-black hover:text-blue-700"
                  >
                   
                    <CiMenuKebab  size={20} />
                  </button>

                  {activePopoverId === emp.id && (
                    <div
                      ref={popoverRef}
                      className=" right-0 mt-2 w-40 bg-white border rounded shadow-md z-10"
                    >
                      <button
                        className="w-full text-left !px-4 py-2 hover:bg-gray-100 flex items-center gap-3"
                        onClick={() => {
                          payrollDownload(emp.id, emp.employeeFullName);
                          setActivePopoverId(null);
                        }}
                      >
                        <DownloadIcon size={16} /> Download
                      </button>
                      <button
                        className="w-full text-left !px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center gap-3"
                        onClick={() => {
                          deleteEmp(emp.id);
                          setActivePopoverId(null);
                        }}
                      >
                        <Trash2Icon size={16} /> Delete
                      </button>
                    </div>
                  )}
                </td>
                <td></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No employee found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination-container">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          <GrPrevious />
        </button>
        {[...Array(Math.ceil(payroll.length / employeesPerPage))].map((_, i) => (
          <button key={i + 1} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? "active" : ""}>
            {i + 1}
          </button>
        ))}
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(payroll.length / employeesPerPage)))}
          disabled={currentPage === Math.ceil(payroll.length / employeesPerPage)}>
          <GrNext />
        </button>
      </div>
    </div>
  );
}

export default CalculatorScreen;




// view history-history of all dowloaded payslip of employees
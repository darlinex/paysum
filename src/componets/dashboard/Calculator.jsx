// import React from 'react'
import React, { useState, useEffect } from 'react';

import './Calculator.css'
import { BsBoxArrowUpRight } from "react-icons/bs";
import { CiClock2 } from "react-icons/ci";
import { GrNext, GrPrevious } from "react-icons/gr";
import { authInstance } from '../axios/axiosinstance';
import { DownloadIcon, Trash2Icon } from 'lucide-react';

function CalculatorScreen() {
  const [payroll, setPayroll] = useState([]);
  const [payslipUrlCSV, setPayslipUrlCSV] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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

  function payrollDownload(id, fullName) {
    authInstance.get(`/payslip/pdf/${id}`, { responseType: 'blob' })
      .then(response => {
        const url = URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `paysum_${fullName}_payslip_${id}.pdf`);
        document.body.appendChild(link);
        link.click();
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
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='calculator'>
      <div className="payroll flex items-center justify-between">
        <h3>Payroll - March 2025</h3>
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

      <table className="payroll-table w-full border-collapse bg-white rounded-lg overflow-hidden shadow-md">
        <thead className="bg-[#E6EDF3] text-[#00294A] font-medium">
          <tr>
            <th className="p-3 text-left">Full Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Gross Pay</th>
            <th className="p-3 text-left">Deductions</th>
            <th className="p-3 text-left">Net Pay</th>
            <th className="p-3 text-left">Actions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {payroll.length > 0 ? (
            payroll.map((emp, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="p-3">{emp.employeeFullName}</td>
                <td className="p-3">{emp.employee.email}</td>
                <td className="p-3">{emp.grossPay}</td>
                <td className="p-3">{emp.deductions}</td>
                <td className="p-3">{emp.netPay}</td>
                <td className="p-3">
                  <button className='flex gap-2 bg-gray-200 items-center !px-4 !py-2 text-black'
                    onClick={() => payrollDownload(emp.id, emp.employeeFullName)}>
                    <DownloadIcon />
                    Download
                  </button>
                </td>
                <td>
                  <button className='bg-[#FF7943] flex gap-2 items-center !px-4 !py-2 text-white' onClick={() => deleteEmp(emp.id)}>
                    <Trash2Icon />
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No employee found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination-container">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          <GrPrevious />
        </button>

        {[...Array(Math.ceil(filteredEmployees.length / employeesPerPage))].map((_, i) => (
          <button key={i + 1} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? "active" : ""}>
            {i + 1}
          </button>
        ))}

        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredEmployees.length / employeesPerPage)))}
          disabled={currentPage === Math.ceil(filteredEmployees.length / employeesPerPage)}>
          <GrNext />
        </button>
      </div>
    </div>
  );
}

export default CalculatorScreen;

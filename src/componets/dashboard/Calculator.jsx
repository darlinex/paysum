// import React from 'react'
import React, { useState, useEffect } from 'react';

import './Calculator.css'
import { BsBoxArrowUpRight } from "react-icons/bs";
import { CiClock2 } from "react-icons/ci";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { authInstance } from '../axios/axiosinstance';

function CalculatorScreen() {
  const [payroll, setPayroll] = useState([]);
  // const [employeePayroll, setEmployeePayroll] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    async function getEmployees() {
      try {
        const response = await authInstance.get('/payroll/');
        if (response.status === 201 || response.status === 200) {
          setPayroll(response.data.payrolls);
          console.log(response.data.payrolls);

        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    }

    getEmployees();
  }, []);




  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10;


  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);


  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  return (
    <div className='calculator'>
      <div className="payroll flex items-center justify-between">
        <h3>Payroll - March 2025</h3>
        <div className="run-payroll">
          <button>
            Run payroll <BsBoxArrowUpRight className="icon3" />
          </button>
        </div>


      </div>
      <div className="view-history">
        <button>
          <CiClock2 className="icon4" /> View History
        </button>
      </div>



      <div className='roll bg-gray-300 flex justify-between rounded-md font-medium text-[#00294A]'>
        <div>Full Name</div>
        <div>Email</div>
        <div>Gross Pay</div>
        <div>Deductions</div>
        <div>Net Pay</div>
      </div>

      {payroll.length > 0 ? (
        payroll.map((emp, index) => (
          <div className='flex w-full justify-between' key={index}>
            <div>{emp.employeeFullName}</div>
            <div>{emp.employee.email}</div>
            <div>{emp.grossPay}</div>
            <div>{emp.deductions}</div>
            <div>{emp.netPay}</div>
          </div>
        ))
      ) : (
        <p>No employee found</p>
      )}

      {/* Pagination */}
      <div className="pagination-container">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <GrPrevious />
        </button>

        {[...Array(Math.ceil(filteredEmployees.length / employeesPerPage))].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredEmployees.length / employeesPerPage)))}
          disabled={currentPage === Math.ceil(filteredEmployees.length / employeesPerPage)}
        >
          <GrNext />
        </button>
      </div>

    </div>
  )
}

export default CalculatorScreen

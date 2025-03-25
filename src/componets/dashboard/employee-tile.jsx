import React from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";
import './employee-tile.css'
import { authInstance } from '../axios/axiosinstance';

function EmployeeTile({ employee }) {
    function runPayroll(e) {
        const empId = { employeeId: parseInt(e.target.id) }
        console.log(e.target.id)
        authInstance.post("/payroll/", empId).then((res) => {
            console.log(res.data)
        })
    }



    return (
        <div className=' table-fields  flex justify-between border-b border-gray-400  items-center'>
            <div className='text-[#00294A]'>{employee.fullName}</div>
            <div className='text-[#00294A]'>{employee.jobTitle}</div>

            <div className='text-[#00294A]'>{employee.employmentType}</div>
            <button id={employee.id} className='payroll-ready2' onClick={runPayroll}>Run Payroll</button>

        </div>
    );
}

export default EmployeeTile;

function PayrollTile({ payroll }) {
    return (
        <div>
            <div>{payroll.fullName}</div>

            <div>{payroll.grossPay}</div>
            <div>{payroll.deductions}</div>
            <div>{payroll.netPay}</div>
            <div> Ready</div>
            <HiOutlineDotsVertical />
        </div>
    )
}

export { PayrollTile }
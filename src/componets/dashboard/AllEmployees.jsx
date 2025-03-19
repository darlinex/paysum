import React, { useState } from 'react';
import { FiFilter } from "react-icons/fi";
import AddEmployeeModal from './add_emplotee_modal/AddEmployeeModal';
import EmployeeTile from './employee-tile';
import './AllEmployees.css'

export default function AllEmployees() {
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    console.log(employees)

    return (
        <div className='employee-page'>
            <div className='flex justify-between p-10'>
                <button className="p-2 bg-blue-600 text-white rounded" onClick={() => setShowModal(true)}>
                    Add Employee
                </button>
                <div className='flex gap-4'>
                    <div><FiFilter /></div>
                    <div>Filter</div>
                </div>
            </div>

            {showModal && <AddEmployeeModal setEmployees={setEmployees} setShowModal={setShowModal} />}

            <div className='bg-gray-300 flex justify-between p-2 font-bold'>
                <div>Full Name</div>
                <div>Role</div>
                <div>Email</div>
                <div>Employment Type</div>
            </div>

            <div>
                {employees.map((emp, index) => (
                    <EmployeeTile employee={emp} key={index} />
                ))}
            </div>
        </div>
    );
}

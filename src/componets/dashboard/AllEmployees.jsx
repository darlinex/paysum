import React, { useEffect, useState } from 'react';
import { FiFilter } from "react-icons/fi";
import AddEmployeeModal from './add_emplotee_modal/AddEmployeeModal';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import EmployeeTile from './employee-tile';
import { IoClose } from "react-icons/io5";
import './AllEmployees.css';
import { GrNext, GrPrevious } from "react-icons/gr";
import { authInstance } from '../axios/axiosinstance';

export default function AllEmployees() {
    const EMPLOYEES_PER_PAGE = 10;
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [currentEmployees, setCurrentEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filters, setFilters] = useState({ name: '', role: '', employmentType: '', date: '' });
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function getEmployees() {
            try {
                const response = await authInstance.get('/employee');
                if (response.status === 201 || response.status === 200) {
                    setEmployees(response.data.data);
                    setFilteredEmployees(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        }
        getEmployees();
    }, []);


    useEffect(() => {
       console.log(employees)
    }, [employees]);


    useEffect(() => {
        const indexOfLastEmployee = currentPage * EMPLOYEES_PER_PAGE;
        const indexOfFirstEmployee = indexOfLastEmployee - EMPLOYEES_PER_PAGE;
        setCurrentEmployees(filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee));
    }, [currentPage, filteredEmployees, employees]);

    const totalPages = Math.ceil(filteredEmployees.length / EMPLOYEES_PER_PAGE);

    const handleFilter = () => {
        let filtered = employees.filter(emp =>
            (!filters.name || emp.fullName.toLowerCase().includes(filters.name.toLowerCase())) &&
            (!filters.role || emp.jobTitle.toLowerCase().includes(filters.role.toLowerCase())) &&
            (!filters.employmentType || emp.employmentType.toLowerCase().includes(filters.employmentType.toLowerCase())) &&
            (!filters.date || new Date(emp.joinDate).toDateString() === new Date(filters.date).toDateString())
        );
        setFilteredEmployees(filtered);
        setCurrentPage(1);
    };

    function handleSubmit(e){
        e.preventDefault();
        employees.grosspay = parseInt(employees.grosspay);
        console.log(employees)
        authInstance.post('/employee/', employees).then((res) => {
            console.log(res)
        })
    }

    return (
        <div className='employee-page'>
            <div className="top-table">
                <div className="employee"><div>Employees</div><button>{employees.length}</button></div>
                <div className="activee"><div>Active</div><button>{employees.length}</button></div>
                <div className="inactivee"><div>Inactive</div><button>0</button></div>
                <div className="readyy"><div>Payroll ready</div><button>30/40</button></div>
            </div>

            <div className='button-filter flex justify-between'>
                <button className="add-employee-btn" onClick={() => setShowModal(true)}>
                    <IoIosAdd className="icon2" /> Add Employee
                </button>
                <div className="filter-box" onClick={() => setShowFilterModal(true)}>
                    <FiFilter className="filter-icon" />
                    <span>Filter</span>
                    <MdOutlineKeyboardArrowDown className="dropdown-icon" />
                </div>
            </div>

            {showModal && <AddEmployeeModal setEmployees={setEmployees} setShowModal={setShowModal} setFilteredEmployees={setFilteredEmployees} />}

            {showFilterModal && (
                <div className="filter-modal">
                    <div className='close-div flex items-center justify-between'>
                        <h3>Filter Employees</h3>
                        <IoClose className='close-filter' onClick={() => setShowFilterModal(false)} />
                    </div>
                    <input type="text" placeholder="Name" onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))} />
                    <input type="text" placeholder="Role" onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))} />
                    <input type="text" placeholder="Employment Type" onChange={(e) => setFilters(prev => ({ ...prev, employmentType: e.target.value }))} />
                    <input type="date" onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))} />
                    <button className='apply-filter' onClick={handleFilter}>Apply Filter</button>
                </div>
            )}

            <div className='roll bg-gray-300 flex justify-between rounded-md font-medium text-[#00294A] items-center w-full'>
                <div>Full Name</div>
                <div>Role</div>
                <div>Employment Type</div>
                <div>Payroll Status</div>
            </div>

            {currentEmployees.length > 0 ? (
                currentEmployees.map((emp, index) => (
                    <EmployeeTile employee={emp} key={index} />
                ))
            ) : (
                <p>No employee found</p>
            )}


            <div>
                <button onClick={handleSubmit}>
                    Add Employees
                </button>
                {/* Pagination */}
                <div className="pagination-container">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <GrPrevious />
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={currentPage === i + 1 ? "active" : ""}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        <GrNext />
                    </button>
                </div>
            </div>

        </div>
    );
}

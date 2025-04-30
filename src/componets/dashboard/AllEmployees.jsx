import React, { useEffect, useState } from 'react';
import { FiFilter } from "react-icons/fi";
import AddEmployeeModal from './add_emplotee_modal/AddEmployeeModal';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
// import EmployeeTile from './employee-tile';
import { IoClose } from "react-icons/io5";
import './AllEmployees.css';
import { GrNext, GrPrevious } from "react-icons/gr";
import { authInstance } from '../axios/axiosinstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineCloudUpload } from "react-icons/md";
import  BulkUploadModal from './add_emplotee_modal/RunPayrollModal';

export default function AllEmployees() {
    const EMPLOYEES_PER_PAGE = 10;
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [currentEmployees, setCurrentEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filters, setFilters] = useState({ name: '', role: '', employmentType: '', date: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
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
    
    function runPayroll(e) {
        const empId = parseInt(e.target.id);
        
        authInstance.post("/payroll/", { employeeId: empId })
        .then((res) => {
            console.log(res.data);
            toast.success("Payroll ran successfully!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            
            // Update payroll status dynamically
            setEmployees((prevEmployees) =>
                prevEmployees.map((emp) =>
                    emp.id === empId ? { ...emp, payrollStatus: "Ready" } : emp
        )
    );
    
    setFilteredEmployees((prevFiltered) =>
        prevFiltered.map((emp) =>
            emp.id === empId ? { ...emp, payrollStatus: "Ready" } : emp
)
);
})
.catch((error) => {
    console.error("Payroll error:", error);
    toast.error("Failed to run payroll. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            });
        }
        
        
        
        function handleSubmit(e) {
            e.preventDefault();
            employees.grosspay = parseFloat(employees.grosspay).toFixed(2);
            console.log(employees)
            authInstance.post('/employee/', employees).then((res) => {
                console.log(res)
            })
        }

        function toggleOpen() {
            setIsModalOpen(!isModalOpen)
        };

    return (
        <div className='employee-page'>
            {/* <div className="top-table">
                <div className="employee"><div>Employees</div><button>{employees.length}</button></div>
                <div className="activee"><div>Active</div><button>{employees.length}</button></div>
                <div className="inactivee"><div>Inactive</div><button>0</button></div>
                <div className="readyy"><div>Payroll ready</div><button>9</button></div>
            </div> */}

            <div className='button-filter flex justify-between'>
                <div className='div-resp'>

                <button className="add-employee-btn" onClick={() => setShowModal(true)}>
                    <IoIosAdd className="icon2" /> Add Employee
                </button>
                <button className="add-employee-btn2"
                onClick={toggleOpen}>
                    <MdOutlineCloudUpload className="icon2" /
                > Bulk Upload
                </button>
                </div>
                <div className="filter-box" onClick={() => setShowFilterModal(true)}>
                    <FiFilter className="filter-icon" />
                    <span>Filter</span>
                    <MdOutlineKeyboardArrowDown className="dropdown-icon" />
                </div>
            </div>

            {showModal && <AddEmployeeModal setEmployees={setEmployees} setShowModal={setShowModal} setFilteredEmployees={setFilteredEmployees} />}
            {isModalOpen && <BulkUploadModal setIsOpen={setIsModalOpen} />}

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

            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-md">
                <thead className="bg-[#E6EDF3] text-[#00294A] font-medium">
                    <tr>
                        <th className="p-3 text-left font-medium">Full Name</th>
                        <th className="p-3 text-left font-medium">Role</th>
                        <th className="p-3 text-left font-medium">Employment Type</th>
                        <th className="p-3 text-left font-medium">Payroll Status</th>
                        <th className="p-3 text-center font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEmployees.length > 0 ? (
                        currentEmployees.map((employee, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100">
                                <td className="p-3">{employee.fullName}</td>
                                <td className="p-3">{employee.jobTitle}</td>
                                <td className="p-3">{employee.employmentType}</td>
                                <td className="p-3">{employee.payrollStatus || "Pending"}</td>
                                <td className="p-3 text-center">
                                    <button
                                        id={employee.id}
                                        className="bg-gray-100 shadow-md text-green-600 !px-4 !py-2 rounded-md hover:bg-green-200 transition"
                                        onClick={runPayroll}
                                    >
                                        Run Payroll
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="p-5 text-center font-semibold text-gray-500">
                                No employee found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>




            <div>
                <div className='run-payroll-div'>

                    <button onClick={handleSubmit} className='run-payroll-btn'>
                        Save Employee
                    </button>
                </div>
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

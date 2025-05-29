import React, { useEffect, useState } from 'react';
import { FiFilter } from "react-icons/fi";
import AddEmployeeModal from './add_emplotee_modal/AddEmployeeModal';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import './AllEmployees.css';
import { GrNext, GrPrevious } from "react-icons/gr";
import { authInstance } from '../axios/axiosinstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineCloudUpload } from "react-icons/md";
import BulkUploadModal from './add_emplotee_modal/RunPayrollModal';
import EmployeeActionMenu from './EmployeeActionsMenu';
import { useSearchEmployeeStore } from '../../store/seacrh-employee';


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

    const { search, setSearch } = useSearchEmployeeStore();

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
        const indexOfLastEmployee = currentPage * EMPLOYEES_PER_PAGE;
        const indexOfFirstEmployee = indexOfLastEmployee - EMPLOYEES_PER_PAGE;
        setCurrentEmployees(filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee));
    }, [currentPage, filteredEmployees]);

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

    const runPayroll = (e) => {
        const empId = parseInt(e.target.id);

        authInstance.post("/payroll/", { employeeId: empId })
            .then((res) => {
                toast.success("Payroll ran successfully!", {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "colored",
                });

                setEmployees((prev) =>
                    prev.map((emp) =>
                        emp.id === empId ? { ...emp, payrollStatus: "Ready" } : emp
                    )
                );

                setFilteredEmployees((prev) =>
                    prev.map((emp) =>
                        emp.id === empId ? { ...emp, payrollStatus: "Ready" } : emp
                    )
                );
            })
            .catch((error) => {
                console.error("Payroll error:", error);
                toast.error("Failed to run payroll. Please try again.", {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "colored",
                });
            });
    };

    const toggleOpen = () => {
        setIsModalOpen(!isModalOpen);
    };

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };


    return (
        
        <div className='employee-page'>
            <ToastContainer />

            <div className='button-filter flex justify-between'>
                <div className='div-resp'>
                    <button className="add-employee-btn" onClick={() => setShowModal(true)}>
                        <IoIosAdd className="icon2" /> Add Employee
                    </button>
                    <button className="add-employee-btn2" onClick={toggleOpen}>
                        <MdOutlineCloudUpload className="icon2" /> Bulk Upload
                    </button>
                </div>
                <div className="filter-box" onClick={() => setShowFilterModal(true)}>
                    <FiFilter className="filter-icon" />
                    <span className='filter'>Filter</span>
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
                    {currentEmployees.length > 0 ? search.toLowerCase().trim() === "" ? (
                        currentEmployees.map((employee, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100">
                                <td className="p-3">{employee.fullName}</td>
                                <td className="p-3">{employee.jobTitle}</td>
                                <td className="p-3">{employee.employmentType}</td>
                                <td className="p-3">{employee.payrollStatus || "Pending"}</td>
                                <td className="p-3 text-center">
                                    <EmployeeActionMenu
                                        employeeId={employee.id}
                                        onRunPayroll={(id) => runPayroll({ target: { id } })}
                                    />
                                </td>

                            </tr>
                        ))
                    ) : (currentEmployees.filter(emp => emp.fullName.toLowerCase().includes(search.toLowerCase().trim()) || emp.jobTitle.toLowerCase().includes(search.toLowerCase().trim())).map((employee, index) => (<tr key={index} className="border-b hover:bg-gray-100">
                        <td className="p-3">{employee.fullName}</td>
                        <td className="p-3">{employee.jobTitle}</td>
                        <td className="p-3">{employee.employmentType}</td>
                        <td className="p-3">{employee.payrollStatus || "Pending"}</td>
                        <td className="p-3 text-center">
                            <EmployeeActionMenu
                                employeeId={employee.id}
                                onRunPayroll={(id) => runPayroll({ target: { id } })}
                            />
                        </td>

                    </tr>))) : (
                        <tr>
                            <td colSpan="5" className="p-5 text-center font-semibold text-gray-500">
                                No employee found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
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
    );
}

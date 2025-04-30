import { X } from "lucide-react";
import React, { useState } from "react";

import './Addemployee.css'

function AddEmployeeModal({ setEmployees, setShowModal, setFilteredEmployees }) {
    const [empDetails, setEmpDetails] = useState({
        fullName: "",
        email: "",
        accountNumber: "",
        HireDate: "", // Fixed: lowercase "h"
        department: "",
        employmentType: "",
        jobTitle: "",
        bankName: "",
        grossPay: null,
    });

    const employeeFields = [
        { key: "fullName", label: "Name", type: "text" },
        { key: "email", label: "Email", type: "email" },
        { key: "accountNumber", label: "Account Number", type: "text" },
        { key: "HireDate", label: "Hire Date", type: "date" },
        { key: "department", label: "Department", type: "text" },
        { key: "employmentType", label: "Employment Type", type: "text" },
        { key: "jobTitle", label: "Job Title", type: "text" },
        { key: "bankName", label: "Bank Name", type: "text" },
        { key: "grossPay", label: "Gross Pay", type: "number" },
    ];


    function handleChange(e) {
        const { name, value, type } = e.target;
        setEmpDetails((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value, // Convert numbers properly
        }));
    }


    function handleSubmit(e) {
        e.preventDefault();
        setEmployees((prev) => {
            const updatedEmployees = [...prev, empDetails];
            setFilteredEmployees(updatedEmployees); // 🔥 Update filteredEmployees
            return updatedEmployees;
        });
        // Reset form fields after submission
        setEmpDetails({
            fullName: "",
            email: "",
            accountNumber: "",
            HireDate: "",
            department: "",
            employmentType: "",
            jobTitle: "",
            bankName: "",
            grossPay: null,
        });

        setShowModal(false); // Close modal after submission
    }

    return (
        <div className="h-screen w-screen fixed inset-0 backdrop-blur-sm flex justify-center items-center">
            <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
                <X size={24} />
            </button>
            <div className="modal-div rounded-md">

                <div className="add-employee-text">
                    <p className=" font-bold text-2xl flex items-center justify-center">Add Employee Details</p>
                </div>



                <form
                    className="space-y-4 grid grid-cols-3 gap-6  !p-6 rounded-lg shadow-lg"
                    onSubmit={handleSubmit}
                >

                    {employeeFields.map(({ key, label, type }) => (
                        <div key={key} className="flex flex-col">
                            <label className="font-bold text-lg mb-1">{label}:</label>
                            <input
                                type={type}
                                placeholder={`Enter ${label}`}
                                name={key}
                                className="block w-full p-2 border border-gray-300 rounded-md"
                                onChange={handleChange}
                                value={empDetails[key]}
                                required
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="col-span-3 py-2 bg-[#FF7943] text-white font-semibold rounded-md hover:bg-[#e76c38] transition duration-200"
                    >
                        Create Employee
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddEmployeeModal;

import { X } from "lucide-react"; // Fixed import
import React, { useState } from "react";

function AddEmployeeModal({ setEmployees, setShowModal }) {
    const [empDetails, setEmpDetails] = useState({
        fullName: "",
        email: "",
        accountNumber: "",
        HireDate: "",
        department: "",
        employmentType: "",
        jobTitle: "",
        bankName: ""
    });

    const employeedDetailsArray = Object.keys(empDetails);

    function handleChange(e) {
        const { name, value } = e.target;
        setEmpDetails((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setEmployees((prev) => [...prev, empDetails]);
        console.log(empDetails);

        // Reset form fields after submission
        setEmpDetails({
            fullName: "",
            email: "",
            accountNumber: "",
            HireDate: "",
            department: "",
            employmentType: "",
            jobTitle: "",
            bankName: ""
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
                <form className="space-y-2" onSubmit={handleSubmit}>
                    {employeedDetailsArray.map((field, index) => (
                        <input
                            key={index}
                            type="text"
                            name={field}
                            placeholder={field}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                            onChange={handleChange}
                            value={empDetails[field]}
                        />
                    ))}
                    <button type="submit" className="w-full p-2 mt-4 bg-blue-500 text-white rounded-md">
                        Create Employee
                    </button>
                </form>

        </div>
    );
}

export default AddEmployeeModal;

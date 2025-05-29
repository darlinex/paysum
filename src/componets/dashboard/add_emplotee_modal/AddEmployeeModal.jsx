import { X } from "lucide-react";
import React, { useState, useEffect } from "react";
import './Addemployee.css';
import { authInstance } from "../../axios/axiosinstance"; // Adjust path if needed
import { toast } from "react-toastify";

function AddEmployeeModal({ 
    setEmployees, 
    setShowModal, 
    setFilteredEmployees, 
    editingEmployee, 
    onEmployeeUpdated 
}) {
    const [empDetails, setEmpDetails] = useState({
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

    // Pre-populate form when editing
    useEffect(() => {
        if (editingEmployee) {
            // Format date if it exists
            const formatDate = (dateString) => {
                if (!dateString) return "";
                const date = new Date(dateString);
                return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
            };

            setEmpDetails({
                fullName: editingEmployee.employeeFullName || "",
                email: editingEmployee.employee?.email || "",
                accountNumber: editingEmployee.employee?.accountNumber || "",
                HireDate: formatDate(editingEmployee.employee?.HireDate) || "",
                department: editingEmployee.employee?.department || "",
                employmentType: editingEmployee.employee?.employmentType || "",
                jobTitle: editingEmployee.employee?.jobTitle || "",
                bankName: editingEmployee.employee?.bankName || "",
                grossPay: editingEmployee.grossPay || null,
            });
        }
    }, [editingEmployee]);

    function handleChange(e) {
        const { name, value, type } = e.target;
        setEmpDetails((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (editingEmployee) {
                // Update existing employee
                const res = await authInstance.put(`/employee/${editingEmployee.id}`, empDetails);
                const updatedEmployee = res.data.data || res.data;

                // Update the employee in the payroll list
                setEmployees((prev) => {
                    const updated = prev.map(emp => 
                        emp.id === editingEmployee.id 
                            ? { ...emp, ...updatedEmployee, employeeFullName: empDetails.fullName }
                            : emp
                    );
                    setFilteredEmployees(updated);
                    return updated;
                });

                // Call the callback if provided
                if (onEmployeeUpdated) {
                    onEmployeeUpdated({ 
                        ...editingEmployee, 
                        ...updatedEmployee, 
                        employeeFullName: empDetails.fullName 
                    });
                }

                toast.success("Employee updated successfully!");
            } else {
                // Create new employee
                const res = await authInstance.post("/employee/", empDetails);
                const newEmployee = res.data.data;

                setEmployees((prev) => {
                    const updated = [...prev, newEmployee];
                    setFilteredEmployees(updated);
                    return updated;
                });

                toast.success("Employee added successfully!");
            }

            // Reset form
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

            setShowModal(false);
        } catch (err) {
            console.error(`Failed to ${editingEmployee ? 'update' : 'add'} employee:`, err);
            toast.error(`Failed to ${editingEmployee ? 'update' : 'add'} employee. Try again.`);
        }
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
                    <p className="font-bold text-2xl flex items-center justify-center">
                        {editingEmployee ? 'Edit Employee Details' : 'Add Employee Details'}
                    </p>
                </div>

                <form
                    className="space-y-4 grid grid-cols-3 gap-6 !p-6 rounded-lg shadow-lg"
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
                                value={empDetails[key] || ""}
                                required
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="col-span-3 py-2 bg-[#FF7943] text-white font-semibold rounded-md hover:bg-[#e76c38] transition duration-200"
                    >
                        {editingEmployee ? 'Update Employee' : 'Create Employee'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddEmployeeModal;
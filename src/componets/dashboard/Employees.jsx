
import React from "react";
import './Employee.css'



const employees = [
  {
    name: "Thankgod Okenwa",
    role: "Manager",
    phone: "08038240608",
    status: "Active",
    payroll: "Ready",
  },
  {
    name: "Doris Nwigwe",
    role: "Head Chef",
    phone: "07035267890",
    status: "Active",
    payroll: "Ready",
  },
  {
    name: "Chikezie Kalu",
    role: "Dispatch Rider",
    phone: "08123230009",
    status: "Inactive",
    payroll: "Not Ready",
  },
];

export default function EmployeeTable() {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr className="table-head">
            <th>Name</th>
            <th>Role</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Payroll Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td className="name-cell">{employee.name}</td>
              <td className="role-cell">{employee.role}</td>
              <td className="phone-cell">{employee.phone}</td>
              <td>
                <button className={employee.status === "Active" ? "status-button active" : "status-button inactive"}>
                  {employee.status}
                </button>
              </td>
              <td>
                <button className={employee.payroll === "Ready" ? "payroll-button ready" : "payroll-button not-ready"}>
                  {employee.payroll}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

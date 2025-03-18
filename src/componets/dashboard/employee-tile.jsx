import React from 'react';

function EmployeeTile({ employee }) {
    return (
        <div className='flex justify-between border-b border-gray-400 p-2'>
            <div>{employee.fullName}</div>
            <div>{employee.jobTitle}</div>
            <div>{employee.email}</div>
            <div>{employee.employmentType}</div>
        </div>
    );
}

export default EmployeeTile;

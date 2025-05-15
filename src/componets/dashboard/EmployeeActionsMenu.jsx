import React, { useState, useRef, useEffect } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

export default function EmployeeActionMenu({ employeeId, onRunPayroll }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            <button
                onClick={() => setOpen(!open)}
                className="text-gray-600 hover:text-black focus:outline-none"
            >
                <BsThreeDotsVertical size={20} />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-50">
                    <button
                        className="block w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-100"
                        onClick={() => {
                            onRunPayroll(employeeId);
                            setOpen(false);
                        }}
                    >
                        Run Payroll
                    </button>
                    <button
                        className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-100"
                        onClick={() => {
                            // EDIT action to be defined
                            setOpen(false);
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                        onClick={() => {
                            // DELETE action to be handled later
                            setOpen(false);
                        }}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}

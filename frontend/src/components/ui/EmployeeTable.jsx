import React from 'react';
import { Link } from 'react-router-dom';



const EmployeeTable = ({ employees, onDelete }) => {

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="p-4 font-semibold text-gray-600">Emp. ID</th>
                        <th className="p-4 font-semibold text-gray-600">Name</th>
                        <th className="p-4 font-semibold text-gray-600">Email</th>
                        <th className="p-4 font-semibold text-gray-600">Phone</th>
                        <th className="p-4 font-semibold text-gray-600">Is Active</th>
                        <th className="p-4 font-semibold text-gray-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="p-4 text-center text-gray-500">No employees found.</td>
                        </tr>
                    ) : (
                        employees.map((employee) => (
                            <tr key={employee.id} className="border-b hover:bg-gray-50">
                                <td className="p-4">{employee.employee_code}</td>
                                <td className="p-4">{employee.users?.name}</td>
                                <td className="p-4">{employee.users?.email}</td>
                                <td className="p-4">{employee.users?.phone || 'N/A'}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-sm ${employee.users?.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {employee.users?.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="p-4 flex gap-2">
                                    <Link to={`/employees/${employee.id}`} className="text-blue-500 hover:underline">View</Link>
                                    <Link to={`/employees/edit/${employee.id}`} className="text-orange-500 hover:underline">Edit</Link>
                                    <button onClick={() => onDelete(employee.id)} className="text-red-500 hover:underline">Deactivate</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;
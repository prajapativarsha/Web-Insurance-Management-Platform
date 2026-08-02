import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import employeeApi from '../../services/employeeApi.js';
import EmployeeTable from '../../components/ui/EmployeeTable.jsx';
import EmployeeSearch from '../../components/ui/EmployeeSearch.jsx';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEmployees = async (searchQuery = '') => {
        try {
            setLoading(true);
            const response = await employeeApi.getEmployeeList(searchQuery);
            setEmployees(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch employees.');
            // console.error(err);
            console.error("Error fetching employees:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to deactivate this employee?')) {
            try {
                await employeeApi.deactivateEmployee(id);
                // Refresh the list after successful deletion
               fetchEmployees();
            } catch (err) {
                alert('Failed to deactivate employee.');
            }
        }
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Employee Management</h1>
                <Link to="/employees/create" className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700">
                    + Add New Employee
                </Link>
            </div>

            <EmployeeSearch onSearch={fetchEmployees} />

            {loading ? (
                <p>Loading employees...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <EmployeeTable employees={employees} onDelete={handleDelete} />
            )}
        </div>
    );
};

export default EmployeeList;
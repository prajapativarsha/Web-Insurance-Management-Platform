import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import employeeApi from '../../services/employeeApi.js';
import  { claimApi } from '../../services/claimApi.js';
import EmployeeSearch from '../../components/ui/EmployeeSearch.jsx';

const AssignClaimTo = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

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

    const handleAssign = async (claim_id , employee_id) => {
       console.log(employee_id)
            try {
                await claimApi.assignClaim(claim_id, employee_id);
                navigate('/admin/claims');
            } catch (err) {
                alert('Failed to  assign claim.');
            }
        
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Assign Claims to Agents</h1>
            </div>

            <EmployeeSearch onSearch={fetchEmployees} />

            {loading ? (
                <p>Loading employees...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="p-4 font-semibold text-gray-600">Emp. ID</th>
                                <th className="p-4 font-semibold text-gray-600">Name</th>
                                <th className="p-4 font-semibold text-gray-600">Email</th>
                                <th className="p-4 font-semibold text-gray-600">Phone</th>
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
                                        {/* <td className="p-4">
                                                    <span className={`px-2 py-1 rounded text-sm ${kycConfig[customer.kyc_status]?.classes || kycConfig.pending.classes}`}>
                                                        {kycConfig[customer.kyc_status]?.label || 'Pending'}
                                                    </span>
                                                </td> */}
                                        <td className="p-4 flex gap-2">
                                            <button onClick={() => handleAssign(id, employee.id)} className="text-sm bg-blue-500 text-white px-3 py-1 rounded">Assign</button>

                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AssignClaimTo;
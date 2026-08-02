import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import employeeApi from '../../services/employeeApi.js';
import EmployeeCard from '../../components/ui/EmployeeCard.jsx';

const EmployeeProfile = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await employeeApi.getEmployee(id);
                setEmployee(response.data);
            } catch (err) {
                console.error("Failed to fetch employee profile", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [id]);

    if (loading) return <div className="p-6">Loading profile...</div>;
    if (!employee) return <div className="p-6 text-red-500">Employee not found.</div>;

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">{employee.users?.name}'s Profile</h1>
                <Link to={`/employees/edit/${employee.id}`} className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    Edit Profile
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <EmployeeCard title="Email" value={employee.users?.email} />
                <EmployeeCard title="Phone" value={employee.users?.phone || 'N/A'} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold mb-4">Personal Details</h2>
                <div className="grid grid-cols-2 gap-4">
                    <p><span className="font-medium text-gray-600">Employee_code</span> {employee.employee_code || ''}</p>
                    <p><span className="font-medium text-gray-600">Department</span> {employee.department }</p>
                </div>
            </div>

            {/* In future days, you will render Policies, Claims, and Payments tables here using customer.policies, etc. */}
        </div>
    );
};

export default EmployeeProfile;
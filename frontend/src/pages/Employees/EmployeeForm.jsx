import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import employeeApi from '../../services/employeeApi.js';



const EmployeeForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        user_id: '', 
        department: 'Insurance Operations',
    });

    useEffect(() => {
        if (isEditMode) {
            const fetchEmployee = async () => {
                try {
                    const response = await employeeApi.getEmployee(id);
                    const data = response.data;
                    setFormData({
                        department: data.department || 'Insurance Operations',
                    });
                } catch (error) {
                    console.error("Failed to fetch employee", error);
                }
            };
            fetchEmployee();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await employeeApi.updateEmployee(id, formData);
            } else {
                // Ensure user_id is a number before submitting
                const payload = { ...formData, user_id: Number(formData.user_id) };
                await employeeApi.createEmployee(payload); // Note: verify if it's createEmployee or createEmployeer
            }
            navigate('/employees'); // Redirect back to list
        } catch (error) {
            console.error("Submission failed", error);
            alert("Failed to save employee data.");
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">
                {isEditMode ? 'Edit Employee Profile' : 'Complete Employee Registration'}
            </h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
                
                {!isEditMode && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Linked User ID</label>
                        <input 
                            type="number" 
                            name="user_id" 
                            value={formData.user_id} 
                            onChange={handleChange} 
                            required 
                            className="w-full mt-1 p-2 border rounded" 
                        />
                        <p className="text-xs text-gray-500 mt-1">The ID of the user account created during authentication.</p>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        {/* Fixed name attribute from 'id_document_type' to 'department' */}
                        <select 
                            name="department" 
                            value={formData.department} 
                            onChange={handleChange} 
                            className="w-full mt-1 p-2 border rounded"
                        >
                            <option value="Insurance Operations">Insurance Operations</option>
                            <option value="IT">IT</option>
                            <option value="HR">HR</option>
                        </select>
                    </div>
                </div>

                <div className="pt-4 flex justify-end gap-2">
                    <button type="button" onClick={() => navigate('/employees')} className="px-4 py-2 border rounded hover:bg-gray-50">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Employee</button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;
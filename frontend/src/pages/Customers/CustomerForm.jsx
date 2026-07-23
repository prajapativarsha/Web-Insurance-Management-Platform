import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import customerApi from '../../services/customerApi';

const CustomerForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        user_id: '', // Only needed for creation
        date_of_birth: '',
        address: '',
        id_document_type: 'Passport',
        id_document_number: '',
    });

    useEffect(() => {
        if (isEditMode) {
            const fetchCustomer = async () => {
                const response = await customerApi.getCustomerById(id);
                const data = response.data;
                setFormData({
                    date_of_birth: data.date_of_birth || '',
                    address: data.address || '',
                    id_document_type: data.id_document_type || 'Passport',
                    id_document_number: data.id_document_number || '',
                });
            };
            fetchCustomer();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await customerApi.updateCustomer(id, formData);
            } else {
                // Ensure user_id is a number before submitting
                const payload = { ...formData, user_id: Number(formData.user_id) };
                await customerApi.createCustomer(payload);
            }
            navigate('/customers'); // Redirect back to list
        } catch (error) {
            console.error("Submission failed", error);
            alert("Failed to save customer data.");
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">{isEditMode ? 'Edit Customer Profile' : 'Complete Customer Registration'}</h1>
            
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
                
                {!isEditMode && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Linked User ID</label>
                        <input type="number" name="user_id" value={formData.user_id} onChange={handleChange} required className="w-full mt-1 p-2 border rounded" />
                        <p className="text-xs text-gray-500 mt-1">The ID of the user account created during authentication.</p>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} className="w-full mt-1 p-2 border rounded" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full mt-1 p-2 border rounded" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Document Type</label>
                        <select name="id_document_type" value={formData.id_document_type} onChange={handleChange} className="w-full mt-1 p-2 border rounded">
                            <option value="Passport">Passport</option>
                            <option value="CNIC">CNIC</option>
                            <option value="Driving License">Driving License</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Document Number</label>
                        <input type="text" name="id_document_number" value={formData.id_document_number} onChange={handleChange} className="w-full mt-1 p-2 border rounded" />
                    </div>
                </div>

                <div className="pt-4 flex justify-end gap-2">
                    <button type="button" onClick={() => navigate('/customers')} className="px-4 py-2 border rounded hover:bg-gray-50">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Customer</button>
                </div>
            </form>
        </div>
    );
};

export default CustomerForm;
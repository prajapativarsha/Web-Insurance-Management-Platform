import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import customerApi from '../../services/customerApi';

const CompleteKYC = () => {
  const [documentType, setDocumentType] = useState('');
  const [documentFile, setDocumentFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setDocumentFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
       const data = new FormData();

       if(documentFile){
        data.append('KYCDocument',documentFile);
       }
       await customerApi.uploadKYCDocument(data);
       alert("Document Submitted Successfully");
       navigate('/customer/dashboard');
    }
    catch(error){
       console.error(error);
    }
  };

  return (
    /* Main container: centers the form and gives a subtle background */
    <div className="flex justify-center items-start pt-12  min-h-[calc(100vh-80px)] bg-gray-50 px-4">
      
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Complete KYC</h2>
        
        <form onSubmit={handleSubmit}>
          
          {/* Document Type Dropdown */}
          <div className="mb-5">
            <label htmlFor="docType" className="block mb-2 text-sm font-medium text-gray-900">
              Document Type
            </label>
            <select 
              id="docType"
              value={documentType} 
              onChange={(e) => setDocumentType(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
            >
              <option value="" disabled>Select a document</option>
              <option value="passport">Passport</option>
              <option value="driving_license">Driving License</option>
              <option value="national_id">National ID</option>
            </select>
          </div>

          {/* File Upload Input */}
          <div className="mb-6">
            <label htmlFor="document" className="block mb-2 text-sm font-medium text-gray-900">
              Upload Document
            </label>
            <input 
              type="file" 
              id="document"
              onChange={handleFileChange}
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-medium py-2.5 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Submit KYC Documents
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteKYC;
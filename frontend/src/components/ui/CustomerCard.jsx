import React from 'react';

const CustomerCard = ({ title, value, subtitle }) => {
    return (
        <div className="p-6 bg-white border rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
            {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
    );
};

export default CustomerCard;
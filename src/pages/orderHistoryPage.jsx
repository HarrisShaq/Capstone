// pages/OrderHistory.jsx
import React, { useState } from 'react';
import '../styles/app.css';
import '../styles/orderHistoryPage.css';

const OrderHistory = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleViewDetails = () => {
        alert('Viewing order details!');
    };

    return (
        <div className="order-history-page">
            <h1>Order History Page</h1>
            <input
                type="text"
                placeholder="Search order history..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="auth-input"
            />
            <button className="auth-button" onClick={handleViewDetails}>
                View Order Details
            </button>
        </div>
    );
};

export default OrderHistory;

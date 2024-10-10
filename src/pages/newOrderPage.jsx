// pages/NewOrderPage.jsx
import React, { useState } from 'react';
import '../styles/app.css';
import '../styles/newOrderPage.css';

const NewOrderPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handlePlaceOrder = () => {
        alert('Order placed successfully!');
    };

    return (
        <div className="new-order-page">
            <h1>New Order Page</h1>
            <input
                type="text"
                placeholder="Search for items..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="auth-input"
            />
            <button className="auth-button" onClick={handlePlaceOrder}>
                Place Order
            </button>
        </div>
    );
};

export default NewOrderPage;

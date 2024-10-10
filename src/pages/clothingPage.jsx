// pages/ClothingPage.jsx
import React, { useState } from 'react';
import '../styles/app.css';
import '../styles/clothingPage.css';

function ClothingPage({ items }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = items.filter(item =>
        item.item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="clothing-page">
            <h1>Clothing Items</h1>
            <input
                type="text"
                placeholder="Search clothing..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="auth-input"
            />
            <ul>
                {filteredItems.length === 0 ? (
                    <li>No items found.</li>
                ) : (
                    filteredItems.map(item => (
                        <li key={item.id} className="clothing-item">
                            <img src={item.imageUrl} alt={item.item} style={{ width: '100px' }} />
                            <div>
                                <h3>{item.brand}</h3>
                                <p>{item.item}</p>
                                <p>${item.price.toFixed(2)}</p>
                                <button
                                    className="auth-button"
                                    onClick={() => alert(`Added ${item.item} to cart!`)}
                                >
                                    Add to Cart
                                </button>
                                <button
                                    className="auth-button"
                                    onClick={() => alert(`Viewing details for ${item.item}`)}
                                >
                                    View Details
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default ClothingPage;

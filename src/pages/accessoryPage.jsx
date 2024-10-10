import React, { useState } from 'react';
import '../styles/app.css';
import '../styles/accessoryPage.css';

function AccessoryPage({ items }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = items.filter(item =>
        item.item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="accessory-page">
            <h1>Accessory Items</h1>
            <input
                type="text"
                placeholder="Search accessories..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="auth-input"
            />
            <ul>
                {filteredItems.length === 0 ? (
                    <li>No items found.</li>
                ) : (
                    filteredItems.map(item => (
                        <li key={item.id} className="accessory-item">
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

export default AccessoryPage;

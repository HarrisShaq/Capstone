import React, { useState } from 'react';
import '../styles/app.css';
import '../styles/shoePage.css';

function ShoePage({ items }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="shoe-page">
            <h1>Shoe Items</h1>
            <input
                type="text"
                placeholder="Search shoes..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="auth-input"
            />
            <ul>
                {filteredItems.length === 0 ? (
                    <li>No items found.</li>
                ) : (
                    filteredItems.map(item => (
                        <li key={item.id} className="shoe-item">
                            <img src={item.imageUrl} alt={item.name} style={{ width: '100px' }} />
                            <div>
                                <h3>{item.brand}</h3>
                                <p>{item.name}</p>
                                <p>${item.price.toFixed(2)}</p>
                                <button
                                    className="auth-button"
                                    onClick={() => alert(`Added ${item.name} to cart!`)}
                                >
                                    Add to Cart
                                </button>
                                <button
                                    className="auth-button"
                                    onClick={() => alert(`Viewing details for ${item.name}`)}
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

export default ShoePage;

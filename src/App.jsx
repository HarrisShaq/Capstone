import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AuthPage from './pages/authPage';
import NewOrderPage from './pages/newOrderPage';
import OrderHistory from './pages/orderHistoryPage';
import ShoePage from './pages/shoePage'; 
import AccessoryPage from './pages/accessoryPage'; 
import ClothingPage from './pages/clothingPage';
import NavBar from './components/navBar';
import SearchBar from './components/SearchBar';
import { fetchClothing, fetchShoes, fetchAccessories, fetchUsers } from './services/apiService'; 
import { fetchUserProfile, logoutUser } from './utils/Users-Api'; 
import './styles/App.css';

function App() {
    const [shoeItems, setShoeItems] = useState([]);
    const [accessoryItems, setAccessoryItems] = useState([]);
    const [clothingItems, setClothingItems] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const clothing = await fetchClothing();
                setClothingItems(clothing);

                const shoes = await fetchShoes();
                setShoeItems(shoes);

                const accessories = await fetchAccessories();
                setAccessoryItems(accessories);
                
                const profile = await fetchUserProfile();
                setUserProfile(profile);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleLogout = () => {
        logoutUser();
        setUserProfile(null);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const filteredClothing = clothingItems.filter(item => 
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.item.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredShoes = shoeItems.filter(item => 
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.item.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredAccessories = accessoryItems.filter(item => 
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.item.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <NavBar userProfile={userProfile} onLogout={handleLogout} />
            {error && <div className="error">{error}</div>}
            <SearchBar onSearch={handleSearch} />
            <Routes>
                <Route path="/" element={<Navigate to="/auth" />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/new-order" element={<NewOrderPage />} />
                <Route path="/order-history" element={<OrderHistory />} />
                <Route path="/shoes" element={<ShoePage items={filteredShoes} />} />
                <Route path="/accessories" element={<AccessoryPage items={filteredAccessories} />} />
                <Route path="/clothing" element={<ClothingPage items={filteredClothing} />} />
            </Routes>
        </>
    );
}

export default App;

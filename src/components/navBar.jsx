import { NavLink } from 'react-router-dom';
import '../styles/navBar.css';

const NavBar = ({ userProfile, onLogout }) => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">Your Logo</div>
            <div className="navbar-links">
                <NavLink to="/auth" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Auth
                </NavLink>
                <NavLink to="/new-order" className={({ isActive }) => (isActive ? 'active' : '')}>
                    New Order
                </NavLink>
                <NavLink to="/order-history" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Order History
                </NavLink>
                <NavLink to="/shoes" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Shoes
                </NavLink>
                <NavLink to="/accessories" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Accessories
                </NavLink>
                <NavLink to="/clothing" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Clothing
                </NavLink>
            </div>
            <div className="navbar-actions">
                {userProfile ? (
                    <button className="navbar-button" onClick={onLogout}>Logout</button>
                ) : (
                    <NavLink to="/auth" className="navbar-button">Login</NavLink>
                )}
            </div>
        </nav>
    );
};

export default NavBar;

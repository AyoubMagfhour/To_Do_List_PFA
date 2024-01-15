import React, { useState } from 'react';
import "../../styles/adminNavbar.css";
import settings from '../../assets/images/settings.png';
import { Link } from 'react-router-dom';

const AdminDashboardNavbar2 = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => {
        setIsNavCollapsed(!isNavCollapsed);
    };

    return (
        <>
            <nav className={`navbar navbar-expand-lg p-3 fixed-top`} id="mainNav">
                <div className="container-fluid">

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded={!isNavCollapsed ? true : false}
                        aria-label="Toggle navigation"
                        onClick={handleNavCollapse}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}
                        id="navbarNavDropdown"
                    >
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link
                                    style={{
                                        textDecoration: 'none',
                                        color: 'black'
                                    }}
                                    to="/adminDashboard"
                                >
                                    <span
                                        style={{ fontSize: '19px' }}
                                        className="nav-link mx-2 active fw-bold"
                                        aria-current="page"
                                        href="#"
                                    >
                                        Home
                                    </span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    style={{
                                        textDecoration: 'none',
                                        color: 'black'
                                    }}
                                    to="/adminPage"
                                >
                                    <span
                                        style={{ color: '#BA68C8', fontSize: '19px' }}
                                        className="nav-link mx-2 fw-bold"
                                        href="#"
                                    >
                                        Admin
                                    </span>
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link
                                    style={{
                                        textDecoration: 'none',
                                        color: 'black'
                                    }}
                                    to="/adminProfile"
                                >
                                    <span
                                        style={{ color: '#BA68C8', fontSize: '19px' }}
                                        className="nav-link mx-2 fw-bold"
                                        id="navbarDropdownMenuLink"
                                        role="button"
                                        aria-expanded="false"
                                    >
                                        Profile
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default AdminDashboardNavbar2;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';


import Login from './Login';
import Signup from './signup';
import Transaction from './Transaction';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
import logo from './BankLogo.png'; 
import heroImage from './hero.png'; 
import image1 from './image1.png'; 
import image2 from './image2.png';
import image3 from './image3.png'; 



const HeroSection = () => (
    <div className="hero-section container-fluid bg-light py-5">
        <div className="row align-items-center">
            {/* Description Section (Left) */}
            <div className="col-md-6">
                <h1 className="display-4">Welcome to Scotia Bank</h1>
                <p className="lead">
                    Scotia Bank offers a wide range of financial products and services, including personal and commercial banking, wealth management, and investment solutions. Our mission is to provide a seamless banking experience that helps you reach your financial goals.
                </p>
                <p>
                    With decades of expertise, Scotia Bank is committed to innovation and customer satisfaction. Explore our various banking services and see how we can help you manage, grow, and protect your financial future.
                </p>
                <Link to="/signup" className="btn btn-primary"  style={{ backgroundColor: 'red', color: 'white' }}  >Get Started</Link>
            </div>

            {/* Image Section (Right) */}
            <div className="col-md-6">
                <img src={heroImage} alt="Scotia Bank Services" className="img-fluid" />
            </div>
        </div>
    </div>
);

// Image Gallery Component
const ImageGallery = () => (
    <div className="container my-5">
        <h2 className="text-center">Our Services</h2>
        <div className="row">
            <div className="col-md-4">
                <img src={image1} alt="Service 1" className="img-fluid rounded" />
            </div>
            <div className="col-md-4">
                <img src={image2} alt="Service 2" className="img-fluid rounded" />
            </div>
            <div className="col-md-4">
                <img src={image3} alt="Service 3" className="img-fluid rounded" />
            </div>
        </div>
    </div>
);

// Footer Component
const Footer = () => (
    <footer className="bg-danger text-white py-4">
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <h5>About Us</h5>
                    <ul className="list-unstyled">
                        <li><Link to="/about" className="text-white">Our Story</Link></li>
                        <li><Link to="/careers" className="text-white">Careers</Link></li>
                        <li><Link to="/news" className="text-white">Newsroom</Link></li>
                    </ul>
                </div>
                <div className="col-md-3">
                    <h5>Services</h5>
                    <ul className="list-unstyled">
                        <li><Link to="/personal-banking" className="text-white">Personal Banking</Link></li>
                        <li><Link to="/business-banking" className="text-white">Business Banking</Link></li>
                        <li><Link to="/investment" className="text-white">Investment Solutions</Link></li>
                    </ul>
                </div>
                <div className="col-md-3">
                    <h5>Support</h5>
                    <ul className="list-unstyled">
                        <li><Link to="/contact" className="text-white">Contact Us</Link></li>
                        <li><Link to="/faq" className="text-white">FAQ</Link></li>
                        <li><Link to="/privacy" className="text-white">Privacy Policy</Link></li>
                    </ul>
                </div>
                <div className="col-md-3">
                    <h5>Connect With Us</h5>
                    <ul className="list-unstyled">
                        <li><Link to="/facebook" className="text-white">Facebook</Link></li>
                        <li><Link to="/twitter" className="text-white">Twitter</Link></li>
                        <li><Link to="/linkedin" className="text-white">LinkedIn</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
);

function App() {
    const [searchQuery, setSearchQuery] = useState("");
    const location = useLocation(); // To detect the current route

    const handleSearch = (event) => {
        event.preventDefault();
        console.log("Search query:", searchQuery);
    };

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    {/* Bank Logo */}
                    <Link to="/" className="navbar-brand">
                        <img src={logo} alt="Bank Logo" className="logo" />
                    </Link>

                    {/* Navbar toggler for mobile view */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navbar links */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                           
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link">Sign Up</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                        </ul>

                        {/* Search bar */}
                        <form className="d-flex me-2" onSubmit={handleSearch}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </form>

                        {/* More Button on the right */}
                        <div className="d-flex">
                            <button className="btn btn-outline-secondary">More</button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Conditionally render Hero Section and Image Gallery only on the homepage */}
            {location.pathname === '/' && <HeroSection />}
            {location.pathname === '/' && <ImageGallery />}

            <div className="container mt-4">
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/transaction" element={<Transaction />} />
                    <Route path="/" element={<div> </div>} />
                </Routes>
            </div>

            {/* Footer Section */}
            <Footer />
        </div>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;

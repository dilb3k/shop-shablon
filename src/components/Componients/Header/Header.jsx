// Header.js
import React, { useState, useEffect } from "react";
import Navbar from "../../Page/Navbar/Navbar";

import { Logo } from "../../ui/Logos/Logo";
import { TopBar } from "./HeaderComponents/TopBar";
import { SearchBar } from "./HeaderComponents/SearchBar";
import { UserTools } from "./HeaderComponents/UserTools";
import { MainNavigation } from "./HeaderComponents/MainNavigate";
import { LoginModal } from "../Login/LoginModal";
import { Link } from "react-router-dom";

// Import CSS in your main file or index
// @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Great+Vibes&display=swap');

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [currency, setCurrency] = useState("UZS");
    const [scrolled, setScrolled] = useState(false);

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <header className={`transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
            {/* Top Bar with contact and account info */}
            <TopBar currency={currency} setCurrency={setCurrency} />


            {/* Main Header with Logo, Search and User Tools */}
            <div className="py-5 px-8 flex justify-between items-center bg-white relative">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-100 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-100 to-transparent"></div>

                <div className="flex items-center">
                    <Link to="/" className="flex flex-col items-center">
                        <span className="font-greatvibes text-4xl gold-text">Kelin Saroyim</span>
                        <span className="text-xs uppercase tracking-widest text-gray-500 mt-1">Wedding Elegance</span>
                    </Link>
                </div>

                <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />

                <UserTools openModal={openModal} />
            </div>

            {/* Main Navigation Menu */}

            {/* Login Modal */}
            <LoginModal isOpen={isModalOpen} onClose={closeModal} />

            {/* Additional Navbar if needed */}
            <Navbar />
        </header>
    );
};

export default Header;
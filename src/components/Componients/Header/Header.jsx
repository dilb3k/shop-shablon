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
import Login from "../Login/Login";

const Header = ({ onSearchChange }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [currency, setCurrency] = useState("UZS");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSearchChange = (value) => {
        setSearchValue(value);
        if (onSearchChange) {
            onSearchChange(value);
        }
    };

    return (
        <header className={`transition-all sticky top-0 z-20 duration-300 ${scrolled ? 'shadow-lg' : ''}`}>

            <div className="py-5 px-8 flex justify-between items-center bg-white relative">
                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-100 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-100 to-transparent"></div>

                <div className="flex items-center">
                    <Link to="/" className="flex flex-col items-center">
                        <span className="font-greatvibes text-4xl gold-text">Kelin Saroyim</span>
                        <span className="text-xs uppercase tracking-widest text-gray-500 mt-1">Wedding Elegance</span>
                    </Link>
                </div>

                <SearchBar searchValue={searchValue} setSearchValue={handleSearchChange} />

                <UserTools openModal={openModal} />
            </div>

            
        </header>
    );
};

export default Header;
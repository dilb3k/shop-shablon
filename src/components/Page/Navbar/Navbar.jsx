import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategory } from '../../../api/category/router';

function Navbar() {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoverTimeout, setHoverTimeout] = useState(null);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await getCategory();
                setCategories(data);
            } catch (error) {
                console.error('Kategoriyalarni yuklashda xatolik:', error);
            }
        }
        fetchCategories();
    }, []);

    const handleCategoryHover = (categoryId) => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
        }
        setActiveCategory(categoryId);
    };

    const handleCategoryLeave = () => {
        const timeout = setTimeout(() => {
            setActiveCategory(null);
        }, 300); // 300ms delay before closing
        setHoverTimeout(timeout);
    };

    const toggleCategory = (categoryId) => {
        if (activeCategory === categoryId) {
            setActiveCategory(null);
        } else {
            setActiveCategory(categoryId);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as needed

    return (
        <div className="w-full bg-white sticky top-0 z-0 font-serif">
            {/* Custom font import - add to your CSS file */}
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Great+Vibes&display=swap');
                    
                    .font-cormorant {
                        font-family: 'Cormorant Garamond', serif;
                    }
                    
                    .font-greatvibes {
                        font-family: 'Great Vibes', cursive;
                    }
                    
                    .nav-gradient {
                        background: linear-gradient(to right, #f5f5f5, #ffffff, #f5f5f5);
                        border-bottom: 1px solid #d4af37;
                    }
                    
                    .gold-text {
                        color: #d4af37;
                    }
                    
                    .gold-border {
                        border-color: #d4af37;
                    }
                    
                    .gold-bg {
                        background-color: #d4af37;
                    }
                    
                    .category-card {
                        border: 1px solid #f5f5f5;
                        transition: all 0.3s ease;
                    }
                    
                    .category-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 10px 20px rgba(212, 175, 55, 0.2);
                        border-color: #d4af37;
                    }
                    
                    .gold-hover:hover {
                        color: #d4af37 !important;
                    }
                    
                    .menu-item-hover:hover {
                        background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.1), transparent);
                    }
                    
                    .gold-shadow {
                        box-shadow: 0 4px 12px rgba(212, 175, 55, 0.15);
                    }
                `}
            </style>

            {/* Desktop Navigation */}
            <nav className="hidden md:block shadow-md">
                <div className="nav-gradient py-4 px-8">
                    <div className="flex items-center gap-14">
                        {/* Categories */}
                        <div className="flex space-x-10">
                            {/* Katalog dropdown */}
                            <div
                                className="group relative"
                                onMouseEnter={() => handleCategoryHover('catalog')}
                                onMouseLeave={handleCategoryLeave}
                            >
                                <button className="flex items-center text-lg font-cormorant font-semibold text-gray-800 gold-hover transition-all duration-300">
                                    <span className="mr-2 gold-text">❧</span>
                                    <span className="border-b border-transparent group-hover:gold-border">Katalog</span>
                                </button>
                                {activeCategory === 'catalog' && (
                                    <div className="absolute left-0 bg-white z-50 shadow-xl border border-gray-100 rounded-lg mt-2 w-screen max-w-4xl p-6 z-20 grid grid-cols-3 gap-6 gold-shadow">
                                        {categories.map(category => (
                                            <div key={category.id} className="category-card bg-white rounded-lg p-4 hover:border-gold-500 transition-all duration-300">
                                                <Link to={`/category/${category.slug}`} className="block text-center">
                                                    <div className="h-40 overflow-hidden rounded-md mb-3 border gold-border">
                                                        <img
                                                            src={category.image || '/api/placeholder/400/320'}
                                                            alt={category.name}
                                                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                                        />
                                                    </div>
                                                    <h3 className="text-xl font-greatvibes gold-text mt-2">{category.name}</h3>
                                                    <p className="text-gray-600 text-sm font-cormorant line-clamp-2 mt-1">{category.description}</p>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Individual categories with dropdowns */}
                            {categories.map(category => (
                                <div
                                    key={category.id}
                                    className="group relative"
                                    onMouseEnter={() => handleCategoryHover(category.id)}
                                    onMouseLeave={handleCategoryLeave}
                                >
                                    <Link
                                        to={`/category/${category.slug}`}
                                        className="text-lg font-cormorant font-semibold text-gray-800 gold-hover transition-all duration-300"
                                    >
                                        <span className="border-b border-transparent group-hover:gold-border">
                                            {category.name}
                                        </span>
                                    </Link>
                                    {category.subcategories && category.subcategories.length > 0 && activeCategory === category.id && (
                                        <div className="absolute left-0 bg-white shadow-lg border border-gray-100 rounded-lg w-64 p-4 mt-1 z-20 gold-shadow">
                                            <ul className="space-y-2 text-gray-700">
                                                {category.subcategories.map(subcategory => (
                                                    <li key={subcategory.id}>
                                                        <Link
                                                            to={`/category/${category.slug}/${subcategory.slug}`}
                                                            className="gold-hover block p-2 rounded-md menu-item-hover transition-colors font-cormorant"
                                                        >
                                                            {subcategory.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <nav className="md:hidden bg-white shadow-md">
                <div className="px-4 py-3 flex justify-between items-center nav-gradient">
                    <Link to="/" className="font-greatvibes text-3xl gold-text">
                        Kelin Saroyim
                    </Link>
                    <button
                        onClick={toggleMobileMenu}
                        className="text-gray-700 gold-hover"
                    >
                        {isMobileMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="bg-white p-4 shadow-inner">
                        <div className="space-y-2 py-2">
                            {/* Mobile Categories */}
                            {categories.map(category => (
                                <div key={category.id} className="border-b gold-border pb-2">
                                    <div
                                        className="flex justify-between items-center py-2"
                                        onClick={() => toggleCategory(category.id)}
                                    >
                                        <Link
                                            to={`/category/${category.slug}`}
                                            className="text-lg font-greatvibes gold-text"
                                        >
                                            ❧ {category.name}
                                        </Link>
                                        {category.subcategories && category.subcategories.length > 0 && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={`h-5 w-5 transition-transform ${activeCategory === category.id ? 'transform rotate-180' : ''} gold-text`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        )}
                                    </div>
                                    {category.subcategories && category.subcategories.length > 0 && activeCategory === category.id && (
                                        <div className="ml-4 mt-2 space-y-1 bg-gray-50 p-3 rounded-lg gold-shadow">
                                            {category.subcategories.map(subcategory => (
                                                <Link
                                                    key={subcategory.id}
                                                    to={`/category/${category.slug}/${subcategory.slug}`}
                                                    className="block py-2 text-gray-700 gold-hover font-cormorant text-center border-b border-gray-100"
                                                >
                                                    {subcategory.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
}

export default Navbar;
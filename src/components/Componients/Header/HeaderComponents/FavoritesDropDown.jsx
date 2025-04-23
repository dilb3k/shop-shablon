import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoldBadge } from "../../../ui/Badges/GoldBadge";

export function FavoritesDropDown() {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    let hoverTimeout;

    const fetchFavorites = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const accessToken = localStorage.getItem("access_token");

            if (!accessToken) {
                // Handle guest user favorites
                const guestLikes = JSON.parse(localStorage.getItem('guest_likes') || '[]');
                if (guestLikes.length > 0) {
                    // Fetch product details for guest likes
                    const response = await axios.get(`http://localhost:8000/products/`);
                    const guestFavoriteProducts = response.data.filter(product =>
                        guestLikes.includes(product.id)
                    );
                    setFavorites(guestFavoriteProducts);
                } else {
                    setFavorites([]);
                }
                return;
            }

            const response = await axios.get(`http://localhost:8000/like/like-product/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            setFavorites(response.data);
        } catch (error) {
            console.error("Failed to fetch favorites:", error);
            setError("Sevimlilar ro'yxatini yuklab bo'lmadi");
            setFavorites([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    const handleMouseEnter = () => {
        clearTimeout(hoverTimeout);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        hoverTimeout = setTimeout(() => setIsOpen(false), 200);
    };

    const handleViewFavorites = () => {
        navigate('/favorites');
        setIsOpen(false);
    };

    const handleViewProductDetail = (productId) => {
        navigate(`/products/${productId}`);
        setIsOpen(false);
    };

    return (
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button
                className="flex flex-col items-center text-[#d4af37] hover:text-amber-400 transition-colors duration-300"
                onClick={handleViewFavorites}
                aria-label="View Favorites"
            >
                <div className="relative">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <GoldBadge count={favorites.length} />
                </div>
                <span className="text-xs mt-1 font-serif">Sevimlilar</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-80 bg-white rounded-lg shadow-xl border border-[#d4af37]/20 p-4 transform transition-all duration-300">
                    <div className="flex justify-between items-center border-b border-[#d4af37]/30 pb-2 mb-3">
                        <h3 className="font-semibold font-serif text-[#d4af37]">Sevimlilar</h3>
                        <span className="text-xs bg-[#d4af37]/10 text-[#d4af37] px-2 py-1 rounded-full font-serif">
                            {favorites.length} mahsulot
                        </span>
                    </div>

                    {error && (
                        <div className="py-2 text-center text-red-500 text-sm mb-2">
                            <p>{error}</p>
                        </div>
                    )}

                    {isLoading ? (
                        <div className="py-4 text-center text-[#d4af37]">
                            <div className="animate-spin h-5 w-5 border-2 border-[#d4af37] border-t-transparent rounded-full mx-auto mb-2"></div>
                            <p className="text-sm">Yuklanmoqda...</p>
                        </div>
                    ) : (
                        <>
                            {favorites.length === 0 ? (
                                <div className="py-8 text-center">
                                    <p className="text-gray-500 font-serif">Sevimlilar ro'yxati bo'sh</p>
                                </div>
                            ) : (
                                <ul className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-[#d4af37] scrollbar-track-[#d4af37]/10">
                                    {favorites.map((product) => (
                                        <li
                                            key={product.id}
                                            className="flex space-x-3 hover:bg-[#d4af37]/5 p-2 rounded-lg transition-colors duration-200 cursor-pointer"
                                            onClick={() => handleViewProductDetail(product.id)}
                                        >
                                            <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37]/10 to-white rounded-lg flex items-center justify-center">
                                                <img
                                                    src={product.images?.[0]?.image || "/default-image.jpg"}
                                                    alt={product.name}
                                                    className="w-12 h-12 rounded-full shadow-inner object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 text-xs font-serif">
                                                <p className="font-semibold text-[#d4af37]">{product.name}</p>
                                                <p className="text-[#d4af37] font-bold mt-1">
                                                    {parseFloat(product.price).toLocaleString()} so'm
                                                </p>
                                                <div className="flex justify-between items-center mt-1">
                                                    <span className="bg-[#d4af37]/10 text-[#d4af37] text-xs px-2 rounded-full">
                                                        {product.inStock > 0 ? "Sotuvda" : "Tugagan"}
                                                    </span>
                                              
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}

                        
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default FavoritesDropDown;
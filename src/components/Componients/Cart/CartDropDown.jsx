import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoldBadge } from "../../ui/Badges/GoldBadge";



// Updated CartDropDown with improved styling and functionality
function CartDropDown() {
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    let hoverTimeout;

    // Improved cart fetching with loading state and error handling
    const fetchCart = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.id) {
                console.error("User ID not found.");
                setCart([]);
                return;
            }

            const response = await axios.get(`http://localhost:8000/cart/cart/`);

            const filteredData = response.data
                .filter(item => item.user_id === parseInt(user.id))
                .map(item => ({
                    id: item.id,
                    productId: item.product_id,
                    quantity: item.quantity,
                    price: parseFloat(item.price),
                    totalAmount: parseFloat(item.total_amount),
                    orderDate: item.order_date,
                    status: item.status,
                    user: item.user
                }));

            setCart(filteredData);
        } catch (error) {
            console.error("Failed to fetch cart:", error);
            setError("Savat ma'lumotlarini yuklab bo'lmadi");
            setCart([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCart();

        // Set up periodic refresh of cart data (every 30 seconds)
        const intervalId = setInterval(fetchCart, 30000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, [fetchCart]);

    const totalItems = cart.reduce((acc, product) => acc + product.quantity, 0);
    const totalAmount = cart.reduce((acc, product) => acc + (product.price * product.quantity), 0);

    const handleMouseEnter = () => {
        clearTimeout(hoverTimeout);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        hoverTimeout = setTimeout(() => setIsOpen(false), 200);
    };

    const handleViewCart = () => {
        navigate('/cart');
        setIsOpen(false);
    };

    const handleViewProductDetail = (productId) => {
        navigate(`/cart/${productId}`);
        setIsOpen(false);
    };

    return (
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button
                className="flex flex-col items-center text-[#d4af37] hover:text-amber-400 transition-colors duration-300"
                onClick={handleViewCart}
                aria-label="View Cart"
            >
                <div className="relative">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <GoldBadge count={totalItems} />
                </div>
                <span className="text-xs mt-1 font-serif">Savat</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-80 bg-white rounded-lg shadow-xl border border-[#d4af37]/20 p-4 transform transition-all duration-300">
                    <div className="flex justify-between items-center border-b border-[#d4af37]/30 pb-2 mb-3">
                        <h3 className="font-semibold font-serif text-[#d4af37]">Savat</h3>
                        <span className="text-xs bg-[#d4af37]/10 text-[#d4af37] px-2 py-1 rounded-full font-serif">
                            {totalItems} mahsulot
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
                            {cart.length === 0 ? (
                                <div className="py-8 text-center">
                                    <p className="text-gray-500 font-serif">Savat bo'sh</p>
                                </div>
                            ) : (
                                <ul className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-[#d4af37] scrollbar-track-[#d4af37]/10">
                                    {cart.map((product) => (
                                        <li
                                            key={product.id}
                                            className="flex space-x-3 hover:bg-[#d4af37]/5 p-2 rounded-lg transition-colors duration-200 cursor-pointer"
                                            onClick={() => handleViewProductDetail(product.id)}
                                        >
                                            <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37]/10 to-white rounded-lg flex items-center justify-center">
                                                <div className="w-12 h-12 bg-white rounded-full shadow-inner"></div>
                                            </div>
                                            <div className="text-xs font-serif flex-1">
                                                <p className="font-semibold text-[#d4af37]">Mahsulot {product.productId}</p>
                                                <p className="text-[#d4af37] font-bold mt-1">{product.price.toLocaleString()} so'm</p>
                                                <div className="flex justify-between items-center mt-1">
                                                    <span className="bg-[#d4af37]/10 text-[#d4af37] text-xs px-2 rounded-full">
                                                        Soni: {product.quantity}
                                                    </span>
                                                    <span className="font-bold text-[#d4af37]">
                                                        {(product.price * product.quantity).toLocaleString()} so'm
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <div className="mt-3 pt-2 border-t border-[#d4af37]/20">
                                <div className="flex justify-between items-center mb-3 text-sm">
                                    <span className="font-serif text-gray-600">Jami:</span>
                                    <span className="font-bold text-[#d4af37]">{totalAmount.toLocaleString()} so'm</span>
                                </div>
                                <button
                                    className="w-full py-2 bg-gradient-to-r from-[#d4af37] to-amber-500 hover:from-amber-500 hover:to-[#d4af37] text-white text-sm rounded-lg transition-colors duration-300 shadow-md font-serif"
                                    onClick={handleViewCart}
                                >
                                    Savatni ko'rish
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default CartDropDown;
import React, { useState, useEffect } from "react";
import { GoldBadge } from "../../../ui/Badges/GoldBadge";
import { getCart } from "../../../../api/cart/router";

function CartDropDown() {
    const cart = getCart();
    const totalItems = cart.reduce((acc, userCart) => acc + userCart.products.length, 0);

    const [isOpen, setIsOpen] = useState(false);
    let hoverTimeout;

    const handleMouseEnter = () => {
        clearTimeout(hoverTimeout);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        hoverTimeout = setTimeout(() => setIsOpen(false), 300);
    };

    return (
        <div className="relative">
            <button
                className="flex flex-col items-center text-amber-500 hover:text-amber-400 transition-colors duration-300"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="relative">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <GoldBadge count={totalItems} />
                </div>
                <span className="text-xs mt-1 font-serif">Saralanganlar</span>
            </button>
            {isOpen && (
                <div
                    className="absolute right-0 z-10 mt-2 w-72 bg-white rounded-lg shadow-lg border border-amber-100 p-4 transform transition-all duration-300"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="flex justify-between items-center border-b border-amber-100 pb-2 mb-3">
                        <h3 className="font-semibold font-serif text-amber-700">Saralanganlar</h3>
                        <span className="text-xs bg-amber-50 text-amber-600 px-2 py-1 rounded-full font-serif">{totalItems} mahsulot</span>
                    </div>
                    <ul className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-400 scrollbar-track-amber-100">
                        {cart.flatMap(userCart => userCart.products.map((product, index) => (
                            <li key={index} className="flex space-x-3 hover:bg-amber-50 p-2 rounded-lg transition-colors duration-200">
                                <div className="w-16 h-16 bg-gradient-to-br from-amber-50 to-white rounded-lg flex items-center justify-center">
                                    <div className="w-12 h-12 bg-white rounded-full shadow-inner"></div>
                                </div>
                                <div className="text-xs font-serif">
                                    <p className="font-semibold text-amber-800">Mahsulot {product.productId}</p>
                                    <p className="text-amber-500 font-bold mt-1">{product.price.toLocaleString()} so'm</p>
                                    <div className="flex space-x-1 mt-1">
                                        <span className="bg-amber-50 text-amber-600 text-xs px-2 rounded-full">Soni: {product.quantity}</span>
                                    </div>
                                </div>
                            </li>
                        )))}
                    </ul>
                    <button className="w-full mt-3 py-2 bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-white text-sm rounded-lg transition-colors duration-300 shadow-md font-serif">
                        Ko'rish
                    </button>
                </div>
            )}
        </div>
    );
}

export default CartDropDown;

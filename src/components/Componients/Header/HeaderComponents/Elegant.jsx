import React, { useState, useEffect } from "react";
import { X, LogOut, User, Settings, Phone } from "lucide-react";
import { usersApi } from "../../../../api/users/router";

const ElegantButton = ({ openLoginModal }) => {
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        try {
            localStorage.removeItem('user');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            setUser(null); // Clear user state
            setIsOpen(false); // Close dropdown
            openLoginModal(); // Open login modal instead of redirect
        } catch (error) {
            console.error("Logout error:", error);
            // Optional: Show error message to user
        }
    };
    let hoverTimeout;



    const handleMouseEnter = () => {
        clearTimeout(hoverTimeout);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        hoverTimeout = setTimeout(() => setIsOpen(false), 100);
    };

    return (
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {user ? (
                <button className="flex flex-col items-center text-[#d4af37] hover:text-amber-400 transition-colors duration-300">
                    <div className="relative">

                        <User />
                    </div>
                    <span className="text-xs mt-1 font-serif">{user.username}</span>
                </button>
            ) : (
                <button
                    onClick={openLoginModal}
                    className="flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-lg hover:bg-amber-200 transition-colors"
                >
                    <User className="w-5 h-5" />
                    <span className="font-medium">Kirish</span>
                </button>
            )}

            {isOpen && user && (
                <div className="absolute right-0 z-50 mt-2 w-64 bg-white rounded-xl shadow-lg border border-amber-100 overflow-hidden">
                    <div className="bg-amber-50 p-4 border-b border-amber-100">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-amber-800">{user.username}</h3>
                                <p className="text-xs text-amber-600">{user.email}</p>
                            </div>
                          
                        </div>
                    </div>

                    <div className="py-2">
                        <button
                            className="w-full flex items-center px-4 py-2 text-left hover:bg-amber-50 transition-colors"
                        >
                            <Phone className="w-4 h-4 mr-3 text-amber-600" />
                            <p className="text-xs text-amber-600">{user.phone}</p>

                        </button>
                       
                    </div>

                    <div className="border-t border-amber-100">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center text-red-500 hover:bg-red-50 px-4 py-3 transition-colors"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Chiqish
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ElegantButton;
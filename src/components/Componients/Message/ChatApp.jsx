import React, { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import ChatBox from "./ChatBox";
import { getUnreadMessagesCount } from "../../../api/message/router";

const ChatApp = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [user, setUser] = useState(null);

    // Foydalanuvchi ma'lumotlarini olish
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);
    }, []);

    // O'qilmagan xabarlar sonini har 30 soniyada yangilash
    useEffect(() => {
        const fetchUnreadCount = async () => {
            try {
                const token = localStorage.getItem("access_token");
                if (!token || !user || user.isGuest) return;

                const count = await getUnreadMessagesCount(token);
                setUnreadCount(count);
            } catch (error) {
                console.error("O'qilmagan xabarlar sonini olishda xatolik:", error);
            }
        };

        fetchUnreadCount();

        const interval = setInterval(fetchUnreadCount, 10000);

        return () => clearInterval(interval);
    }, [user]);

    // Chat oynasini ochish/yopish
    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Chat tugmasi */}
            <button
                onClick={toggleChat}
                className="fixed bottom-6 right-6 z-40 bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-600 transition-colors"
            >
                <MessageCircle size={24}  />
                {unreadCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                        {unreadCount}
                    </div>
                )}
            </button>

            {/* Chat oynasi */}
            {isOpen && <ChatBox />}
        </>
    );
};

export default ChatApp;
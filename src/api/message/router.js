import axios from "axios";

const API_URL = "http://localhost:8000";

// Chat xonalari ro'yxatini olish
export const getChatRooms = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/chat/chat-rooms/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Chat xonalarini olishda xatolik:", error);
        throw error;
    }
};

// Yangi chat xonasi yaratish
export const createChatRoom = async (token, data) => {
    try {
        const response = await axios.post(`${API_URL}/chat/chat-rooms/`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Chat xonasi yaratishda xatolik:", error);
        throw error;
    }
};

// Chat xonasi ma'lumotlarini olish
export const getChatRoom = async (token, roomId) => {
    try {
        const response = await axios.get(`${API_URL}/chat/chat-rooms/${roomId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Chat xonasi ma'lumotlarini olishda xatolik:", error);
        throw error;
    }
};

// Chat xonasining xabarlarini olish
export const getMessages = async (token, roomId) => {
    try {
        const response = await axios.get(`${API_URL}/chat/chat-rooms/${roomId}/messages/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Xabarlarni olishda xatolik:", error);
        throw error;
    }
};

// Xabar yuborish
export const sendMessage = async (token, data) => {
    try {
        const response = await axios.post(`${API_URL}/chat/messages/`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Xabar yuborishda xatolik:", error);
        throw error;
    }
};

// Xabarni o'qilgan deb belgilash
export const markMessageAsRead = async (token, messageId) => {
    try {
        const response = await axios.post(
            `${API_URL}/chat/messages/${messageId}/mark-as-read/`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Xabarni o'qilgan deb belgilashda xatolik:", error);
        throw error;
    }
};

// O'qilmagan xabarlar sonini olish
export const getUnreadMessagesCount = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/chat/messages/unread-count/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.unread_count;
    } catch (error) {
        console.error("O'qilmagan xabarlar sonini olishda xatolik:", error);
        throw error;
    }
};
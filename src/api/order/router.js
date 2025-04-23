import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/order'; // Remove trailing slash
const TELEGRAM_API_URL = 'https://api.telegram.org/bot7470294456:AAHTt4pG6qoBFgO6Ovv3ag8ImkjpXakL35o/sendMessage'; // Telegram API URL

// Telegramga xabar yuborish funksiyasi
const sendTelegramMessage = async (chatId, message) => {
    try {
        await axios.post(TELEGRAM_API_URL, {
            chat_id: chatId,
            text: message
        });
    } catch (error) {
        console.error('Failed to send message to Telegram:', error);
    }
};

// Create order and notify bot
export const createOrder = async (orderData) => {
    try {
        // Order yaratish
        const response = await axios.post(`${API_BASE_URL}/orders/`, orderData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json'
            }
        });

        // Order muvaffaqiyatli yaratildi, Telegram botga xabar yuboramiz
        const chatId = 5583276966; // Bot bilan muloqot qilayotgan user ID
        const message = `Yangi buyurtma: ${orderData.productName}, miqdor: ${orderData.quantity}`;

        // Telegramga xabar yuborish
        await sendTelegramMessage(chatId, message);

        return response.data;
    } catch (error) {
        // Error handling
        if (error.response) {
            console.error('Server responded with:', error.response.data);
            throw new Error(error.response.data.detail || 'Order creation failed');
        }
        throw error;
    }
};

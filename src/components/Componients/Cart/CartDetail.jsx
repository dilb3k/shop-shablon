import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// Telegram message sending function
const sendTelegramMessage = async (chatId, message) => {
    try {
        const botToken = '7470294456:AAHTt4pG6qoBFgO6Ovv3ag8ImkjpXakL35o'; // Replace with your actual bot token
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

        const response = await axios.post(url, {
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML'
        });

        return response.data;
    } catch (error) {
        console.error('Error sending Telegram message:', error);
        throw error;
    }
};

function CartDetail() {
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const { productId } = useParams();

    const fetchCart = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.id) {
                setError("Foydalanuvchi tizimga kirmagan");
                setCart([]);
                return;
            }

            const response = await axios.get(`http://localhost:8000/cart/cart/`);

            let filteredData = response.data
                .filter(item => item.user_id === parseInt(user.id))
                .map(item => ({
                    id: item.id,
                    productId: item.product_id,
                    productName: item.product_name || `Mahsulot ${item.product_id}`, // Added productName
                    quantity: item.quantity,
                    price: parseFloat(item.price),
                    totalAmount: parseFloat(item.total_amount),
                    orderDate: item.order_date,
                    status: item.status,
                    user: item.user
                }));

            if (productId) {
                filteredData = filteredData.filter(item => item.id === parseInt(productId));
            }

            setCart(filteredData);
        } catch (err) {
            setError("Savat ma'lumotlarini yuklashda xatolik yuz berdi");
            console.error(err);
            setCart([]);
        } finally {
            setIsLoading(false);
        }
    }, [productId]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const totalItems = cart.reduce((acc, product) => acc + product.quantity, 0);
    const totalAmount = cart.reduce((acc, product) => acc + (product.price * product.quantity), 0);

    const handleCheckout = async () => {
        setIsProcessing(true);
        setError(null);
        setSuccess(null);

        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.id) {
                setError("Foydalanuvchi tizimga kirmagan");
                setIsProcessing(false);
                return;
            }

            // Format order data
            const orderItems = cart.map(item => ({
                user_id: user.id,
                product_id: item.productId,
                productName: item.productName,
                quantity: item.quantity,
                price: item.price,
                total_amount: item.price * item.quantity,
                status: "Processing"
            }));

            // Create orders
            const orderPromises = orderItems.map(async (orderItem) => {
                try {
                    await axios.post(`http://localhost:8000/order/orders/`, orderItem, {
                        headers: {
                            'Authorization': `${localStorage.getItem('access_token')}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    // Send Telegram notification
                    const message = `🛒 Yangi buyurtma:\n🧾 Mahsulot: ${orderItem.productName}\n📦 Miqdor: ${orderItem.quantity}\n💰 Narx: ${orderItem.price} so'm\n🔢 Umumiy: ${orderItem.total_amount} so'm`;
                    await sendTelegramMessage(5583276966, message);
                } catch (err) {
                    console.error("Xatolik:", err);
                }
            });

            await Promise.all(orderPromises);

            // Clear the cart after successful order placement
            setSuccess("Buyurtma qabul qilindi, savat tozalanmoqda...");

            // Delete cart items one by one
            const deletePromises = cart.map(item =>
                axios.delete(`http://localhost:8000/cart/cart/${item.id}/`, {
                    headers: {
                        'Authorization': `${localStorage.getItem('access_token')}`
                    }
                })
            );

            await Promise.all(deletePromises);

            // Update local state
            setCart([]);
            setSuccess("Buyurtmangiz muvaffaqiyatli qabul qilindi va savat tozalandi!");

            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (err) {
            console.error(err);
            setError("Buyurtma jarayonida xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleUpdateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;

        setError(null);

        try {
            setCart(prevCart =>
                prevCart.map(item =>
                    item.id === itemId
                        ? {
                            ...item,
                            quantity: newQuantity,
                            totalAmount: item.price * newQuantity
                        }
                        : item
                )
            );

            const itemToUpdate = cart.find(item => item.id === itemId);
            if (!itemToUpdate) return;

            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.id) {
                throw new Error("User information not found");
            }

            await axios.put(`http://localhost:8000/cart/cart/${itemId}/`, {
                user_id: user.id,
                product_id: itemToUpdate.productId,
                quantity: newQuantity,
                price: itemToUpdate.price,
                total_amount: itemToUpdate.price * newQuantity,
                status: itemToUpdate.status || "In Cart",
                order_date: itemToUpdate.orderDate || new Date().toISOString().split('T')[0]
            }, {
                headers: {
                    'Authorization': `${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                }
            });
        } catch (err) {
            console.error("Failed to update quantity:", err);
            setError("Mahsulot miqdorini yangilashda xatolik yuz berdi");
            fetchCart();
        }
    };

    const handleRemoveItem = async (itemId) => {
        setError(null);

        try {
            await axios.delete(`http://localhost:8000/cart/cart/${itemId}/`, {
                headers: {
                    'Authorization': `${localStorage.getItem('access_token')}`
                }
            });

            setCart(prevCart => prevCart.filter(item => item.id !== itemId));
            setSuccess("Mahsulot savatdan o'chirildi");
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            console.error("Failed to remove item:", err);
            setError("Mahsulotni o'chirishda xatolik yuz berdi");
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto p-8 text-center">
                <div className="animate-spin h-12 w-12 border-4 border-[#d4af37] border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-[#d4af37] font-serif">Ma'lumotlar yuklanmoqda...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-serif font-bold text-[#d4af37] border-b border-[#d4af37]/20 pb-3 mb-6">
                {productId ? "Mahsulot Tafsilotlari" : "Savat Tafsilotlari"}
            </h1>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {success}
                </div>
            )}

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <div className="bg-[#d4af37]/5 rounded-lg p-4 mb-4">
                        <h2 className="font-semibold font-serif text-[#d4af37] mb-4">
                            Savatdagi Mahsulotlar ({totalItems})
                        </h2>

                        {cart.length > 0 ? (
                            <ul className="space-y-4">
                                {cart.map((product) => (
                                    <li key={product.id} className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-[#d4af37]/10 hover:border-[#d4af37]/30 transition-all duration-200">
                                        <div className="w-20 h-20 bg-gradient-to-br from-[#d4af37]/10 to-white rounded-lg flex items-center justify-center mr-4">
                                            <div className="w-16 h-16 bg-white rounded-full shadow-inner"></div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <p className="font-semibold text-[#d4af37]">{product.productName}</p>
                                                <button
                                                    onClick={() => handleRemoveItem(product.id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <p className="text-[#d4af37] text-sm mt-1">
                                                {product.price.toLocaleString()} so'm
                                            </p>
                                            <div className="flex justify-between items-center mt-2">
                                                <div className="flex items-center border border-[#d4af37]/20 rounded-lg overflow-hidden">
                                                    <button
                                                        className="px-2 py-1 bg-[#d4af37]/10 text-[#d4af37] hover:bg-[#d4af37]/20"
                                                        onClick={() => handleUpdateQuantity(product.id, product.quantity - 1)}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-3 py-1 font-medium">{product.quantity}</span>
                                                    <button
                                                        className="px-2 py-1 bg-[#d4af37]/10 text-[#d4af37] hover:bg-[#d4af37]/20"
                                                        onClick={() => handleUpdateQuantity(product.id, product.quantity + 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <p className="font-bold text-[#d4af37]">
                                                    {(product.price * product.quantity).toLocaleString()} so'm
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center py-10 bg-white rounded-lg">
                                <svg className="w-16 h-16 text-[#d4af37]/30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <p className="text-gray-500 font-serif mb-4">Savat bo'sh</p>
                                <button
                                    onClick={() => navigate('/')}
                                    className="px-4 py-2 bg-[#d4af37] text-white rounded-lg hover:bg-amber-500 transition-colors"
                                >
                                    Xarid qilishni davom ettirish
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="md:col-span-1">
                    <div className="bg-[#d4af37]/5 rounded-lg p-4 sticky top-4">
                        <h2 className="font-semibold font-serif text-[#d4af37] mb-4">
                            Buyurtma Xulosasi
                        </h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between py-2 border-b border-[#d4af37]/10">
                                <span className="text-gray-600">Mahsulotlar:</span>
                                <span className="font-semibold">{totalItems} ta</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-gray-600">Jami Summa:</span>
                                <span className="font-bold text-[#d4af37] text-lg">
                                    {totalAmount.toLocaleString()} so'm
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={isProcessing || cart.length === 0}
                            className={`w-full py-3 rounded-lg font-serif font-bold text-white relative overflow-hidden ${isProcessing || cart.length === 0
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-[#d4af37] to-amber-500 hover:from-amber-500 hover:to-[#d4af37]'
                                } transition-colors duration-300 shadow-md`}
                        >
                            {isProcessing ? (
                                <>
                                    <span className="inline-block">Ishlanmoqda</span>
                                    <span className="ml-2 inline-block animate-pulse">...</span>
                                </>
                            ) : (
                                'Buyurtma Berish'
                            )}
                        </button>

                        {cart.length > 0 && (
                            <button
                                onClick={() => navigate('/')}
                                className="w-full mt-3 py-2 text-[#d4af37] border border-[#d4af37]/30 rounded-lg font-serif hover:bg-[#d4af37]/5 transition-colors duration-300"
                            >
                                Xarid qilishni davom ettirish
                            </button>
                        )}

                        {productId && (
                            <button
                                onClick={() => navigate('/cart')}
                                className="w-full mt-3 py-2 text-[#d4af37] border border-[#d4af37]/30 rounded-lg font-serif hover:bg-[#d4af37]/5 transition-colors duration-300"
                            >
                                Savatga qaytish
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartDetail;
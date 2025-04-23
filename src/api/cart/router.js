import axios from "axios";

export async function getCart() {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
            console.error("User ID not found.");
            return [];
        }

        const userId = user.id;
        const response = await axios.get(`http://localhost:8000/cart/cart/`);

        return response.data
            .filter(item => item.user_id === parseInt(userId))
            .map(item => ({
                productId: item.product_id,
                quantity: item.quantity,
                price: parseFloat(item.price),
                totalAmount: parseFloat(item.total_amount),
                orderDate: item.order_date,
                status: item.status,
            }));
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}

export async function addToCart(productId, quantity, price) {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
            throw new Error("User not logged in");
        }

        const totalAmount = price * quantity;

        const response = await axios.post(`http://localhost:8000/cart/cart/`, {
            user_id: user.id,
            product_id: productId,
            quantity: quantity,
            price: price,
            total_amount: totalAmount,
            status: "Processing"
        });

        return response.data;
    } catch (error) {
        console.error("Error adding to cart:", error);
        throw error;
    }
}
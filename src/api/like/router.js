import axios from "axios";

const API_BASE_URL = "http://localhost:8000/like";

export async function getLikedProducts() {
    try {
        const accessToken = localStorage.getItem("access_token") || "";
        const response = await axios.get(`${API_BASE_URL}/like-product/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching liked products:", error);
        return [];
    }
}

// In your frontend router.js
export async function likeProduct(productId) {
    try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            // Handle guest user
            const guestLikes = JSON.parse(localStorage.getItem('guest_likes') || '[]');
            if (!guestLikes.includes(productId)) {
                localStorage.setItem('guest_likes', JSON.stringify([...guestLikes, productId]));
            }
            return { success: true };
        }

        const response = await axios.post(
            `${API_BASE_URL}/like/`,  
            { product_id: productId },  
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error liking product:", error);
        throw error;
    }
}

export async function unlikeProduct(productId) {
    try {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
            // Handle guest user (remove from localStorage)
            const guestLikes = JSON.parse(localStorage.getItem('guest_likes') || '[]');
            localStorage.setItem('guest_likes',
                JSON.stringify(guestLikes.filter(id => id !== productId)));
            return { success: true };
        }

        const response = await axios.delete(
            `${API_BASE_URL}/like-product/${productId}/`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error unliking product:", error);
        throw error;
    }
}
import axios from "axios";

export async function getProduct() {
    try {
        const response = await axios.get("http://localhost:8000/products/products/");
        return response.data;
    } catch (error) {
        console.error("Xatolik:", error);
        return [];
    }
}

export const getProductDetail = async (productId) => {
    try {
        const response = await axios.get(`http://localhost:8000/products/products/${productId}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product detail:", error);
        throw error;
    }
};
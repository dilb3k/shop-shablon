import axios from "axios";

export async function getComment() {
    try {
        const response = await axios.get("http://localhost:8000/comment/comment/");
        return response.data;
    } catch (error) {
        console.error("Xatolik:", error);
        return [];
    }
}
export const getProductComments = async (productId) => {
    try {
        const response = await axios.get(`http://localhost:8000/comment/comment/`);
        return response.data.filter(comment => comment.product_id === productId);
    } catch (error) {
        console.error("Error fetching comments:", error);
        return [];
    }
};

import axios from "axios";

export async function getBlog() {
    try {
        const response = await axios.get("http://localhost:8000/blog/blog/");
        return response.data;
    } catch (error) {
        console.error("Xatolik:", error);
        return [];
    }
}

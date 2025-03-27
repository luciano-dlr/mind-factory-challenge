import axios from "axios";

export default class useGetNews {
    async getAllNews() {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/News?select=*`,
            {
                headers: {
                    apikey: import.meta.env.VITE_API_KEY,
                    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    }
}

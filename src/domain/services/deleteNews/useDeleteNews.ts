import axios from "axios";

export default class useDeleteNews {
    async deleteNews(id: number) {
        const response = await axios.delete(
            `${import.meta.env.VITE_API_URL}/News?id=eq.${id}`,
            {
                headers: {
                    apikey: import.meta.env.VITE_API_KEY,
                },
            }
        );
        return response.data;
    }
}

import axios from "axios";

export default class GetNewsService {
    async getAllNews() {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/News?select=*`,
            {
                headers: {
                    apikey: import.meta.env.VITE_API_KEY,
                },
            }
        );
        return response.data;
    }
}

import axios from "axios";

export default class useGetNewsById {
    async getNewsById(id: number) {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/News?select=*&id=eq.${id}`,
            {
                headers: {
                    apikey: import.meta.env.VITE_API_KEY,
                },
            }
        );
        return response.data;
    }
}

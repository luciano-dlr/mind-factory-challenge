import axios from "axios";
import { UpdateNews } from "./types";


export default class PatchNewsService {
    async updateNews(newNews: UpdateNews, id: number) {
        const response = await axios.patch(
            `${import.meta.env.VITE_API_URL}/News?id=eq.${id}`,
            newNews,
            {
                headers: {
                    apikey: import.meta.env.VITE_API_KEY,
                },
            }
        );
        return response.data;
    }
}

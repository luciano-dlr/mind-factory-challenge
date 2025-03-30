import axios from "axios";

export interface UpdateNews {
    id?: number;
    title: string;
    subtitle: string;
    image: string;
    description: string;
    author: string;
    category: string;
}
// TODO - change name class
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

import axios from "axios";

export interface NewNews {
    title: string;
    subtitle: string;
    image: string;
    description: string;
    author: string;
    category: string;
}

export default class usePostCreateNews {
    async postNews(createdNews: NewNews) {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/News`,
            createdNews,
            {
                headers: {
                    apikey: import.meta.env.VITE_API_KEY,
                },
            }
        );
        return response.data;
    }
}

import axios from "axios";
import { NewData } from "../../../infraestructure/components/FormPreview/FormPreview";
//TODO - change name service class
export default class PostCreateNews {
    async postNews(createdNews: NewData) {
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

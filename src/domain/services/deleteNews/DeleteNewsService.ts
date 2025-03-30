import axios from "axios";

export default class useDeleteNewsService {
    async deleteNews(id: number) {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_API_URL}/News?id=eq.${id}`,
                {
                    headers: {
                        apikey: import.meta.env.VITE_API_KEY,
                        "Content-Type": "application/json"
                    },
                }
            );

            if (response.status !== 204) {
                throw new Error("No se pudo eliminar la noticia");
            }

            return true;
        } catch (error) {

            throw new Error("Error de conexión al intentar eliminar la noticia");
        }
    }
}
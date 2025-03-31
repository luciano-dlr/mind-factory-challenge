import { useState } from "react";
import { useNewsStore } from "../../zustand/NewsStore";
import useDeleteNewsService from "../../../domain/services/deleteNews/DeleteNewsService";

const useDeleteNews = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { deleteNews: deleteFromStore } = useNewsStore();

    const service = new useDeleteNewsService();

    const deleteNews = async (id: number) => {
        try {
            setIsLoading(true);
            setError(null);
            const success = await service.deleteNews(id);
            if (!success) {
                throw new Error("No se pudo eliminar la noticia");
            }
            deleteFromStore(id);

            return true;
        } catch (error: any) {
            setError(error.message || "Error al eliminar la noticia");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        deleteNews,
        isLoading,
        error,
    };
};

export default useDeleteNews;
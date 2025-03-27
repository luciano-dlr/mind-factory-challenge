import { useState } from "react";
import useDeleteNews from "../../../domain/services/deleteNews/useDeleteNews";

const useDeleteNewsHook = (id: number) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const service = new useDeleteNews();

    const fetchDeletedNews = async () => {
        try {
            setIsLoading(true);
            setError(null);
            await service.deleteNews(id);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Ha ocurrido un error.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoadingDeletedNews: isLoading,
        errorDeletedNews: error,
        fetchDeletedNews
    };
};

export default useDeleteNewsHook;

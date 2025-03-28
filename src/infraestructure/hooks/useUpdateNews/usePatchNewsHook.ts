import { useState } from "react";
import PatchNewsService, { UpdateNews } from "../../../domain/services/updateNews/usePatchNews";

interface UpdateNewsResponse {
    key: string;
}

const usePatchNewsHook = (id: number) => {
    const [data, setData] = useState<UpdateNewsResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const service = new PatchNewsService();

    const fetchPatchNews = async (updatedValues: UpdateNews) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await service.updateNews(updatedValues, id);
            setData(response);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Ha ocurrido un error.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        dataUpdatedNews: data,
        isLoadingUpdatedNews: isLoading,
        errorUpdatedNews: error,
        fetchPatchNews
    };
};

export default usePatchNewsHook;

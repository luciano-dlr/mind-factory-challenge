import { useState } from "react";
import { useNewsStore } from "../../zustand/NewsStore";
import { UpdateNews } from "../../../domain/services/updateNews/types";
import PatchNewsService from "../../../domain/services/updateNews/PatchNews";

const usePatchNews = (id: number) => {
    const [data, setData] = useState<UpdateNews | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { updateNews } = useNewsStore();

    const service = new PatchNewsService();

    const fetchPatchNews = async (updatedValues: UpdateNews) => {
        try {
            setIsLoading(true);
            setError(null);
            await service.updateNews(updatedValues, id);
            setData({ ...updatedValues, id });
            updateNews(id, updatedValues);
            return true
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Ha ocurrido un error.";
            setError(errorMessage);
            return false
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

export default usePatchNews;

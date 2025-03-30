import { useState } from "react";
import PatchNewsService, { UpdateNews } from "../../../domain/services/updateNews/usePatchNews";
import { useNewsStore } from "../../zustand/NewsStore";

const usePatchNews = (id: number) => {
    //TODO, typar data update feature  - hook in progress
    const [data, setData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { updateNews } = useNewsStore();

    const service = new PatchNewsService();

    const fetchPatchNews = async (updatedValues: UpdateNews) => {
        try {
            setIsLoading(true);
            setError(null);
            await service.updateNews(updatedValues, id);
            // setData(response);
            setData({ ...updatedValues, id });
            updateNews(id, updatedValues);
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

export default usePatchNews;

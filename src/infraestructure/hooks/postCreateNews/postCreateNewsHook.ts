import { useState } from "react";
import { News } from "../../../domain/api/entities/types";
import usePostCreateNews, { NewNews } from "../../../domain/services/postCreateNews/usePostCreateNews";

const postCreateNewsHook = () => {
    const [data, setData] = useState<News>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const service = new usePostCreateNews();


    const fetchCreatedNews = async (newsCreated: NewNews) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await service.postNews(newsCreated);
            setData(response);
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message || "Ha ocurrido un error.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };


    return {
        dataNewsCreated: data,
        isLoadingCreatedNews: isLoading,
        errorCreatedNews: error,
        fetchCreatedNews
    };
};

export default postCreateNewsHook;

import { useEffect, useState } from "react";
import GetNewsService from "../../../domain/services/getNews/GetNews";
import { useNewsStore } from "../../zustand/NewsStore";

const useGetAllNews = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { news, setNews } = useNewsStore();

    const service = new GetNewsService();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await service.getAllNews();
                setNews(response);
            } catch (error: any) {
                const errorMessage =
                    error.response?.data?.message || "Ha ocurrido un error.";
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNews();
    }, []);

    return {
        dataNews: news,
        isLoadingGetNews: isLoading,
        errorGetNews: error,
    };
};

export default useGetAllNews;
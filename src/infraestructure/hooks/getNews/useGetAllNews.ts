import { useEffect, useState } from "react";
import useGetNews from "../../../domain/services/getNews/useGetNews";
import { useNewsStore } from "../../zustand/NewsStore";

const useGetAllNews = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { news, setNews } = useNewsStore();

    const service = new useGetNews();

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
    }, [setNews]);

    return {
        dataNews: news,
        isLoadingGetNews: isLoading,
        errorGetNews: error,
    };
};

export default useGetAllNews;
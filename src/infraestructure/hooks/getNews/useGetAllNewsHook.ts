import { useState, useEffect } from "react";
import useGetNews from "../../../domain/services/getNews/useGetNews";
import { News } from "../../../domain/api/entities/types";

const useGetAllNewsHook = () => {
    const [data, setData] = useState<News[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const service = new useGetNews();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await service.getAllNews();
                setData(response);
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
        dataNews: data,
        isLoadingGetNews: isLoading,
        errorGetNews: error,
    };
};

export default useGetAllNewsHook;

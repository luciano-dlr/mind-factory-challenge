import { useState, useEffect } from "react";
import { News } from "../../../domain/api/entities/types";
import useGetNewsById from "../../../domain/services/getNewsById/useGetNewsById";

const useGetNewsByIdHook = (id: number) => {
    const [data, setData] = useState<News[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const service = new useGetNewsById();

    useEffect(() => {
        const fetchNewsById = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await service.getNewsById(id);
                setData(response);
            } catch (error: any) {
                const errorMessage =
                    error.response?.data?.message || "Ha ocurrido un error.";
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNewsById();
    }, [id]);

    return {
        dataNewsById: data,
        isLoadingGetNewsById: isLoading,
        errorGetNewsById: error,
    };
};

export default useGetNewsByIdHook;

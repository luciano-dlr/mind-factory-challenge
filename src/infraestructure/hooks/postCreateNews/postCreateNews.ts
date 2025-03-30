import { useState } from "react";
import { News } from "../../../domain/api/entities/types";
import { NewData } from "../../components/FormPreview/FormPreview";
import PostCreateNews from "../../../domain/services/postCreateNews/usePostCreateNews";

const postCreateNews = () => {
    const [data, setData] = useState<News>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const service = new PostCreateNews();

    const fetchCreatedNews = async (newsCreated: NewData) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await service.postNews(newsCreated);
            setData(response);
            if (!response) {
                throw new Error("No se pudo crear la noticia");
            }

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

export default postCreateNews;

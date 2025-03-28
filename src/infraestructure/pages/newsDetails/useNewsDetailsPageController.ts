import { useParams } from "react-router";
import useNewsDetails from "../../hooks/getNewsById/useGetNewsById";

export const useNewsDetailsPageController = () => {
    const { id } = useParams<{ id: string }>();
    const newsId = id ? parseInt(id) : 0;

    const { news, isLoading, error } = useNewsDetails(newsId);

    return {
        news,
        isLoading,
        error,
        newsId
    };
};
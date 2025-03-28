import { useNavigate } from "react-router";
import useGetAllNews from "../../hooks/getNews/useGetAllNews";

export const useHomePageController = () => {
    const navigate = useNavigate();
    const { dataNews, isLoadingGetNews, errorGetNews } = useGetAllNews();

    return {
        dataNews,
        isLoadingGetNews,
        errorGetNews,
        navigate
    };
};
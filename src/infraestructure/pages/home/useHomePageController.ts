import { useNavigate } from "react-router";
import useGetAllNews from "../../hooks/getNews/useGetAllNews";

export const useHomePageController = () => {
    const navigate = useNavigate();
    const { dataNews, isLoadingGetNews, errorGetNews } = useGetAllNews();

    const mainNews = dataNews[0]
    const sideNews = dataNews.slice(1, 4)
    const bottomNews = dataNews.slice(4)

    return {
        dataNews,
        isLoadingGetNews,
        errorGetNews,
        navigate,
        mainNews,
        sideNews,
        bottomNews,
    };
};
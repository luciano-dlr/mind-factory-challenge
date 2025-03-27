import { useNavigate } from "react-router";
import { News } from "../../../domain/api/entities/types";


interface NewsCardProps {
    news: News;
}

export const NewsCard = ({ news }: NewsCardProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/news/${news.id}`);
    };

    return (
        <div className="block cursor-pointer" onClick={handleClick}>
            <div className="flex bg-gray-100 p-4 mb-4 rounded">
                <div className="flex-1">
                    <span className="text-red-700 uppercase font-medium text-sm">
                        {news.category}
                    </span>
                    <p className="text-sm font-medium">{news.title}</p>
                    <p className="text-xs text-gray-700 mt-1">{news.author}</p>
                </div>
                <div className="w-20 h-20 ml-2">
                    <img
                        src={news.image || "/placeholder.svg"}
                        alt={news.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

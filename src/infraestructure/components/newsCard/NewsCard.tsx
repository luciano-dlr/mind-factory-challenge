import { News } from "../../hooks/newsDetails/useNewsDetails";

interface NewsCardProps {
    news: News;
}

export const NewsCard = ({ news }: NewsCardProps) => {
    return (
        <div className="relative h-[460px] bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <img
                src={news.image || "/placeholder.svg"}
                alt={news.title}
                className="w-full h-fit object-cover"
            />
            <div className="p-4">
                <span className="text-red-600 uppercase text-xs font-bold tracking-wide">{news.category}</span>
                <h3 className="text-lg font-semibold mt-1 text-gray-900 line-clamp-2">{news.title}</h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">{news.subtitle}</p>
                <div className="flex items-center justify-between mt-4 text-gray-500 text-xs">
                    <p className="line-clamp-2 m-4">{news.description}</p>
                </div>
            </div>
        </div>
    );
};

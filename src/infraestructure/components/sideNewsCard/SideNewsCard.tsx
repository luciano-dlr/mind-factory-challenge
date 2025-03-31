import { News } from "../../hooks/newsDetails/useNewsDetails"

interface SideNewsCardProps {
    news: News
}

export const SideNewsCard = ({ news }: SideNewsCardProps) => {
    return (
        <div className="flex items-center gap-4 bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200 transition-shadow duration-300 overflow-hidden p-2">
            <img src={news.image || "/placeholder.svg"} alt={news.title} className="w-24 h-24 object-cover rounded" />
            <div className="flex-1">
                <span className="text-red-600 uppercase text-xs font-bold tracking-wide">{news.category}</span>
                <h3 className="text-sm font-semibold mt-1 text-gray-900 line-clamp-2">{news.title}</h3>
                <p className="text-gray-500 text-xs mt-1">Por {news.author}</p>
            </div>
        </div>
    )
}


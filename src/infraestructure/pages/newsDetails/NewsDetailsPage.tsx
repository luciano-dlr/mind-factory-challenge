import { useNewsDetailsPageController } from "./useNewsDetailsPageController";

export const NewsDetailsPage = () => {
    const { news, isLoading, error, newsId } = useNewsDetailsPageController();

    if (isLoading) return <h2>Cargando noticia...</h2>;
    if (error) return <h2>Error: {error}</h2>;
    if (!news) return <p className="text-center mt-8">No se encontró la noticia con ID: {newsId}</p>;

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold">{news.title}</h1>
            <p className="text-gray-700 mt-2">ID: {news.id}</p>
            <p className="text-gray-700">Autor: {news.author}</p>
            <img
                src={news.image || "/placeholder.svg"}
                alt={news.title}
                className="w-full max-h-96 object-cover my-4 rounded"
            />
            <p className="mt-4">{news.description}</p>
        </div>
    );
};
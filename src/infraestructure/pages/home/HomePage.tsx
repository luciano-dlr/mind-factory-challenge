import { NewsCard } from "../../components/newsCard/NewsCard"
import { useHomePageController } from "./useHomePageController"

export const HomePage = () => {

    const { dataNews, isLoadingGetNews, errorGetNews, navigate } = useHomePageController();

    if (isLoadingGetNews) return <h2>Cargando noticias...</h2>
    if (errorGetNews) return <h2>Error: {errorGetNews}</h2>

    return (
        <div >
            <h1 className="text-2xl font-bold text-center my-6">Noticias</h1>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dataNews.length === 0 ? (
                        <p>No hay noticias disponibles.</p>
                    ) : (
                        dataNews.map((news) => (
                            <button key={news.id} onClick={() => navigate(`/news/details/${news.id}`)} className="text-left w-full">
                                <NewsCard news={news} />
                            </button>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}


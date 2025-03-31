import { NewsCard } from "../../components/NewsCard/NewsSingleCard"
import { SideNewsCard } from "../../components/SideNewsCard/SideNewsSingleCard"
import { Skeleton } from "../../components/Skeleton/Skeleton"



import { Layout } from "../../layout/Layout"
import { useHomePageController } from "./useHomePageController"

export const HomePage = () => {

    const { dataNews, isLoadingGetNews, errorGetNews, navigate, mainNews, sideNews, bottomNews } = useHomePageController()


    if (isLoadingGetNews)
        return (
            <Layout>
                <Skeleton mainCard={true} sideCards={3} bottomCards={4} />
            </Layout>
        )

    if (errorGetNews) return <h2 className="text-center text-red-500 font-semibold mt-6">Error: {errorGetNews}</h2>

    if (!dataNews || dataNews.length === 0) {
        return (
            <Layout>
                <div className="container mx-auto px-4 my-24">
                    <p className="text-center text-gray-600">No hay noticias disponibles.</p>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 my-8">
                <div className="flex flex-col lg:flex-row gap-6">

                    <div className="lg:w-2/3">
                        <button onClick={() => navigate(`/news/details/${mainNews.id}`)} className="text-left w-full h-full">
                            <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                                <img
                                    src={mainNews.image || "/placeholder.svg"}
                                    alt={mainNews.title}
                                    className="w-full h-[400px] object-cover"
                                />
                                <div className="absolute bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6 w-full">
                                    <span className="text-red-500 uppercase font-semibold text-sm">{mainNews.category}</span>
                                    <h2 className="text-white text-3xl font-bold mt-1 line-clamp-2">{mainNews.title}</h2>
                                    <p className="text-gray-300 text-sm mt-1 line-clamp-2">{mainNews.subtitle}</p>
                                    <p className="text-gray-400 text-xs mt-2 line-clamp-2">Por {mainNews.author}</p>
                                </div>
                            </div>
                        </button>
                    </div>

                    <div className="lg:w-1/3 flex flex-col h-auto justify-between">
                        {sideNews.map((news) => (
                            <button key={news.id} onClick={() => navigate(`/news/details/${news.id}`)} className="text-left w-full">
                                <SideNewsCard news={news} />
                            </button>
                        ))}
                    </div>
                </div>


                {bottomNews.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {bottomNews.map((news) => (
                            <button key={news.id} onClick={() => navigate(`/news/details/${news.id}`)} className="text-left w-full">
                                <NewsCard news={news} />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    )
}



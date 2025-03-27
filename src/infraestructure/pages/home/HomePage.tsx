import { useNavigate } from "react-router"
import { NewsCard } from "../../components/newsCard/NewsCard"
import useGetAllNewsHook from "../../hooks/getNews/useGetAllNewsHook"
import { NavBar } from "../../components/navBar/NavBar"
import { CreateNewsForm } from "../../components/createNewsForm/CreateNewsForm"
import { useState } from "react"

export const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { dataNews, isLoadingGetNews, errorGetNews } = useGetAllNewsHook()
    const navigate = useNavigate()

    if (isLoadingGetNews) return <h2>Cargando noticias...</h2>
    if (errorGetNews) return <h2>Error: {errorGetNews}</h2>

    return (
        <>
            <NavBar onCreateNews={() => setIsModalOpen(true)} showEditDeleteActions={false} />
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
            {isModalOpen && <CreateNewsForm onClose={() => setIsModalOpen(false)} />}
        </>
    )
}


import { useState, useEffect } from "react"
import { FormPreview, NewData } from "../../components/FormPreview/FormPreview"
import { Layout } from "../../layout/Layout"
import { useParams, useNavigate } from "react-router"
import { useNewsStore } from "../../zustand/NewsStore"
import usePatchNews from "../../hooks/useUpdateNews/usePatchNews"

export const EditNewsPage = () => {
    const { id } = useParams<{ id: string }>()
    const newsId = id ? parseInt(id) : 0
    const navigate = useNavigate()
    const { getNewsById } = useNewsStore()
    const [initialData, setInitialData] = useState<NewData | null>(null)
    const { fetchPatchNews, isLoadingUpdatedNews, errorUpdatedNews } = usePatchNews(newsId)

    useEffect(() => {
        const news = getNewsById(newsId)
        if (news) {
            setInitialData({
                id: news.id,
                created_at: news.created_at,
                title: news.title,
                subtitle: news.subtitle,
                image: news.image,
                author: news.author,
                category: news.category,
                description: news.description
            })
        }
    }, [newsId, getNewsById])

    const handleSubmitEdit = async () => {
        try {
            const currentNews = getNewsById(newsId)
            if (!currentNews) return

            await fetchPatchNews({
                title: currentNews.title,
                subtitle: currentNews.subtitle,
                image: currentNews.image,
                description: currentNews.description,
                author: currentNews.author,
                category: currentNews.category
            })

            navigate(`/news/details/${newsId}`)
        } catch (error) {
            console.error("Error al actualizar la noticia:", error)
        }
    }

    if (!initialData) return <div>Cargando datos de la noticia...</div>

    return (
        <Layout>
            <FormPreview
                initialData={initialData}
                handlerSubmit={handleSubmitEdit}
                isEditMode={true}
                newsId={newsId}
            />
            {isLoadingUpdatedNews && <p>Actualizando noticia...</p>}
            {errorUpdatedNews && <p className="text-red-500">{errorUpdatedNews}</p>}
        </Layout>
    )
}
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
    const { fetchPatchNews, isLoadingUpdatedNews, errorUpdatedNews } = usePatchNews(newsId)
    const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);

    const [editNewsData, setEditNewsData] = useState<NewData>({
        title: '',
        subtitle: "",
        image: "",
        description: "",
        author: "",
        category: ""
    })

    useEffect(() => {
        const news = getNewsById(newsId)
        if (news) {
            setEditNewsData({
                id: news.id,
                created_at: news.created_at,
                title: news.title,
                subtitle: news.subtitle,
                image: news.image,
                author: news.author,
                category: news.category,
                description: news.description,
            })
        }
        setIsLoadingInitialData(false);
    }, [newsId, getNewsById])

    console.log('Soy edit data', editNewsData);


    const handleSubmitEdit = async () => {
        try {

            await fetchPatchNews({
                title: editNewsData.title,
                subtitle: editNewsData.subtitle,
                image: editNewsData.image,
                description: editNewsData.description || '',
                author: editNewsData.author,
                category: editNewsData.category
            })

            navigate(`/news/details/${newsId}`)
        } catch (error) {
            console.error("Error al actualizar la noticia:", error)
        }
    }

    if (isLoadingInitialData || !editNewsData) {
        return (
            <Layout>
                <h2>Cargando noticia...</h2>
            </Layout>
        );
    }

    return (
        <Layout>
            <FormPreview
                getter={editNewsData}
                setter={setEditNewsData}
                handlerSubmit={handleSubmitEdit}
            />
            {isLoadingUpdatedNews && <p>Actualizando noticia...</p>}
            {errorUpdatedNews && <p className="text-red-500">{errorUpdatedNews}</p>}
        </Layout>
    )
}
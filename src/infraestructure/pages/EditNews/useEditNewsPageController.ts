import { useNavigate, useParams } from "react-router"
import { useNewsStore } from "../../zustand/NewsStore"
import usePatchNews from "../../hooks/useUpdateNews/usePatchNews"
import { useEffect, useState } from "react"
import { Bounce, toast } from "react-toastify"
import { NewData } from "../../components/FormPreview/types"

export const useEditNewsPageController = () => {
    const { id } = useParams<{ id: string }>()
    const newsId = id ? parseInt(id) : 0
    const navigate = useNavigate()
    const { getNewsById } = useNewsStore()
    const { fetchPatchNews, isLoadingUpdatedNews, errorUpdatedNews } = usePatchNews(newsId)
    const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);

    const [editNewsData, setEditNewsData] = useState<NewData>({
        title: "",
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
            toast.success('Noticia Editada!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            navigate(`/news/details/${newsId}`)
        } catch (error) {
            console.error("Error al actualizar la noticia:", error)
        }
    }

    return {
        handleSubmitEdit, isLoadingInitialData, editNewsData, setEditNewsData, errorUpdatedNews, isLoadingUpdatedNews
    }
}

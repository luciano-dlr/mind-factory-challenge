import { useState } from 'react'
import postCreateNews from '../../hooks/postCreateNews/usePostCreateNews'
import { useNavigate } from 'react-router'
import { Bounce, toast } from 'react-toastify'
import { NewData } from '../../../domain/api/entity/type'

export const useCreateNewsPageController = () => {
    const { fetchCreatedNews, isLoadingCreatedNews, errorCreatedNews } = postCreateNews()
    const navigate = useNavigate()
    const [newData, setNewData] = useState<NewData>({
        title: "",
        subtitle: "",
        image: "",
        author: "",
        description: "",
        category: "",
    })

    const handleSubmitCreate = async () => {
        try {
            await fetchCreatedNews(newData)
            toast.success('Noticia Creada!', {
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
            navigate('/')
        } catch (error) {
            throw new Error("Error creating News");
        }
    }

    return {
        newData, setNewData, handleSubmitCreate, isLoadingCreatedNews, errorCreatedNews
    }
}

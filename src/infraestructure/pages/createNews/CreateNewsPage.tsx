import { useState } from "react"
import { FormPreview, NewData } from "../../components/FormPreview/FormPreview"
import { Layout } from "../../layout/Layout"
import postCreateNews from "../../hooks/postCreateNews/postCreateNews"
import { useNavigate } from "react-router"

export const CreateNewsPage = () => {
    const [newData, setNewData] = useState<NewData>({
        title: "",
        subtitle: "",
        image: "",
        author: "",
        description: "",
        category: "",
    })
    const { fetchCreatedNews, isLoadingCreatedNews, errorCreatedNews } = postCreateNews()

    const navigate = useNavigate()

    const handleSubmitCreate = async () => {
        console.log('soy newData', newData);
        try {
            await fetchCreatedNews(newData)
            navigate('/')
            console.log("Noticia creada exitosamente", newData)
        } catch (error) {
            console.error("Error al crear la noticia:", error)
        }
    }

    return (
        <Layout>
            <FormPreview
                getter={newData}
                setter={setNewData}
                handlerSubmit={handleSubmitCreate}
            />
            {isLoadingCreatedNews && <p>Creando noticia...</p>}
            {errorCreatedNews && <p className="text-red-500">{errorCreatedNews}</p>}
        </Layout>
    )
}
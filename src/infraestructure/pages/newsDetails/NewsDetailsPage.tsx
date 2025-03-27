import { data, useParams } from "react-router"
import useGetNewsByIdHook from "../../hooks/getNewsById/useGetNewsByIdHook"
import { NavBar } from "../../components/navBar/NavBar"

export const NewsDetailsPage = () => {

    const { id } = useParams<{ id: string }>()
    const { dataNewsById, isLoadingGetNewsById, errorGetNewsById } = useGetNewsByIdHook(Number(id))

    if (isLoadingGetNewsById) return <h2>Cargando noticia...</h2>
    if (errorGetNewsById) return <h2>Error: {errorGetNewsById}</h2>



    return (
        <>
            <NavBar
                onEditNews={() => console.log("Editar noticia")}
                onDeleteNews={() => console.log("Eliminar noticia")}
                showEditDeleteActions={true}
            />
            {dataNewsById ? (
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-2xl font-bold">{dataNewsById[0].title}</h1>
                    <p className="text-gray-700 mt-2">{dataNewsById[0].author}</p>
                    <img
                        src={dataNewsById[0].image || "/placeholder.svg"}
                        alt={dataNewsById[0].title}
                        className="w-full max-h-96 object-cover my-4 rounded"
                    />
                    <p className="mt-4">{dataNewsById[0].description}</p>
                </div>
            ) : (
                <p className="text-center mt-8">No se encontró la noticia.</p>
            )}
        </>
    )
}


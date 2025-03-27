import { useNavigate, useParams } from "react-router"
import useGetNewsByIdHook from "../../hooks/getNewsById/useGetNewsByIdHook"
import { NavBar } from "../../components/navBar/NavBar"
import useDeleteNewsHook from "../../hooks/deleteNews/useDeleteNewsHook"
import CustomModal from "../../components/customModal/CustomModal"
import { useState } from "react"

export const NewsDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>()
    const { dataNewsById, isLoadingGetNewsById, errorGetNewsById } = useGetNewsByIdHook(Number(id))
    const { fetchDeletedNews, isLoadingDeletedNews, errorDeletedNews, } = useDeleteNewsHook(Number(id));
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);

    const handleDeleteNews = async () => {
        await fetchDeletedNews();
        if (errorDeletedNews != null) {
            setIsModalErrorOpen(true);
        } else {
            navigate("/");
        }
    };

    if (isLoadingGetNewsById) return <h2>Cargando noticia...</h2>
    if (errorGetNewsById) return <h2>Error: {errorGetNewsById}</h2>

    return (
        <>
            <NavBar
                onEditNews={() => console.log("Editar noticia")}
                onDeleteNews={() => setIsModalDeleteOpen(true)}
                showEditDeleteActions={true}
            />
            {dataNewsById ? (
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-2xl font-bold">{dataNewsById[0].title}</h1>
                    <h1 className="text-2xl font-bold">{dataNewsById[0].id}</h1>
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

            <CustomModal
                visible={isModalDeleteOpen}
                title="Confirmar eliminación"
                message="¿Estás seguro de que deseas eliminar esta noticia?"
                onAccept={() => {
                    setIsModalDeleteOpen(false);
                    handleDeleteNews();
                }}
                onReject={() => setIsModalDeleteOpen(false)}
                acceptText={isLoadingDeletedNews ? "Eliminando..." : "Eliminar"}
                rejectText="Cancelar"
            />
            <CustomModal
                visible={isModalErrorOpen}
                title="Error al eliminar"
                message={errorDeletedNews || "Ocurrió un error inesperado al eliminar la noticia."}
                onAccept={() => setIsModalErrorOpen(false)}
                acceptText="Entendido"
            />
        </>
    )
}


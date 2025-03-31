import { useParams, useNavigate } from "react-router";
import useNewsDetails from "../../hooks/newsDetails/useNewsDetails";
import { useState } from "react";
import useDeleteNews from "../../hooks/deleteNews/useDeleteNews";
import { useNewsStore } from "../../zustand/NewsStore";
import { Bounce, toast } from "react-toastify";

export const useNewsDetailsPageController = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const newsId = id ? parseInt(id) : 0;
    const { news, isLoading, error } = useNewsDetails(newsId);
    const { deleteNews } = useDeleteNews();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const { deleteNews: deleteFromStore } = useNewsStore();

    const handleDeleteClick = () => {
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = async () => {
        setShowConfirmModal(false);
        const success = await deleteNews(newsId);
        if (success) {
            deleteFromStore(newsId);
            toast.success('Noticia Eliminada!', {
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
            navigate("/")
        } else {
            throw new Error("No se pudo eliminar la noticia");
        }
    };

    const handleCancelDelete = () => {
        setShowConfirmModal(false);
    };

    return {
        news,
        isLoading,
        error,
        newsId,
        showConfirmModal,
        handleConfirmDelete,
        handleCancelDelete,
        handleDeleteClick,
        navigate,
    };
};
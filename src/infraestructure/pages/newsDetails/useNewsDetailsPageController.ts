import { useParams, useNavigate } from "react-router";
import useNewsDetails from "../../hooks/newsDetails/useNewsDetails";
import { useState } from "react";
import useDeleteNews from "../../hooks/deleteNews/useDeleteNews";

export const useNewsDetailsPageController = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const newsId = id ? parseInt(id) : 0;
    const { news, isLoading, error } = useNewsDetails(newsId);
    const { deleteNews, isLoading: isDeleting, error: deleteError } = useDeleteNews();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleDeleteClick = () => {
        setShowConfirmModal(true);
    };
    const handleEditClick = () => {
        setShowEditModal(true);
    };

    const handleConfirmDelete = async () => {
        setShowConfirmModal(false);
        const success = await deleteNews(newsId);
        if (success) {
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
        isLoading: isLoading || isDeleting,
        error: error || deleteError,
        newsId,
        showConfirmModal,
        handleDeleteClick,
        handleConfirmDelete,
        handleCancelDelete,
        handleEditClick,
        showEditModal,
        setShowEditModal,
        showActions: !!news
    };
};
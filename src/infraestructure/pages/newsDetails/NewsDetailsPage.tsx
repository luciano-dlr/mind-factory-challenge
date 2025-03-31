
import { useNewsDetailsPageController } from "./useNewsDetailsPageController";
import { Layout } from "../../layout/Layout";
import { Skeleton } from "../../components/Skeleton/Skeleton";
import { CustomModal } from "../../components/CustomModal/CustomModalConfirm";

export const NewsDetailsPage = () => {

    const {
        news,
        isLoading,
        error,
        newsId,
        showConfirmModal,
        handleConfirmDelete,
        handleCancelDelete,
        handleDeleteClick,
        navigate
    } = useNewsDetailsPageController();

    if (isLoading) return <Skeleton mainCard={true} sideCards={0} bottomCards={2} />
    if (error) return <h2>Error: {error}</h2>;
    if (!news) return <p className="text-center mt-8">No se encontró la noticia con ID: {newsId}</p>;


    return (
        <Layout onDelete={handleDeleteClick}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                <div className="flex justify-between items-center mb-6">
                    <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
                        {news.category}
                    </span>
                    <span className="text-gray-500 text-sm">
                        {new Date(news.created_at!).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </span>
                </div>


                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                        {news.title}
                    </h1>
                    <h2 className="text-xl md:text-2xl text-gray-600 font-medium">
                        {news.subtitle}
                    </h2>
                </div>


                <div className="flex items-center mb-8">
                    <div className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                        <span className="text-gray-600 font-medium">
                            {news.author.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <span className="text-gray-700 font-medium">{news.author}</span>
                </div>


                <div className="mb-10">
                    <img
                        src={news.image || "/placeholder.svg"}
                        alt={news.title}
                        className="w-full h-auto max-h-[600px] object-cover rounded-xl shadow-lg"
                    />

                </div>

                <div className="prose prose-lg max-w-none text-gray-700">
                    {news.description?.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-6 leading-relaxed">
                            {paragraph}
                        </p>
                    ))}
                </div>


                <div className="mt-12 pt-8 border-t border-gray-200">
                    <button
                        onClick={() => navigate("/")}
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Volver a todas las noticias
                    </button>
                </div>
            </div>
            <CustomModal
                isOpen={showConfirmModal}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                title="Confirmar Eliminación"
                message="¿Estás seguro de que deseas eliminar esta noticia? Esta acción no se puede deshacer."
                type="confirm"
            />

        </Layout>
    );
};
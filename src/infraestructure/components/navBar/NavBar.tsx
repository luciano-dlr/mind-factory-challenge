import { Link } from "react-router";

interface NavbarProps {
    onCreateNews?: () => void;
    onEditNews?: () => void;
    onDeleteNews?: () => void;
    showEditDeleteActions?: boolean;
}

export const NavBar = ({ onCreateNews, onEditNews, onDeleteNews, showEditDeleteActions = false }: NavbarProps) => {
    return (
        <nav className="bg-red-700 text-white p-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">MFNews</Link>
            <div className="flex gap-2">
                {showEditDeleteActions ? (
                    <>
                        <button onClick={onEditNews} className="bg-white text-red-700 px-4 py-2 rounded hover:bg-gray-100">
                            Editar Noticia
                        </button>
                        <button onClick={onDeleteNews} className="bg-white text-red-700 px-4 py-2 rounded hover:bg-gray-100">
                            Eliminar Noticia
                        </button>
                    </>
                ) : (
                    <button onClick={onCreateNews} className="bg-white text-red-700 px-4 py-2 rounded hover:bg-gray-100">
                        Nueva Noticia
                    </button>
                )}
            </div>
        </nav>
    );
};

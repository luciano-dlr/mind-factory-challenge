import { Link, useLocation } from "react-router";

interface NavBarProps {
    onDelete?: () => void;
}

export const NavBar = ({ onDelete }: NavBarProps) => {
    const location = useLocation();
    const isDetailsPage = location.pathname.startsWith("/news/details/");


    return (
        <nav className="bg-red-700 text-white p-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">MFNews</Link>
            <div className="flex gap-2">
                {isDetailsPage ? (
                    <>
                        <Link to={`/news/edit/${location.pathname.split('/')[3]}`} className="bg-white text-red-700 px-4 py-2 rounded hover:bg-gray-100">
                            Editar Noticia
                        </Link>
                        <button
                            onClick={onDelete}
                            className="bg-white text-red-700 px-4 py-2 rounded hover:bg-gray-100">
                            Eliminar Noticia
                        </button>
                    </>
                ) : location.pathname === '/' ? (
                    <Link to="/news/create" className="bg-white text-red-700 px-4 py-2 rounded hover:bg-gray-100">
                        Nueva Noticia
                    </Link>
                ) : null}
            </div>
        </nav>
    );
};

import { NewsCard } from '../../components/newsCard/NewsCard';
import useGetAllNewsHook from '../../hooks/getNews/useGetAllNewsHook';

export const HomePage = () => {
    const { dataNews, isLoadingGetNews, errorGetNews } = useGetAllNewsHook();

    if (isLoadingGetNews) return <h2>Cargando noticias...</h2>;
    if (errorGetNews) return <h2>Error: {errorGetNews}</h2>;

    return (
        <>
            <h1>Noticias</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dataNews.length === 0 ? (
                    <p>No hay noticias disponibles.</p>
                ) : (
                    dataNews.map((news) => <button onClick={() => { }}>

                        <NewsCard key={news.id} news={news} />
                    </button>
                    )
                )}
            </div>
        </>
    );
};

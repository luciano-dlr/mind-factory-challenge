import "./App.css";
import useGetAllNewsHook from "./infraestructure/hooks/getNews/useGetAllNewsHook";

export const App = () => {
  const { dataNews, isLoadingGetNews, errorGetNews } = useGetAllNewsHook();

  if (isLoadingGetNews) return <h2>Cargando noticias...</h2>;
  if (errorGetNews) return <h2>Error: {errorGetNews}</h2>;

  return (
    <>
      <h1>Noticias</h1>
      <ul>
        {dataNews.length === 0 ? (
          <p>No hay noticias disponibles.</p>
        ) : (
          dataNews.map((item) => (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
              <img src={item.image} alt={item.title} width={200} />
            </li>
          ))
        )}
      </ul>
    </>
  );
};

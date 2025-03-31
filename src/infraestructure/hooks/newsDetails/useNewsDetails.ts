import { useEffect, useState } from "react";
import { useNewsStore } from "../../zustand/NewsStore";

export interface News {
    id: number;
    created_at: string;
    title: string;
    subtitle: string;
    image: string;
    description: string;
    author: string;
    category: string;
}

const useNewsDetails = (id: number) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { news, getNewsById } = useNewsStore();

    const [currentNews, setCurrentNews] = useState<News | null>(null);

    useEffect(() => {
        const fetchNewsDetails = () => {
            try {
                setIsLoading(true);
                setError(null);
                const foundNews = getNewsById(id);
                if (!foundNews) {
                    throw new Error("Noticia no encontrada");
                }
                setCurrentNews(foundNews);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error desconocido");
            } finally {
                setIsLoading(false);
            }
        };

        fetchNewsDetails();
    }, [id, news, getNewsById]);

    return {
        news: currentNews,
        isLoading,
        error
    };
};

export default useNewsDetails;
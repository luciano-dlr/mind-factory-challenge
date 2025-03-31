import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { News } from "../hooks/newsDetails/useNewsDetails";

interface NewsState {
    news: News[];
    setNews: (news: News[]) => void;
    updateNews: (id: number, updatedNews: Partial<News>) => void
    deleteNews: (id: number) => void;
    getNewsById: (id: number) => News | undefined;
}

export const useNewsStore = create<NewsState>()(
    persist(
        (set, get) => ({
            news: [],
            setNews: (news: News[]) => set({ news }),

            updateNews: (id: number, updatedNews: Partial<News>) => {
                set((state) => ({
                    news: state.news.map((item) =>
                        item.id === id ? { ...item, ...updatedNews } : item
                    )
                }))
            },

            deleteNews: (id: number) => {
                set((state) => ({
                    news: state.news.filter((item) => item.id !== id)
                }));
            },

            getNewsById: (id: number) => {
                return get().news.find((item) => item.id === id);
            }
        }),
        {
            name: "news-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
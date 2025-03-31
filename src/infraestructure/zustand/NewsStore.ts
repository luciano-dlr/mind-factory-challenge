import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NewData } from "../../domain/api/entity/type";

interface NewsState {
    news: NewData[];
    setNews: (news: NewData[]) => void;
    updateNews: (id: number, updatedNews: Partial<NewData>) => void
    deleteNews: (id: number) => void;
    getNewsById: (id: number) => NewData | undefined;
}

export const useNewsStore = create<NewsState>()(
    persist(
        (set, get) => ({
            news: [],
            setNews: (news: NewData[]) => set({ news }),

            updateNews: (id: number, updatedNews: Partial<NewData>) => {
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
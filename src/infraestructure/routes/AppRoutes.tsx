import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "../pages/home/HomePage";
import { NewsDetailsPage } from "../pages/newsDetails/NewsDetailsPage";
import { CreateNewsPage } from "../pages/createNews/CreateNewsPage";
import { EditsNewsPage } from "../pages/singleEditNews/EditNewsPage";



export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/news/details/:id" element={<NewsDetailsPage />} />
                <Route path="/news/create" element={<CreateNewsPage />} />
                <Route path="/news/edit/:id" element={<EditsNewsPage />} />
            </Routes>
        </BrowserRouter >
    );
};
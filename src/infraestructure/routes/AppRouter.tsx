import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "../pages/home/HomePage";
import { NewsDetailsPage } from "../pages/newsDetails/NewsDetailsPage";
import { CreateNewsPage } from "../pages/createNews/CreateNewsPage";
import { EditNewsPage } from "../pages/editNews/EditNewsPage";


export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/news/details/:id" element={<NewsDetailsPage />} />
                <Route path="/news/create" element={<CreateNewsPage />} />
                <Route path="/news/edit/:id" element={<EditNewsPage />} />
            </Routes>
        </BrowserRouter >
    );
};
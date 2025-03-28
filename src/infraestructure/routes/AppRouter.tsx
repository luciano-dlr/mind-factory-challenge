import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "../pages/home/HomePage";
import { NewsDetailsPage } from "../pages/newsDetails/NewsDetailsPage";
import { Layout } from "../layout/Layout";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/news/details/:id" element={<NewsDetailsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

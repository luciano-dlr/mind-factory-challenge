import { BrowserRouter, Route, Routes } from "react-router"
import { HomePage } from "../pages/home/HomePage"
import { NewsDetailsPage } from "../pages/newsDetails/NewsDetailsPage"



export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={< HomePage />} />
                {/* <Route path="/news/:id" element={<NewsDetailsPage />} /> */}
            </Routes>
        </BrowserRouter>
    )
}


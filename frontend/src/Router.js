import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Home from "./pages/home/Home";
import Welcome from "./pages/home/Welcome";
import Analysis from "./pages/analysis/Analysis";
import Search from "pages/search/Search";
import MyPage from "./pages/myPage/MyPage";
import SearchByTag from "pages/search/SearchByTag";
import SearchByNutrient from "pages/search/SearchByNutrient";
import SearchDetail from "pages/search/SearchDetail";
import TagResult from "pages/search/TagResult";
import NameResult from "pages/search/NameResult";
import NutrientResult from "pages/search/NutrientResult";

function Router() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/main" element={<Main />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/analysis" element={<Analysis />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/searchtag" element={<SearchByTag />} />
                    <Route path="/searchnutrient" element={<SearchByNutrient />} />
                    <Route path="/searchdetail" element={<SearchDetail />} />
                    <Route path="/tagresult" element={<TagResult />} />
                    <Route path="/result" element={<NameResult />} />
                    <Route path="/nutrientresult" element={<NutrientResult />} />
                    <Route path="/mypage" element={<MyPage />} />
                </Routes>
            </BrowserRouter>
        
    )
}

export default Router;
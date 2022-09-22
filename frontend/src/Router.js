import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Home from "./pages/home/Home";
import Welcome from "./pages/home/Welcome";
import Analysis from "./pages/analysis/Analysis";
import Search from "./pages/search/Search";
import MyPage from "./pages/myPage/MyPage";
import SearchDetail from "pages/search/SearchDetail";
import SearchResult from "pages/search/SearchResult";

function Router() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/main" element={<Main />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/analysis" element={<Analysis />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/search/detail" element={<SearchDetail />} />
                    <Route path="/search/result" element={<SearchResult />} />
                    <Route path="/mypage" element={<MyPage />} />
                </Routes>
            </BrowserRouter>
        
    )
}

export default Router;
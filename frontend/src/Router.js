import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Home from "./pages/home/Home";
import Welcome from "./pages/home/Welcome";
import Analysis from "./pages/analysis/Analysis";
import Search from "./pages/search/Search";
import MyPage from "./pages/myPage/MyPage";

function Router() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/main" element={<Main />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/analysis" element={<Analysis />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/mypage" element={<MyPage />} />
                </Routes>
            </BrowserRouter>
        
    )
}
 
export default Router;
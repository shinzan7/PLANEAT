import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Home from "./pages/home/Home";
import Welcome from "./pages/home/Welcome";
import Analysis from "./pages/analysis/Analysis";
import Search from "pages/search/Search";
import MyPage from "./pages/myPage/MyPage";
import LoginCheck from "pages/home/LoginCheck";
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
                    <Route path="/logincheck" element={<LoginCheck />} />
                    {/* <Route path="/logincheck/:accessToken/:refreshToken/:accessTokenExpiration/
                    :refreshTokenExpiration/:userId/:name/:birthYear/:gender" element={<Logincheck />} /> */}
                </Routes>
            </BrowserRouter>
        
    )
}

export default Router;

// logincheck?
// accessToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0b2tlbiIsInByb3ZpZGVyIjoiZ29vZ2xlIiwibmFtZSI6ImZyaWRheWhzIiwiZW1haWwiOiJ3anRrZGw5NkBnbWFpbC5jb20iLCJpYXQiOjE2NjQwOTYwODgsImV4cCI6MTY2NDA5NjY4OH0.D_cZHMaMmwRl5RVQrqLq5FoW1pyXCsjzd5kBWO_ENLs
// &refreshToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0b2tlbiIsInByb3ZpZGVyIjoiZ29vZ2xlIiwibmFtZSI6ImZyaWRheWhzIiwiZW1haWwiOiJ3anRrZGw5NkBnbWFpbC5jb20iLCJpYXQiOjE2NjQwOTYwODgsImV4cCI6MTY2NjY4ODA4OH0.Q898WgUPaj8OsD6AUg6meaRZEJj1E8ryNcrGne8m0xk
// &accessTokenExpiration=2022-09-25-18-04-48
// &refreshTokenExpiration=2022-10-25-17-54-48
// &userId=4
// &name=fridayhs
// &birthYear=

// &gender=
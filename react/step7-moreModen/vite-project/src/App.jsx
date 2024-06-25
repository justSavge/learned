import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
/* eslint-disable no-unused-vars */
import Form from "./components/Form";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import { AppContext } from "./context/AppContext";
import { Suspense, lazy } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";
// import Product from "./pages/Product";
// import AppLayout from "./pages/AppLayout";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import PageNotFound from "./pages/PageNotFound";
// import Login from "./pages/Login";
//一个优化的超级功能，懒加载，由于浏览器通过网址获得一个巨大的js包（由webpack,vite等工具打包而成的）来构建web网页，这个包很有可能很大，如果可以分裂获取，按需获取，获取以后集合会不会更好、

//这就引出了react提供的懒加载
const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <div>
      <AppContext>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="/product" element={<Product />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/app" element={<AppLayout />}>
                <Route index element={<Navigate to="cities" replace />} />
                {/* index,无需多言，进入app就显示,Navigate,自动导航,replace替换历史堆栈的当前元素 */}
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
              {/*正则表达式的*,匹配一切上文不存在的 */}
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AppContext>
    </div>
  );
}

export default App;

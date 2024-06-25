import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import LoadingWhenFetch from "./LoadingWhenFetch";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  // console.log(navigation);
  return (
    <div className="grid  h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <LoadingWhenFetch />}
      <Header />
      {/* <main>核心内容</main> */}
      <div className="overflow-y-scroll">
        <main className="mx-auto max-w-3xl md:max-w-[800px]">
          <Outlet />
        </main>
      </div>

      {/* 输出（createBrowserRouter下的）子组件，这里没有通过传入children参数的形式 */}
      <CartOverview />
    </div>
  );
}

export default AppLayout;

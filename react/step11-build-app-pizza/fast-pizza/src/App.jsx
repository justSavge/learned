import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import CreateUser from "./features/user/CreateUser";
import Menu, { loader as meauLoader } from "./features/meau/Menu";
import Cart from "./features/cart/Cart";
import Order, { loader as orderLoader } from "./features/order/Order";
import CreateOrder, {
  action as CreateOrderAction,
} from "./features/order/CreateOrder";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import { action as actionUpdateOrder } from "./features/order/UpdateOrderButton";

//6.4以后的形式，更加简洁可以方便的传递数据
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />, //只要在父级设置即可，下面错了会冒泡上来
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/user",
        element: <CreateUser />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: meauLoader, //在这里实现和在meau组件里实现由什么区别呢，在这里实现可以让数据与组件同一时间加载，反之则会出现数据瀑布流的现象也就是先出现组件后加载数据。在现代前端开发我们选择1
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: CreateOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        action: actionUpdateOrder,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

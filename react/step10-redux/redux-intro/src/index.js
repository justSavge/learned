import React from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import "./index.css";
// import './store';//会简单的运行再顶部，如同将store的代码放入到index.js
import store from "./store";
import { Provider } from "react-redux";
// store.dispatch({
//   type: "customer/createAccount",
//   payload: {
//     fullName: "tomson viker",
//     nationId: "213131",
//   },
// });
console.log(store.getState());
const root = ReactDom.createRoot(document.querySelector("#root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
//核心：为什么现在更多人选择useReaucer+contextAPI而非redux,因为这两个基本用来管理ui状态，ui状态几乎不会经常改变如语言，背景色，而远程状态不会使用他们管理
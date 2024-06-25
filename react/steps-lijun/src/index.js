import React from "react";
import ReactDom from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
//每一个组件（注意state）都是独立的,哪怕是同一个组件被重复使用。
//也可以说，每个ui都是state的函数
//换而言之，整个ui（界面）就是所有组件的当前state的表示。
//不要将组件视为一个dom对象，
//通过state，我们看到ui伴随着数据变换（全部时间）。
//我们描述数据的反应（反射？），使用state,event handers,jsx.

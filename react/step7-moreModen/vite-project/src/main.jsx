import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// 由于api leftlet 无法使用，哪怕是挂梯子也不能用？可以用一点。于是停止（快速通过）本章节
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

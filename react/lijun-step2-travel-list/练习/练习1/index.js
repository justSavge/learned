import React from "react";
import reactDom from "react-dom/client";
import App from "./App";

const root = reactDom.createRoot(document.querySelector("#root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

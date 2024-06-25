import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import App from "./App-test1";
// import SubmitStar from "./SubmitStar.js";
// import App from "./praticeUse";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <SubmitStar starNum={10} /> */}
  </React.StrictMode>
);

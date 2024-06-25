import React from "react";
import ReactDom from "react-dom/client";
import App from "./components/App";
// import App from "./components/challenge";
import "./index.css";
import { QuizContextProvider } from "./context/QuizContextChallenge";

const root = ReactDom.createRoot(document.querySelector("#root"));
root.render(
  <React.StrictMode>
    <QuizContextProvider>
      <App />
    </QuizContextProvider>
  </React.StrictMode>
);

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";

const root = createRoot(document.querySelector("#app"));
root.render(<App />);

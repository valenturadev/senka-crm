import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/css/app.css";
import { AuthProvider } from "./context/auth";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

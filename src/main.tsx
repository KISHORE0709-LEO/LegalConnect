import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./fix-google-translate.css";

createRoot(document.getElementById("root")!).render(<App />);

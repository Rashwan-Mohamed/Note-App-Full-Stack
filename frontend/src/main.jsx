import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import SignIn from "./pages/SignIn.jsx";
import Index from "./index.jsx";
import Register from "./pages/Register.jsx";
import {ProtectedRoute} from "./components/templatess/ProtectedRoute.jsx";


createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Index />}>
                <Route index element={<SignIn />} />
                <Route path="register" element={<Register />} />
                {/* Protected routes here */}
                <Route element={<ProtectedRoute />}>
                    <Route path="notes" element={<App />} />
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
);
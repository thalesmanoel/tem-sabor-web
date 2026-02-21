import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/unauth/Login/LoginPage";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

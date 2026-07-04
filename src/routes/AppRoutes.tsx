import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/unauth/Login/LoginPage";
import { RegisterPage } from "../pages/unauth/Register/RegisterPage";
import { Dashboard } from "../pages/auth/Dashboard/Dashboard";
import { Customers } from "../pages/auth/Customers/Customers";
import { Orders } from "../pages/auth/Orders/Orders";
import { Products } from "../pages/auth/Products/Products";
import { StockMovements } from "../pages/auth/StockMovements/StockMovements";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";
import { authStorage } from "../services/authStorage";

function protectedPage(page: React.ReactNode) {
  return <ProtectedRoute>{page}</ProtectedRoute>;
}

export function AppRoutes() {
  const initialRoute = authStorage.isAuthenticated() ? "/dashboard" : "/login";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={initialRoute} replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/dashboard" element={protectedPage(<Dashboard />)} />
        <Route path="/pedidos" element={protectedPage(<Orders />)} />
        <Route path="/clientes" element={protectedPage(<Customers />)} />
        <Route path="/produtos" element={protectedPage(<Products />)} />
        <Route
          path="/movimentacoes"
          element={protectedPage(<StockMovements />)}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

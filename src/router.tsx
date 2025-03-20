import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Admin } from "./pages/admin";
import { Networks } from "./pages/networks";
import { Login } from "./pages/login";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/social" element={<Networks />} />
    </Routes>
  );
};

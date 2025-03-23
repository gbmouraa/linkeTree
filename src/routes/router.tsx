import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home";
import { Admin } from "../pages/admin";
import { Networks } from "../pages/networks";
import { Login } from "../pages/login";
import { Private } from "./private";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <Private>
            <Admin />
          </Private>
        }
      />
      <Route
        path="/admin/social"
        element={
          <Private>
            <Networks />
          </Private>
        }
      />
    </Routes>
  );
};

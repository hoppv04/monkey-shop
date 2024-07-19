import { Route, Routes } from "react-router-dom";
import "./App.scss";
import AuthForm from "./components/AuthForm";
import LayoutAdmin from "./components/LayoutAdmin";
import LayoutClient from "./components/LayoutClient";
import ProductForm from "./components/ProductForm";
import Dashboard from "./pages/admin/Dashboard";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<AuthForm isLogin />} />
        <Route path="/register" element={<AuthForm />} />

        <Route path="/" element={<LayoutClient />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="/admin/product-form" element={<ProductForm />} />
          <Route path="/admin/product-form/:id" element={<ProductForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

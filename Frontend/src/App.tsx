import { Route, Routes } from "react-router-dom";
import "./App.scss";
import AuthForm from "./components/AuthForm";
import LayoutAdmin from "./components/LayoutAdmin";
import LayoutClient from "./components/LayoutClient";
import ProductForm from "./components/ProductForm";
import Dashboard from "./pages/admin/Dashboard";
import Home from "./pages/Home";
import CategoryList from "./components/CategoryList";
import CategoryForm from "./components/CategoryForm";

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
          <Route path="/admin/product-add" element={<ProductForm />} />
          <Route path="/admin/product-update/:id" element={<ProductForm />} />

          <Route path="/admin/categories" element={<CategoryList />} />
          <Route path="/admin/category-add" element={<CategoryForm />} />
          <Route path="/admin/category-update/:id" element={<CategoryForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

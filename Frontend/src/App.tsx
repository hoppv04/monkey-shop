import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import instance from "./apis";
import "./App.scss";
import LayoutAdmin from "./components/LayoutAdmin";
import LayoutClient from "./components/LayoutClient";
import { ProductI } from "./interfaces/Product";
import Dashboard from "./pages/admin/Dashboard";
import Home from "./pages/Home";
import ProductForm from "./components/ProductForm";
import AuthForm from "./components/AuthForm";

function App() {
  const [products, setProducts] = useState<ProductI[]>([] as ProductI[]);

  const fetchAllProducts = async () => {
    try {
      const { data } = await instance.get("products");
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const nav = useNavigate();

  const handleSubmitProduct = async (data: ProductI) => {
    if (data._id) {
      await instance.patch(`products/${data._id}`, { ...data, _id: undefined });
      fetchAllProducts();
    } else {
      const { data: newProduct } = await instance.post("products", data);
      setProducts([...products, newProduct.data]);
    }
    if (confirm("Action successfully, redirect to admin page?")) {
      nav("/admin");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      if (confirm("Delete?")) {
        await instance.delete(`products/${id}`);
        setProducts(products.filter((product) => product._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={<AuthForm isLogin />} />
        <Route path="/register" element={<AuthForm />} />

        <Route path="/" element={<LayoutClient />}>
          <Route index element={<Home products={products} />} />
        </Route>

        <Route path="/admin" element={<LayoutAdmin />}>
          <Route
            index
            element={
              <Dashboard
                products={products}
                handleDeleteProduct={handleDeleteProduct}
              />
            }
          />
          <Route
            path="/admin/product-form"
            element={<ProductForm handleSubmitProduct={handleSubmitProduct} />}
          />
          <Route
            path="/admin/product-form/:id"
            element={<ProductForm handleSubmitProduct={handleSubmitProduct} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;

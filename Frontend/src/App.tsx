import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import { ProductI } from "./interfaces/Product";
import Dashboard from "./pages/admin/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import instance from "./apis";
import ProductForm from "./pages/admin/ProductForm";
import Home from "./pages/Home";

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
      await instance.patch(`products/${data._id}`, data);
    } else {
      await instance.post("products", data);
    }
    fetchAllProducts();
    nav("/admin");
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      if (confirm("Delete?")) {
        await instance.delete(`products/${id}`);
        fetchAllProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/login" element={<div>Login</div>} />
          <Route path="/register" element={<div>Register</div>} />

          <Route index element={<Home products={products} />} />

          <Route
            path="/admin"
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
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;

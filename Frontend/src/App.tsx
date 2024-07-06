import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { ProductI } from "./interfaces/Product";
import Dashboard from "./pages/admin/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [products, setProducts] = useState<ProductI[]>([] as ProductI[]);

  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route index element={<div>Home</div>} />
          <Route path="/login" element={<div>Login</div>} />
          <Route path="/register" element={<div>Register</div>} />

          <Route path="/admin" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;

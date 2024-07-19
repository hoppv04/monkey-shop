/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useReducer } from "react";
import { ProductI } from "../interfaces/Product";
import productReducer from "../reducers/productReducer";
import { useNavigate } from "react-router-dom";
import instance from "../apis";

export type ProductContextType = {
  state: { products: ProductI[] };
  dispatch: React.Dispatch<any>;
  handleRemoveProduct: (id: string | undefined) => void;
  handleSubmitProduct: (data: ProductI) => void;
};

export const ProductContext = createContext({} as ProductContextType);

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, { products: [] });
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get(`products`);
        dispatch({ type: "GET_PRODUCTS", payload: data.data });
      } catch (error: any) {
        console.log(error);
      }
    })();
  }, []);

  const handleRemoveProduct = async (id: string | undefined) => {
    try {
      if (confirm("Delete?")) {
        await instance.delete(`products/${id}`);
        dispatch({ type: "REMOVE_PRODUCT", payload: id });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitProduct = async (product: ProductI) => {
    try {
      if (product._id) {
        const { data } = await instance.patch(`products/${product._id}`, {
          ...product,
          _id: undefined,
        });
        dispatch({ type: "UPDATE_PRODUCT", payload: data.data });
        alert(data.message);
      } else {
        const { data } = await instance.post("products", product);
        dispatch({ type: "ADD_PRODUCT", payload: data.data });
        alert(data.message);
      }
      if (confirm("Action successfully, redirect to admin page?")) {
        nav("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{ state, dispatch, handleRemoveProduct, handleSubmitProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

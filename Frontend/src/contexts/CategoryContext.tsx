import { createContext, useEffect, useReducer } from "react";
import categoryReducer from "../reducers/categoryReducer";
import { CategoryI } from "../interfaces/Category";
import { useNavigate } from "react-router-dom";
import instance from "../apis";
import { AxiosError } from "axios";

export type CategoryContextType = {
  categories: CategoryI[];
  handleDeleteCategory: (id?: string) => void;
  handleSubmitCategory: (data: CategoryI) => void;
};

export const CategoryContext = createContext({} as CategoryContextType);

const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, dispatch] = useReducer(categoryReducer, [] as CategoryI[]);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get(`categories`);
        dispatch({ type: "GET_CATEGORIES", payload: data.data });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleDeleteCategory = async (id?: string) => {
    try {
      if (confirm("Delete?")) {
        await instance.delete(`categories/${id}`);
        dispatch({ type: "REMOVE_CATEGORY", payload: id });
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message || "Error!");
      }
    }
  };

  const handleSubmitCategory = async (categoryData: CategoryI) => {
    try {
      if (categoryData._id) {
        const { data } = await instance.patch(
          `/categories/${categoryData._id}`,
          {
            ...categoryData,
            _id: undefined,
          }
        );
        dispatch({ type: "UPDATE_CATEGORY", payload: data.data });
        alert(data?.message);
      } else {
        const { data } = await instance.post(`/categories`, categoryData);
        dispatch({ type: "ADD_CATEGORY", payload: data.data });
        alert(data?.message);
      }
      nav("/admin/categories");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CategoryContext.Provider
      value={{ categories, handleDeleteCategory, handleSubmitCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;

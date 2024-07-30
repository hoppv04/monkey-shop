import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import instance from "../apis";
import { ProductContext } from "../contexts/ProductContext";
import { ProductI } from "../interfaces/Product";
import { productSchema } from "../utils/validation";
import { CategoryContext } from "../contexts/CategoryContext";

const ProductForm = () => {
  const { handleSubmitProduct } = useContext(ProductContext);
  const { categories } = useContext(CategoryContext);
  const [categorySelected, setCategorySelected] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductI>({
    resolver: zodResolver(productSchema),
  });

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const { data } = await instance.get(`products/${id}`);
          if (data) {
            setCategorySelected(data?.data?.category?._id);
            reset(data.data);
          } else {
            setCategorySelected("669e4b8525596512d2d0ceec");
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [id, reset]);

  // console.log(categorySelected);

  return (
    <div className="container d-flex justify-content-center p-4">
      <form
        className="w-50 border p-4 rounded shadow-sm"
        onSubmit={handleSubmit((data) =>
          handleSubmitProduct({ ...data, _id: id })
        )}
      >
        <h2 className="text-center">{id ? "Update" : "Add"} Product</h2>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            {...register("title", { required: true })}
          />
          {errors?.title && (
            <p className="text-danger">{errors?.title?.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            id="price"
            className="form-control"
            {...register("price", { required: true, valueAsNumber: true })}
          />
          {errors?.price && (
            <p className="text-danger">{errors?.price?.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select {...register("category")} className="form-control">
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            rows={4}
            id="description"
            className="form-control"
            {...register("description")}
          />
        </div>
        <button className="btn btn-primary w-100">
          {id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;

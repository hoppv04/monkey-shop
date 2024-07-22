import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import instance from "../apis";
import { CategoryContext } from "../contexts/CategoryContext";
import { CategoryI } from "../interfaces/Category";
import { categorySchema } from "../utils/validation";

const CategoryForm = () => {
  const { handleSubmitCategory } = useContext(CategoryContext);

  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryI>({
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const { data } = await instance.get(`/categories/${id}`);
          reset(data.data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [id, reset]);

  return (
    <div className="container d-flex justify-content-center p-4">
      <form
        className="w-50 border p-4 rounded shadow-sm"
        onSubmit={handleSubmit((data) =>
          handleSubmitCategory({ ...data, _id: id })
        )}
      >
        <h2 className="text-center">{id ? "Update" : "Add"} Category</h2>
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

export default CategoryForm;

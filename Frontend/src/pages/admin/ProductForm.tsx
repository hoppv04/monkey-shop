import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ProductI } from "../../interfaces/Product";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../../utils/productSchema";
import { useEffect } from "react";
import instance from "../../apis";

type Props = {
  handleSubmitProduct: (data: ProductI) => void;
};

const ProductForm = ({ handleSubmitProduct }: Props) => {
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
          reset(data.data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [id, reset]);

  return (
    <div className="container d-flex justify-content-center">
      <form
        className="w-50"
        onSubmit={handleSubmit((data) =>
          handleSubmitProduct({ ...data, _id: id })
        )}
      >
        <h2 className="text-center">{id ? "Update" : "Add"} product</h2>
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

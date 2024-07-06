import { Link } from "react-router-dom";
import { ProductI } from "../../interfaces/Product";

type Props = {
  products: ProductI[];
  handleDeleteProduct: (id: string) => void;
};

const Dashboard = ({ products, handleDeleteProduct }: Props) => {
  return (
    <>
      <h2>Hello Admin</h2>
      <Link to={`/admin/product-form`} className="btn btn-primary mb-3">
        + Add a product
      </Link>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Thumbnail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <th>{index + 1}</th>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                <img src={product.thumbnail} alt={product.title} width={120} />
              </td>
              <td>
                <Link
                  to={`/admin/product-form/${product._id}`}
                  className="btn btn-warning me-2"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDeleteProduct(product._id!)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Dashboard;

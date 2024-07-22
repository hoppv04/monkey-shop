import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import {
  ProductContext,
  ProductContextType,
} from "../../contexts/ProductContext";
import { ProductI } from "../../interfaces/Product";

const Dashboard = () => {
  const { state, handleRemoveProduct } = useContext(
    ProductContext
  ) as ProductContextType;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage: number = 10;
  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentListOfItems: ProductI[] = state.products.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  return (
    <>
      <Link to={`/admin/product-add`} className="btn btn-primary mb-3">
        + Add a product
      </Link>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Thumbnail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentListOfItems.map((product, index) => (
            <tr key={product._id}>
              <th>{index + 1}</th>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.category?.title}</td>
              <td>{product.description}</td>
              <td>
                <img src={product.thumbnail} alt={product.title} width={120} />
              </td>
              <td>
                <Link
                  to={`/admin/product-update/${product._id}`}
                  className="btn btn-warning me-2"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleRemoveProduct(product._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(state.products.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Dashboard;

import { useContext } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from "../contexts/CategoryContext";

const CategoryList = () => {
  const { categories, handleDeleteCategory } = useContext(CategoryContext);

  return (
    <>
      <Link to={`/admin/category-add`} className="btn btn-secondary mb-2">
        Add category
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories?.length > 0
            ? categories.map((category) => (
                <tr key={category._id}>
                  <th>{category._id}</th>
                  <td>{category.title}</td>
                  <td>{category.description}</td>
                  <td>
                    <Link
                      to={`/admin/category-update/${category._id}`}
                      className="btn btn-warning me-2"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDeleteCategory(category._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </>
  );
};

export default CategoryList;

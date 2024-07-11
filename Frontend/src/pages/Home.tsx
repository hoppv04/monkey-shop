import { useState } from "react";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import { ProductI } from "../interfaces/Product";

type Props = {
  products: ProductI[];
};

const Home = ({ products }: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage: number = 12;
  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentListOfItems: ProductI[] = products.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  return (
    <>
      <div className="row row-cols-1 row-cols-md-4 g-4 mb-4">
        {currentListOfItems.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(products.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Home;

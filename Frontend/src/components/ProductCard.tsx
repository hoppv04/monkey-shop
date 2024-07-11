import { ProductI } from "../interfaces/Product";

type Props = {
  product: ProductI;
};

const ProductCard = ({ product }: Props) => {
  return (
    <div>
      <div className="col">
        <div className="card h-100">
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">{product.price}$</p>
            <button className="btn btn-primary w-100">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

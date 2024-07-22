/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductI } from "../interfaces/Product";

type State = {
  products: ProductI[];
};

type GetProductsAction = {
  type: "GET_PRODUCTS";
  payload: ProductI[];
};

type AddProductAction = {
  type: "ADD_PRODUCT";
  payload: ProductI;
};

type UpdateProductAction = {
  type: "UPDATE_PRODUCT";
  payload: ProductI;
};

type RemoveProductAction = {
  type: "REMOVE_PRODUCT";
  payload?: string;
};

type Action =
  | GetProductsAction
  | AddProductAction
  | UpdateProductAction
  | RemoveProductAction;

const productReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
      };

    case "REMOVE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default productReducer;

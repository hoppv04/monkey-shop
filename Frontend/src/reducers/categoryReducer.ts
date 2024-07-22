import { CategoryI } from "../interfaces/Category";

type State = CategoryI[];

type GetCategoriesAction = {
  type: "GET_CATEGORIES";
  payload: CategoryI[];
};

type AddCategoryAction = {
  type: "ADD_CATEGORY";
  payload: CategoryI;
};

type UpdateCategoryAction = {
  type: "UPDATE_CATEGORY";
  payload: CategoryI;
};

type RemoveCategoryAction = {
  type: "REMOVE_CATEGORY";
  payload?: string;
};

type Action =
  | GetCategoriesAction
  | AddCategoryAction
  | UpdateCategoryAction
  | RemoveCategoryAction;

const categoryReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "GET_CATEGORIES":
      return action.payload;
    case "ADD_CATEGORY":
      return [...state, action.payload];
    case "UPDATE_CATEGORY":
      return state.map((category) =>
        category._id === action.payload._id ? action.payload : category
      );
    case "REMOVE_CATEGORY":
      return state.filter((category) => category._id !== action.payload);
    default:
      return state;
  }
};

export default categoryReducer;

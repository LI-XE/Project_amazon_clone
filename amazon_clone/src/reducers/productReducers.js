import {
  PRODUCT_CATEGORY_FAIL,
  PRODUCT_CATEGORY_REQUEST,
  PRODUCT_CATEGORY_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_ADMIN_FAIL,
  PRODUCT_LIST_ADMIN_REQUEST,
  PRODUCT_LIST_ADMIN_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_RESET,
  PRODUCT_REVIEW_CREATE_SUCCESS,
} from "../types/productTypes";

export const productListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };

    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };

    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const categoryListReducer = (
  state = { loading: true, categories: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_REQUEST:
      return { loading: true };

    case PRODUCT_CATEGORY_SUCCESS:
      return { loading: false, categories: action.payload };

    case PRODUCT_CATEGORY_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const reviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_CREATE_REQUEST:
      return { loading: true };

    case PRODUCT_REVIEW_CREATE_SUCCESS:
      return { loading: false, review: action.payload };

    case PRODUCT_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case PRODUCT_REVIEW_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: {}, payload: true },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };

    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };

    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productListAdminReducer = (
  state = { loading: true, error: "" },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_ADMIN_REQUEST:
      return { ...state, loading: true };

    case PRODUCT_LIST_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        countProducts: action.payload.countProducts,
        page: action.payload.page,
        pages: action.payload.pages,
      };

    case PRODUCT_LIST_ADMIN_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };

    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, product: action.payload };

    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

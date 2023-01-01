import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { listCategories } from "../actions/productActions";
import { listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";

function SearchScreen(props) {
  const [listOpen, setListOpen] = useState(true);
  const { name = "all", category = "all" } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const listCategory = useSelector((state) => state.categoryList);
  const {
    loading: loadingCategory,
    error: errorCategory,
    categories,
  } = listCategory;
  console.log(listCategory);
  console.log(name);
  useEffect(() => {
    dispatch(
      listProducts({
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
      })
    );
    dispatch(listCategories());
  }, [dispatch, name, category]);

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    return `/search/category/${filterCategory}/name/${filterName}`;
  };
  return (
    <div className="search_screen">
      <div className="row">
        <div className="left">
          <h2>Filters</h2>
          <div className="row top" onClick={() => setListOpen(!listOpen)}>
            {listOpen ? (
              <i className="fa fa-chevron-down" />
            ) : (
              <i className="fa fa-chevron-up" />
            )}

            <h3>Categories</h3>
          </div>

          {loadingCategory ? (
            <LoadingBox />
          ) : errorCategory ? (
            <MessageBox variant="danger">{errorCategory}</MessageBox>
          ) : (
            <ul>
              {listOpen &&
                categories?.map((cate) => (
                  <li key={cate._id}>
                    <Link
                      to={getFilterUrl({ category: cate })}
                      className={cate === category ? "active" : ""}
                    >
                      {cate}
                    </Link>
                  </li>
                ))}
            </ul>
          )}
        </div>
        <div className="right">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products?.length === 0 ? (
                <MessageBox>No Product Found</MessageBox>
              ) : (
                <>
                  <div className="row results">
                    <h2>Results </h2>
                    <div>
                      <strong>{products?.length} items </strong>
                    </div>
                  </div>
                  <div className="row center">
                    {products?.map((product) => (
                      <Product key={product._id} product={product} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchScreen;

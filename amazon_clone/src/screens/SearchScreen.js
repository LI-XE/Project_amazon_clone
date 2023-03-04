import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { listCategories } from "../actions/productActions";
import { listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import Rating from "../components/Rating";
import { prices } from "../utils";
import { ratings } from "../utils";

function SearchScreen(props) {
  const [listOpen, setListOpen] = useState(true);
  const [priceListOpen, setPriceListOpen] = useState(true);
  const [ratingListOpen, setRatingListOpen] = useState(true);
  const {
    name = "all",
    category = "all",
    min = 0,
    max = 0,
    rating = 0,
    order = "newest",
    pageNum = 1,
  } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;
  const listCategory = useSelector((state) => state.categoryList);
  const {
    loading: loadingCategory,
    error: errorCategory,
    categories,
  } = listCategory;
  console.log(categories);
  // console.log(name);
  useEffect(() => {
    dispatch(
      listProducts({
        pageNum,
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        min,
        max,
        rating,
        order,
      })
    );
    dispatch(listCategories());
  }, [dispatch, name, category, min, max, rating, order, pageNum]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNum;
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNum/${filterPage}`;
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
          <div>
            {loadingCategory ? (
              <LoadingBox />
            ) : errorCategory ? (
              <MessageBox variant="danger">{errorCategory}</MessageBox>
            ) : (
              <ul>
                {listOpen && (
                  <li>
                    <Link
                      to={getFilterUrl({ category: "all" })}
                      className={"all" === category ? "active" : ""}
                    >
                      All
                    </Link>
                  </li>
                )}
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
          <div
            className="row top"
            onClick={() => setPriceListOpen(!priceListOpen)}
          >
            {priceListOpen ? (
              <i className="fa fa-chevron-down" />
            ) : (
              <i className="fa fa-chevron-up" />
            )}
            <h3>Price</h3>
          </div>
          <ul>
            {priceListOpen &&
              prices?.map((p) => (
                <li key={p.name}>
                  <Link
                    to={getFilterUrl({ min: p.min, max: p.max })}
                    className={
                      `${p.min} - ${p.max}` === `${min} - ${max}`
                        ? "active"
                        : ""
                    }
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
          </ul>
          <div
            className="row top"
            onClick={() => setRatingListOpen(!ratingListOpen)}
          >
            {ratingListOpen ? (
              <i className="fa fa-chevron-down" />
            ) : (
              <i className="fa fa-chevron-up" />
            )}
            <h3>Avg. Customer Review</h3>
          </div>
          <ul>
            {ratingListOpen &&
              ratings?.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    className={
                      r.rating === rating ? "active" : "" ? "active" : ""
                    }
                  >
                    <Rating caption={" & up "} rating={r.rating} />
                  </Link>
                </li>
              ))}
          </ul>
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
                    <h2>Results: ( {products?.length} items )</h2>
                    <div>
                      Sort by{" "}
                      <select
                        value={order}
                        onChange={(e) => {
                          navigate(getFilterUrl({ order: e.target.value }));
                        }}
                      >
                        <option value="newest">Newest Arrivals</option>
                        <option value="lowest">Price: Low to High</option>
                        <option value="highest">Price: High to Low</option>
                        <option value="toprated">Avg. Customer Reviews</option>
                      </select>
                    </div>
                  </div>
                  <div className="row center">
                    {products?.map((product) => (
                      <Product key={product._id} product={product} />
                    ))}
                  </div>
                  <div className="row center pagination">
                    {[...Array(pages).keys()].map((x) => (
                      <Link className={x+1 === page ? "active" : ""} key={x + 1} to={getFilterUrl({ page: x + 1 })}>
                        {x + 1}
                      </Link>
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

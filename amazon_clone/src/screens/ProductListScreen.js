import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { productListAdmin } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function ProductListScreen() {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sp = new URLSearchParams(search);
  const page = sp.get("page") || 1;
  const productLists = useSelector((state) => state.adminProductList);
  const { loading, error, products, countProducts, pages } = productLists;

  useEffect(() => {
    dispatch(productListAdmin(page));
  }, [dispatch, page]);

  console.log(countProducts, pages);

  const buttonHandler = () => {
    if (window.confirm("Are you sure to create?")) {
      navigate("/admin/products/create");
    }
  };

  // const editHandler = (product) => {
  //   navigate(`/products/${product._id}/edit`);
  // };

  return (
    <div className="row1 adminProducts">
      <div>
        <h1>Products</h1>
      </div>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="creatingbtn">
            <button
              type="submit"
              className="create button"
              onClick={buttonHandler}
            >
              Create Product
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <Link to={`/product/${product._id}`}>{product._id}</Link>
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td className="action">
                    <Link to={`/admin/products/${product._id}/edit`}>
                    <button
                      type="submit"
                      className="button primary"
                      // onClick={() =>
                      //   navigate(`/admin/products/${product._id}/edit`)
                      // }
                    >
                      <i className="fa fa-edit"></i>
                    </button>
                    </Link>
                    <Link to={`/products/${product._id}/edit`}>
                      <button type="submit" className="button red">
                        <i className="fa fa-trash-o"></i>
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pages">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === Number(page) ? "btn text-bold" : " btn"}
                key={x + 1}
                to={`/admin/products?page=${x + 1}`}
              >
                {x + 1}{" "}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ProductListScreen;

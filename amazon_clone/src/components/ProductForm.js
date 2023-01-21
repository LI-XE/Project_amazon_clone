import React from "react";

function ProductForm({
  product,
  setProduct,
  submitHandler,
  submitButtonLabel,
  productId,
}) {
  const inputChange = (e) => {
    let newProduct = { ...product };
    newProduct[e.target.id] = e.target.value;
    setProduct(newProduct);
  };

  console.log(product);

  return (
    <div className="createProduct row1">
      <h1>{productId ? "Edit Product Page" : "Create Product Page"}</h1>

      <form className="form" onSubmit={submitHandler}>
        <h2>{productId ? `Product ( ${productId} )` : ""}</h2>
        <div>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter product name"
            value={product.name}
            required
            onChange={(e) => inputChange(e)}
          ></input>
        </div>
        <div>
          <label htmlFor="brand">Brand Name</label>
          <input
            type="text"
            id="brand"
            placeholder="Enter brand name"
            required
            value={product.brand}
            onChange={(e) => inputChange(e)}
          ></input>
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            placeholder="Enter category name"
            value={product.category}
            required
            onChange={(e) => inputChange(e)}
          ></input>
        </div>
        <div>
          <label htmlFor="description">Descripion</label>
          <input
            type="textarea"
            id="description"
            placeholder="Enter description"
            value={product.description}
            required
            onChange={(e) => inputChange(e)}
          ></input>
        </div>
        <div className="inline">
          <label htmlFor="price">price:</label>
          <span>
            $
            <input
              type="number"
              id="price"
              min="0.00"
              max="10000.00"
              step="0.01"
              value={product.price}
              placeholder="00.00"
              onChange={(e) => inputChange(e)}
            ></input>
          </span>
        </div>
        <div className="inline">
          <label htmlFor="countInStock">Count In Stock:</label>
          <input
            type="number"
            min="0"
            id="countInStock"
            placeholder="Enter countInStock"
            value={product.countInStock}
            required
            onChange={(e) => inputChange(e)}
          ></input>
        </div>

        <div>
          <button className="primary" type="submit">
            {submitButtonLabel}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;

import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import LoadingBox from "./LoadingBox";
import MessageBox from "./LoadingBox";

function ProductForm({
  product,
  setProduct,
  submitHandler,
  submitButtonLabel,
  productId,
}) {
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const newProduct = { ...product };

  const inputChange = (e) => {
    if (product) {
      newProduct[e.target.id] = e.target.value;
      console.log(newProduct);
      setProduct(newProduct);
    }
  };

  const uploadFileHandler = (e, product) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    const fileName = Date.now() + file.name;

    bodyFormData.append("name", fileName);
    bodyFormData.append("file", file);
    setLoadingUpload(true);

    try {
      axios
        .post("/uploads/s3", bodyFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userInfo.token}`,
          },
        })
        .then((res) => {
          newProduct.image = res.data;
          console.log(res.data);
          setProduct(newProduct);
        })
        .catch((err) => {
          console.log(err);
        });
      setLoadingUpload(false);
    } catch (err) {
      setErrorUpload(err.message);
      setLoadingUpload(false);
    }
  };

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
          <label htmlFor="image">Image</label>
          <input
            type="text"
            id="image"
            placeholder="Enter image name"
            value={product.image}
            onChange={(e) => inputChange(e)}
          ></input>
        </div>
        <div>
          <label htmlFor="imageFile">Image File</label>
          <input
            type="file"
            id="imageFile"
            name="file"
            accept=".png, .jpeg, .jpg, webp"
            // label="Choose Image"
            onChange={uploadFileHandler}
          ></input>
          {loadingUpload && <LoadingBox></LoadingBox>}
          {errorUpload && <MessageBox>{errorUpload}</MessageBox>}
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

// import axios from "axios";
// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import LoadingBox from "./LoadingBox";
// import MessageBox from "./LoadingBox";

// function ProductForm({
//   product,
//   setProduct,
//   nameInitial,
//   brandInitial,
//   categoryInitial,
//   priceInitial,
//   countInStockInitial,
//   descriptionInitial,
//   imageInitial,
//   submitHandler,
//   submitButtonLabel,
//   productId,
// }) {
//   const [loadingUpload, setLoadingUpload] = useState(false);
//   const [errorUpload, setErrorUpload] = useState(false);
//   const userSignin = useSelector((state) => state.userSignin);
//   const { userInfo } = userSignin;

//   const [name, setName] = useState(nameInitial);
//   const [description, setDescription] = useState(descriptionInitial);
//   const [category, setCategory] = useState(categoryInitial);
//   const [image, setImage] = useState(imageInitial);
//   const [price, setPrice] = useState(priceInitial);
//   const [countInStock, setCountInStock] = useState(countInStockInitial);
//   const [brand, setBrand] = useState(brandInitial);

//   // const inputChange = (e) => {
//   //   if (product) {
//   //     let newProduct = { ...product };
//   //     newProduct[e.target.id] = e.target.value;
//   //     console.log(newProduct);
//   //     setProduct(newProduct);
//   //   }
//   // };

//   const uploadFileHandler = (e) => {
//     const file = e.target.files[0];
//     const bodyFormData = new FormData();
//     bodyFormData.append("image", file);
//     setLoadingUpload(true);
//     try {
//       const { data } = axios.post(
//         "http://localhost:8000/api/uploads",
//         bodyFormData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${userInfo.token}`,
//           },
//         }
//       );
//       console.log(e.target.files[0]);
//       console.log(data);
//       setImage(data);
//       setLoadingUpload(false);
//     } catch (err) {
//       setErrorUpload(err.message);
//       setLoadingUpload(false);
//     }
//   };

//   return (
//     <div className="createProduct row1">
//       <h1>{productId ? "Edit Product Page" : "Create Product Page"}</h1>

//       <form className="form" onSubmit={submitHandler}>
//         <h2>{productId ? `Product ( ${productId} )` : ""}</h2>
//         <div>
//           <label htmlFor="name">Product Name</label>
//           <input
//             type="text"
//             id="name"
//             placeholder="Enter product name"
//             value={name}
//             required
//             onChange={(e) => setName(e.target.value)}
//           ></input>
//         </div>
//         <div>
//           <label htmlFor="brand">Brand Name</label>
//           <input
//             type="text"
//             id="brand"
//             placeholder="Enter brand name"
//             required
//             value={brand}
//             onChange={(e) => setBrand(e.target.value)}
//           ></input>
//         </div>
//         <div>
//           <label htmlFor="category">Category</label>
//           <input
//             type="text"
//             id="category"
//             placeholder="Enter category name"
//             value={category}
//             required
//             onChange={(e) => setCategory(e.target.value)}
//           ></input>
//         </div>
//         <div>
//           <label htmlFor="image">Image</label>
//           <input
//             type="text"
//             id="image"
//             placeholder="Enter image name"
//             value={image}
//             onChange={(e) => setImage(e.target.value)}
//           ></input>
//         </div>
//         <div>
//           <label htmlFor="imageFile">Image File</label>
//           <input
//             type="file"
//             id="file"
//             label="Choose Image"
//             onChange={uploadFileHandler}
//           ></input>
//           {loadingUpload && <LoadingBox></LoadingBox>}
//           {errorUpload && <MessageBox>{errorUpload}</MessageBox>}
//         </div>
//         <div>
//           <label htmlFor="description">Descripion</label>
//           <input
//             type="textarea"
//             id="description"
//             placeholder="Enter description"
//             value={description}
//             required
//             onChange={(e) => setDescription(e.target.value)}
//           ></input>
//         </div>
//         <div className="inline">
//           <label htmlFor="price">price:</label>
//           <span>
//             $
//             <input
//               type="number"
//               id="price"
//               min="0.00"
//               max="10000.00"
//               step="0.01"
//               value={price}
//               placeholder="00.00"
//               onChange={(e) => setPrice(e.target.value)}
//             ></input>
//           </span>
//         </div>
//         <div className="inline">
//           <label htmlFor="countInStock">Count In Stock:</label>
//           <input
//             type="number"
//             min="0"
//             id="countInStock"
//             placeholder="Enter countInStock"
//             value={countInStock}
//             required
//             onChange={(e) => setCountInStock(e.target.value)}
//           ></input>
//         </div>

//         <div>
//           <button className="primary" type="submit">
//             {submitButtonLabel}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default ProductForm;

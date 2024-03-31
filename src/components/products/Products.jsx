import React from "react";
import "./Products.css";

const Products = ({ products }) => {
  console.log(products, "adsnfljjasdlfjlajsdf");
  return (
    <div className="product-list-container">
      <div className="product-list-filter-container">Filter</div>
      <div className="product-list-products">
        {products?.map((product) => (
          <div className="product-list-item" key={product._id}>
            <img
              src={product?.image[2]?.imageFile?.secure_url}
              alt="product"
              className="product-list-item-image"
            />
            <div className="product-list-item-details">
              <h5>{product?.productName}</h5>
              <hr />
              <h5 className="product-list-item-category">
                {product?.categoryOf?.categoryName}
              </h5>
              <h5>&#x20b9; {product?.price?.$numberDecimal}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

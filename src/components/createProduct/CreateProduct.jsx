import React, { useState } from "react";
import "./CreateProduct.css";
const CreateProduct = ({ products, categories }) => {
  console.log(products, categories);
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    sizeChart: [],
    stockCount: "",
    productDetails: "",
    productDescription: "",
    image: [],
    categoryOf: "",
  });
  const [error, setError] = useState("");
  const [sizeChart, setSizeChart] = useState({
    size: "",
    stock: "",
  });
  const [setImage, setSetImage] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");

  const addImageToFormData = (e) => {
    e.preventDefault();

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        image: [...prevFormData.image, setImage],
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((value <= 0 && value === "-1") || value === "00") {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };
  const addsizeChart = (e) => {
    const { name, value } = e.target;
    if ((value <= 0 && value === "-1") || value === "00") return;

    setSizeChart({ ...sizeChart, [name]: value });
  };
  const handleSizeChart = (e) => {
    e.preventDefault();
    const newSizeChart = [...formData.sizeChart, sizeChart];
    setFormData({ ...formData, sizeChart: newSizeChart });
    setSizeChart({ size: "", stock: "" });
  };
  const handleImageChange = (e) => {
    const { name, value } = e.target;
    setSetImage({ url: value });
  };

  const addproduct = async (e) => {
    e.preventDefault();
    if (
      formData.productName === "" ||
      formData.price === "" ||
      formData.sizeChart.length === 0 ||
      formData.stockCount === "" ||
      formData.productDetails === "" ||
      formData.productDescription === "" ||
      formData.image.length === 0 ||
      formData.categoryOf === ""
    ) {
      console.log(formData, "herereturns");
      return;
    }

    const data = {
      ...formData,
      categoryOf: formData?.categoryOf?.split("_")[1],
    };
    console.log(data, "asfasjdfasfdjk");
    const response = await fetch("http://localhost:3000/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: data }),
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setFormData({
      ...formData,
      categoryOf: selectedCategory,
    });
  };
  return (
    <>
      <div className="main_container_product">
        <div className="createProduct_group">
          <form
            className="form_main"
            onSubmit={addproduct}
            action=""
            // className="flex flex-col flex-wrap items-start justify-center m-2 p-3 gap-4"
          >
            <h1 className="error">{error}</h1>
            <h1>create product</h1>
            <div className="form_each_div">
              <h4>product name</h4>
              <input
                className=""
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
              />
            </div>
            <div className="form_each_div">
              <h4>price</h4>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div className="form_each_div">
              <h4>size chart</h4>
              <input
                type="text"
                name="size"
                value={sizeChart.size}
                onChange={addsizeChart}
              />
              <input
                type="number"
                name="stock"
                value={sizeChart.stock}
                onChange={addsizeChart}
              />
              <button
                onClick={handleSizeChart}
                className="bg-blue-900 text-white rounded-md pt-1 pb-1 pl-5 pr-5 "
              >
                add size chart
              </button>
            </div>
            <div className="form_each_div">
              <h4>stock count</h4>
              <input
                type="number"
                name="stockCount"
                value={formData.stockCount}
                onChange={handleChange}
              />
            </div>
            <div className="form_each_div">
              <h4>product details</h4>
              <input
                type="text"
                name="productDetails"
                value={formData.productDetails}
                onChange={handleChange}
              />
            </div>
            <div className="form_each_div">
              <h4>product description</h4>
              <input
                type="text"
                name="productDescription"
                value={formData.productDescription}
                onChange={handleChange}
              />
            </div>
            <div className="form_each_div">
              <h4>image</h4>
              <input
                type="text"
                name="image"
                value={formData?.image?.url}
                onChange={handleImageChange}
              />
              <button onClick={(e) => addImageToFormData(e)}>
                add to form data
              </button>
            </div>
            <div className="form_each_div">
              <h4>category of</h4>

              <select
                id="category"
                name="category"
                onChange={(e) => {
                  console.log(e.target.value, "askjdfaksdfasfah");
                  return setSelectedCategory(e.target.value);
                }}
                value={selectedCategory}
              >
                {categories?.map((category) => (
                  <option
                    key={category._id}
                    value={`${category.categoryName}_${category._id}`}
                  >
                    {category.categoryName}
                  </option>
                ))}
              </select>
              <button onClick={handleSubmit}>Submit</button>
            </div>

            <button type="submit">create product</button>
          </form>
          <div className=" product_details_container">
            <h3 className="flex gap-6">productName: {formData.productName}</h3>
            <h3>price: {formData.price}</h3>
            <h3 className="flex flex-row flex-wrap gap-2">
              sizeChart:{" "}
              {formData?.sizeChart.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="bg-blue-600 text-white p-2 gap-2 rounded-md"
                  >
                    <h3>stock: {item.stock}</h3>
                    <h3>size: {item.size}</h3>
                  </div>
                );
              })}
            </h3>
            <h3>stockCount: {formData.stockCount}</h3>
            <h3>productDetails: {formData.productDetails}</h3>
            <h3>productDescription: {formData.productDescription}</h3>
            <h3 className="flex flex-row flex-wrap gap-2">
              image:{" "}
              {formData?.image.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="bg-blue-600 text-white p-2 gap-2 rounded-md"
                  >
                    <h3>url: {item.url}</h3>
                  </div>
                );
              })}
            </h3>
            <h3>categoryOf: {formData.categoryOf.split("_")[0]}</h3>
          </div>
        </div>
        <div className="product_list_container">
          {products?.map((product) => {
            return (
              <div className="product_items" key={product._id}>
                <div>
                  {product.image.map((img) => {
                    return (
                      <img key={img._id} src={img.url} alt="product-image" />
                    );
                  })}
                </div>
                <h3>{product.productName}</h3>
                <h3>{product.price.$numberDecimal}</h3>
                <div className="product_sizeChart_Container">
                  {product.sizeChart.map((sizes) => {
                    return (
                      <div className="product_sizeChart_items" key={sizes._id}>
                        <h4>{sizes.size}</h4>
                        <h4>{sizes.stock}</h4>
                      </div>
                    );
                  })}
                </div>
                <h3>{product.productDetails}</h3>
                <h3>{product.productDescription}</h3>
                <h3>{product.stockCount}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CreateProduct;

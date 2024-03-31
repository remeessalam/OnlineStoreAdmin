import React, { useRef, useState } from "react";
import "./CreateProduct.css";
import deleteIcon from "../../../public/svg/delete.svg";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { FormControl } from "@mui/material";
import { UploadImage } from "../../helper/imageActions";
import ConfirmButton from "../confirmButton/ConfirmButton";

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
    tag: [],
    categoryOf: "",
  });
  const [error, setError] = useState("");
  const [sizeChart, setSizeChart] = useState({
    size: "",
    stock: "",
  });
  const [tag, setTag] = useState();
  const [setImage, setSetImage] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [imageError, setImageError] = useState("");
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
    //cheacking input number is not less than 0
    if ((value <= 0 && value === "-1") || value.startsWith("0")) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };
  const addTags = (e) => {
    const { name } = e.target;
    if (!tag) return;

    setFormData({ ...formData, tag: [...formData?.tag, { tag: tag }] });
    setTag("");
  };
  console.log(formData, tag, "kjasfkaksfhhasfdk");
  const addsizeChart = (e) => {
    const { name, value } = e.target;
    console.log(value, !isNaN(value), "akjsdfalkejfhlahjsdf");
    if (value === "" || value.startsWith("0")) {
      setSizeChart({ ...sizeChart, [name]: "" });
      return;
    }

    setSizeChart({ ...sizeChart, [name]: value });
  };
  const handleSizeChart = (e) => {
    e.preventDefault();
    if (sizeChart.size === "" || sizeChart.stock === "") return;
    const newSizeChart = [...formData.sizeChart, sizeChart];

    const totalStockCount = newSizeChart.reduce(
      (total, item) => total + parseInt(item.stock),
      0
    );

    setFormData((prevFormData) => ({
      ...prevFormData,
      sizeChart: newSizeChart,
      stockCount: totalStockCount,
    }));

    setSizeChart({ size: "", stock: "" });
  };
  const handleImageChange = (e) => {
    const images = Object.values(e.target.files);
    if (images.length > 5) {
      setImageError("only two image can add");
      return;
    }
    setImageError("");

    console.log(images, "laksjdhfkasndfknasdkfn");
    images.map((image) => {
      const url = URL.createObjectURL(image);
      console.log(url, "askdjfalksdjnflkasndf");
      return url;
    });
    setSetImage(images);
  };

  const addproduct = async (e) => {
    e.preventDefault();
    try {
      setIsUploading(true);
      if (
        formData.productName === "" ||
        formData.price === "" ||
        formData.sizeChart.length === 0 ||
        formData.stockCount === "" ||
        formData.productDetails === "" ||
        formData.productDescription === "" ||
        formData.tag.length === 0 ||
        formData.categoryOf === "" ||
        setImage.length === 0
      ) {
        setError(
          "Oops! It looks like this field is empty. Please fill it in to continue."
        );
        setSetImage([]);
        return;
      }
      let uploadedImages;
      if (setImage) {
        uploadedImages = await UploadImage(setImage);
        setFormData((pre) => {
          return {
            ...pre,
            image: uploadedImages.map((img) => ({ imageFile: img.imageFile })),
          };
        });
      } else {
        setIsUploading(false);
        return;
      }
      console.log({ ...formData }, "ladsjflasjdlfjalsdjf");
      // if (Object.values(formData).some((value) => value.length === 0)) {
      //   const newError = { ...error };
      //   Object.entries(formData).forEach(([key, value]) => {
      //     console.log(key, value, "slfghljsngljnsdglglfgj");

      //     if (value.length === 0) {
      //       newError[key] = `Please enter ${key}`;
      //       setIsUploading(false);
      //     } else {
      //       newError[key] = ""; // Clear error message if the value is filled
      //     }
      //   });
      //   setError(newError);
      //   console.log(newError, formData, "c");
      //   return;
      // }

      const data = {
        ...formData,
        categoryOf: formData?.categoryOf?.split("_")[1],
        image: uploadedImages.map((img) => ({ imageFile: img.imageFile })),
      };
      console.log(data, "asfasjdfasfdjk");
      const res = await fetch("http://localhost:3000/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: data }),
      });
      const response = await res.json();
      if (response.status) {
        setFormData({
          productName: "",
          price: "",
          sizeChart: [],
          stockCount: "",
          productDetails: "",
          productDescription: "",
          image: [],
          tag: [],
          categoryOf: "",
        });
        setSetImage([]);
      }
      setIsUploading(false);
    } catch (err) {}
  };

  const handleImageUpload = (e) => {
    // e.preventDefault();
    console.log("imagebuttonclicked");
    fileInputRef.current.click();
  };

  console.log(formData, "kajsdhflkjasndfknaskdjf");

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
            <p className="createProduct_error">
              {formData.productName.length === 0 && error}
            </p>
            <div className="form_each_div">
              <h4>price</h4>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <p className="createProduct_error">
              {formData.price.length === 0 && error}
            </p>
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
                type="button"
                onClick={handleSizeChart}
                className="bg-blue-900 text-white rounded-md pt-1 pb-1 pl-5 pr-5 "
              >
                add size chart
              </button>
            </div>
            {/* <p className="createProduct_error">
              {sizeChart.size.length === 0 && error.categoryName}
            </p> */}
            <div className="createCategory_formdata_view_mapping">
              sizeChart:
              {formData?.sizeChart.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="createCategory_formdata_view_mapping_sizechart_item"
                  >
                    <Chip
                      key={i}
                      label={`stock: ${item.size} size: ${item.stock}`}
                      variant="outlined"
                      onDelete={() => {
                        setFormData((prevFormData) => {
                          const newStockCount =
                            prevFormData.stockCount - parseInt(item.stock);

                          const newSizeChart = prevFormData.sizeChart.filter(
                            (existingChart) => {
                              return (
                                existingChart.size !== item.size ||
                                existingChart.stock !== item.stock
                              );
                            }
                          );

                          return {
                            ...prevFormData,
                            sizeChart: newSizeChart,
                            stockCount: newStockCount,
                          };
                        });
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <p className="createProduct_error">
              {formData?.sizeChart.length === 0 && error}
            </p>
            <div className="form_each_div">
              <h4>stock count</h4>
              <input
                type="number"
                name="stockCount"
                value={formData.stockCount}
                onChange={handleChange}
              />
            </div>
            <p className="createProduct_error">
              {formData.stockCount.length === 0 && error}
            </p>
            <div className="form_each_div">
              <h4>product details</h4>
              {/* <input
                type="text"
              
              /> */}
              <textarea
                name="productDetails"
                value={formData.productDetails}
                onChange={handleChange}
                rows={4}
              />
            </div>
            <p className="createProduct_error">
              {formData.productDetails.length === 0 && error}
            </p>
            <div className="form_each_div">
              <h4>product description</h4>
              <textarea
                name="productDescription"
                value={formData.productDescription}
                onChange={handleChange}
                rows={4}
              />
              {/* <input
                type="text"
                name="productDescription"
                value={formData.productDescription}
                onChange={handleChange}
              /> */}
            </div>
            <p className="createProduct_error">
              {formData.productDescription.length === 0 && error}
            </p>
            <div className="form_each_div">
              <h4>tag</h4>
              <input
                type="text"
                name="tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
              <button type="button" onClick={addTags}>
                add Tag
              </button>
            </div>
            <div className="createCategory_formdata_view_mapping">
              tag:
              <div>
                {formData?.tag?.map((tag, i) => {
                  console.log(tag, "askdfjjkashfkjhfgkajs");
                  return (
                    <>
                      <Chip
                        key={i}
                        label={tag.tag}
                        variant="outlined"
                        onDelete={() => {
                          setFormData((pre) => ({
                            ...pre,
                            tag: pre.tag.filter(
                              (existingTag) => existingTag.tag !== tag.tag
                            ),
                          }));
                        }}
                      />
                    </>
                  );
                })}
              </div>
            </div>
            <p className="createProduct_error">
              {formData?.tag.length === 0 && error}
            </p>
            <div className="form_each_div">
              <h4>category of</h4>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  categories
                </InputLabel>
                <Select
                  sx={{
                    minWidth: 120,
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData?.categoryOf?.split("_")[1]}
                  label="categories"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      categoryOf: e.target.value,
                    });
                  }}
                  MenuProps={{
                    sx: {
                      "& .MuiList-root": {
                        display: "flex",
                        flexDirection: "column",
                      },
                    },
                  }}
                >
                  {categories?.map((category) => (
                    <MenuItem
                      sx={{
                        background: "white",
                        width: "100%",
                        borderRadius: "9px",
                        color: "black",
                      }}
                      key={category._id}
                      value={`${category.categoryName}_${category._id}`}
                    >
                      {category?.categoryName}
                      <br />
                      {category?.categoryFor}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <p className="createProduct_error">
              {formData?.categoryOf.length === 0 && error}
            </p>
            <div className="form_each_div">
              <h4>image</h4>
              <button type="button" onClick={handleImageUpload}>
                upload images
                <input
                  id="fileInput"
                  style={{ display: "none" }}
                  type="file"
                  name="image"
                  multiple
                  value={formData?.image?.url}
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
              </button>
              {/* <button onClick={(e) => addImageToFormData(e)}>
                add to form data
              </button> */}
            </div>
            <div className="createCategory_formdata_view_mapping">
              image:
              <div>
                {setImage?.map((image, i) => {
                  console.log(image, "ksdjfasjdfljalsfd");
                  return (
                    <div
                      key={i}
                      className="bg-blue-600 text-white p-2 gap-2 rounded-md"
                    >
                      <img
                        src={deleteIcon}
                        alt="delete"
                        width={15}
                        height={15}
                        onClick={() => {
                          setSetImage((pre) => {
                            return pre.filter((img) => {
                              console.log(img, "ksdjfasjdfljalsfd");
                              return image.name !== img.name;
                            });
                          });
                        }}
                      />
                      <img
                        src={URL.createObjectURL(image)}
                        alt="product-image"
                        width={300}
                        height={300}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <p className="createProduct_error">
              {formData?.image?.length === 0 && setImage?.length === 0
                ? error
                : ""}
              <br />
              {imageError && imageError}
            </p>

            <button
              type="submit"
              className={
                isUploading
                  ? "createProductSubmitButton"
                  : "createProductSubmitButton"
              }
            >
              {isUploading ? "Uploading" : "create product"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;

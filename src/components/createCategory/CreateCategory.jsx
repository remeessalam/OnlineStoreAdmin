"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CreateCategory.css";
import { UploadImage } from "../../helper/imageActions";
import edit from "../../../public/svg/edit.svg";
import deleteIcons from "../../../public/svg/delete.svg";
import noImage from "../../../public/png/no-pictures.png";
import Modal from "../modal/Modal";
import {
  createCategory,
  fetchCategories,
} from "../../features/category/categorySlice";
const CreateCategory = () => {
  const [csetImage, setCsetImage] = useState([]);
  const [imageobj, setImageobj] = useState([]);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [categoryFormData, setcategoryFormData] = useState({
    categoryName: "",
    categoryFor: "",
    image: [],
  });
  const [modal, setModal] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  // const categoriesList = useSelector((state) => state.category.categoryValue);

  const createCategoryHandle = (e) => {
    const { name, value } = e.target;
    setcategoryFormData({ ...categoryFormData, [name]: value });
  };

  const addImageToCloudnary = async (e) => {
    setIsImageUploaded(true);
    const images = Object.values(e.target.files);
    setImageobj(Object.values(e.target.files));
    images.map((img) => {
      const url = URL.createObjectURL(img);
      setCsetImage((pre) => [...pre, { url: url, file: img }]);
    });

    setIsImageUploaded(false);
  };

  const submitCategory = async (e) => {
    e.preventDefault();
    try {
      const uploadedImages = await UploadImage(imageobj, setcategoryFormData);
      if (
        categoryFormData.categoryName === "" ||
        categoryFormData.categoryFor === ""
      ) {
        setImageobj([]);
        return alert("Please fill the form");
      }
      const imageFiles = uploadedImages.map((img) => {
        return { imageFile: img.imageFile };
      });
      dispatch(createCategory(categoryFormData, imageFiles));

      setcategoryFormData({ categoryName: "", categoryFor: "", image: [] });
      setCsetImage([]);

      return;
    } catch (error) {
      console.error("Error submitting category:", error);
    }
  };
  const handleButtonClick = () => {
    console.log("clicked");
    fileInputRef.current.click();
  };
  const removeImage = (i) => {
    setCsetImage((previous) => {
      return previous.filter((image, index) => {
        return i !== index;
      });
    });
  };

  return (
    <div className="main_container_category">
      {/* <AdvancedImage cldImg={myImage} /> */}
      {/* {file?.image?.map((img) => {
        <img src=" alt="" />
      })} */}
      <div className="category_container">
        <div className="category_container_input">
          <div className="create_category_container">
            <h2>create mens categories</h2>

            <div className="main_container_category_eachDiv">
              <h4>category name</h4>
              <input
                type="text"
                name="categoryName"
                value={categoryFormData.categoryName}
                onChange={createCategoryHandle}
              />
            </div>
            <div className="main_container_category_eachDiv">
              <h4>category for</h4>
              <input
                type="text"
                name="categoryFor"
                value={categoryFormData.categoryFor}
                onChange={createCategoryHandle}
              />
            </div>
            <div className="main_container_category_eachDiv">
              <h4>category image</h4>
              <button onClick={handleButtonClick}>
                Upload Images
                <input
                  id="fileInput"
                  style={{ display: "none" }}
                  type="file"
                  name="image"
                  multiple
                  ref={fileInputRef}
                  onChange={addImageToCloudnary}
                />
              </button>
            </div>
            <div className="button_container_center">
              <button
                onClick={!isImageUploaded && submitCategory}
                style={
                  isImageUploaded
                    ? { background: "red", cursor: "not-allowed" }
                    : { background: "blue" }
                }
              >
                Create Category
              </button>
            </div>
          </div>

          <div className="show_category_input">
            <h3>category Name: {categoryFormData?.categoryName}</h3>
            <h3>category For: {categoryFormData?.categoryFor}</h3>
            <h3>category Image: </h3>
            <div className="category_input_image_container">
              {csetImage?.map((img, i) => {
                return (
                  <div key={i} className="category_input_image">
                    <div
                      onClick={() => removeImage(i)}
                      style={{ cursor: "pointer", textAlign: "end" }}
                    >
                      <h1>x</h1>
                    </div>
                    {img && (
                      <img
                        src={img?.url}
                        alt="catagory image"
                        width={300}
                        height={300}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
       
       
      </div>
    </div>
  );
};

export default CreateCategory;

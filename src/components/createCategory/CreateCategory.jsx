"use client";
import React, { useRef, useState } from "react";
import "./CreateCategory.css";
import { UploadImage } from "../../helper/imageActions";
import edit from "../../../public/svg/edit.svg";
import deleteIcons from "../../../public/svg/delete.svg";
import noImage from "../../../public/png/no-pictures.png";
import Modal from "../modal/Modal";
const CreateCategory = ({ categories }) => {
  const [csetImage, setCsetImage] = useState([]);
  const [imageobj, setImageobj] = useState([]);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [categoryFormData, setcategoryFormData] = useState({
    categoryName: "",
    categoryFor: "",
    image: [],
  });
  const [modal, setModal] = useState(false);
  const [editCategory, setEditCategory] = useState();
  const fileInputRef = useRef(null);

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

    // if (uploadedImages) {
    //   setcategoryFormData((previous) => ({
    //     ...categoryFormData,
    //     image: [...uploadedImages.map((item) => ({ url: item.url }))],
    //   }));
    // }
    setIsImageUploaded(false);
  };

  const submitCategory = async (e) => {
    e.preventDefault();
    try {
      console.log(categoryFormData, "thisisuploadimages");

      const uploadedImages = await UploadImage(imageobj, setcategoryFormData);
      console.log(uploadedImages, "thshfjsnfd");
      if (
        categoryFormData.categoryName === "" ||
        categoryFormData.categoryFor === ""
      ) {
        setImageobj([])
        return alert("Please fill the form");
      }
      const imageFiles = uploadedImages.map((img) => {
        console.log(img.imageFile, "skjdfhkjsnfg");
        return { imageFile: img.imageFile };
      });
      console.log(imageFiles, "alksdjfasldf");
      const response = await fetch("http://localhost:3000/api/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            ...categoryFormData,
            image: imageFiles,
          },
        }),
      });

      const result = await response.json();
      console.log(result, "Response from backend");

      if (result) {
        setcategoryFormData({ categoryName: "", categoryFor: "", image: [] });
        setCsetImage([]);
      }
    } catch (error) {
      console.error("Error submitting category:", error);
    }
  };
  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger click event on file input
  };
  console.log(csetImage, "sjdfaksdjfkjasljflkdas");
  const removeImage = (i) => {
    setCsetImage((previous) => {
      return previous.filter((image, index) => {
        return i !== index;
      });
    });
  };

  const deleteCategory = async (id) => {
    const response = await fetch(
      `http://localhost:3000/api/category?_id=${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response, "sfdljksadfjasdlkfj");
  };
  const openModal = (category) => {
    setEditCategory(category);
    setModal(true);
  };

  return (
    <div className="main_container_category">
      {modal && <Modal category={editCategory} setModal={setModal} />}
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
              {/* <button onClick={addcategoryimagetoForm}>add category image</button> */}
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
                console.log(img, "thisisfile");
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
        <hr />
        <div className="category_list_container">
          <div>
            <h3>categories</h3>
          </div>
          <div className="category_list">
            {categories?.map((category) => {
              return (
                <div
                  key={category._id}
                  className="category_mapped_list_container"
                >
                  <div className="category_list_closeIcon">
                    <img
                      src={edit}
                      alt="edit"
                      width={20}
                      height={20}
                      onClick={() => openModal(category)}
                    />
                    <img
                      onClick={() => deleteCategory(category._id)}
                      // className="closeIcon"
                      src={deleteIcons}
                      alt="delete"
                      width={20}
                      height={20}
                    />
                  </div>
                  {category?.image.length === 0 ? (
                    <img src={noImage} alt="noImage" width={300} height={300} />
                  ) : (
                    <img
                      src={category?.image[0]?.imageFile?.secure_url}
                      alt=""
                      width={300}
                      height={300}
                      className="category_list_image"
                    />
                  )}
                  <h3>category name: {category.categoryName}</h3>
                  <h3>category for: {category.categoryFor}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;

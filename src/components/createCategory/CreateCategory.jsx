"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import "./CreateCategory.css";
import { UploadImage } from "../../helper/imageActions";
import deleteIcon from "../../../public/svg/delete.svg";
import {
  createCategory,
  fetchCategories,
} from "../../features/category/categorySlice";
import ConfirmButton from "../confirmButton/ConfirmButton";
// import Alert from "@mui/material/Alert";
import { Snackbar, Alert } from "@mui/material";

const CreateCategory = () => {
  const [csetImage, setCsetImage] = useState([]);
  const [imageobj, setImageobj] = useState([]);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState();
  const [categoryFormData, setcategoryFormData] = useState({
    categoryName: "",
    categoryFor: "",
    image: [],
  });
  const [error, setError] = useState({
    categoryName: "",
    categoryFor: "",
    image: "",
  });
  let timeOut;
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
    // return clearTimeout(timeOut);
  }, []);

  // const showAlert = (msg) => {
  //   setAlert(msg);
  //   timeOut = setTimeout(() => {
  //     setAlert();
  //   }, 3000);
  // };
  const createCategoryHandle = (e) => {
    const { name, value } = e.target;
    setcategoryFormData({ ...categoryFormData, [name]: value });
  };

  const addImageToCloudnary = async (e) => {
    setIsImageUploaded(true);
    const images = Object.values(e.target.files);
    if (images.length > 2 || imageobj.length + images.length > 2) {
      setError((pre) => {
        return { ...pre, image: "only two images allowed" };
      });
      return;
    }
    setError((pre) => {
      return { ...pre, image: "" };
    });
    setImageobj(Object.values(e.target.files));
    images.map((img) => {
      const url = URL.createObjectURL(img);
      setCsetImage((pre) => [...pre, { url: url, file: img }]);
    });

    setIsImageUploaded(false);
  };

  const submitCategory = async (e) => {
    try {
      e.preventDefault();
      console.log(imageobj, "adfjakdfjlfasdf");
      if (
        categoryFormData.categoryName === "" ||
        categoryFormData.categoryFor === "" ||
        imageobj.length === 0
      ) {
        setError({
          categoryName: "Please enter category name!",
          categoryFor: "Please enter category for!",
          image: "Please add image!",
        });
        setImageobj([]);
        return;
      }
      setError({
        categoryName: "",
        categoryFor: "",
        image: "",
      });
      console.log(imageobj, "thisisimageobjjasdhfj");
      setLoading(true);
      const uploadedImages = await UploadImage(imageobj);
      const imageFiles = uploadedImages.map((img) => {
        return { imageFile: img.imageFile };
      });
      const result = dispatch(createCategory(categoryFormData, imageFiles));
      if (result) {
        result.then((res) => {
          console.log(res, "asjdkfajksfd");
          console.log(result, "askjdhfkashdfkjahskfgn");
          if (res) {
            if (!res?.status) {
              setAlert(res.msg);
              setLoading(false);
              return;
            }
          }
          setcategoryFormData({ categoryName: "", categoryFor: "", image: [] });
          setCsetImage([]);
          setLoading(false);
        });
      }
      // return;
    } catch (error) {
      setLoading(false);
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
    setImageobj((previous) => {
      return previous.filter((image, index) => {
        return i !== index;
      });
    });
  };

  return (
    <div className="main_container_category">
      {
        <Snackbar
          sx={{
            "& .MuiSnackbarContent-root": {
              backgroundColor: "orange",
              color: "white",
              textAlign: "center",
            },
          }}
          open={alert?.length}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          autoHideDuration={4000}
          onClose={() => setAlert("")}
          message={alert}
          // action={action}
        />
      }
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
            <p className="modal_error">
              {categoryFormData.categoryName.length === 0 && error.categoryName}
            </p>
            <div className="main_container_category_eachDiv">
              <h4>category for</h4>
              <input
                type="text"
                name="categoryFor"
                value={categoryFormData.categoryFor}
                onChange={createCategoryHandle}
              />
            </div>
            <p className="modal_error">
              {categoryFormData.categoryFor.length === 0 && error.categoryFor}
            </p>
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
            <p className="modal_error">
              {imageobj.length === 0 || imageobj.length + csetImage.length > 2
                ? error.image
                : ""}
            </p>
            <div className="category_input_image_container">
              {csetImage?.map((img, i) => {
                return (
                  <div key={i} className="category_input_image_list">
                    <div>
                      <img
                        onClick={() => removeImage(i)}
                        // className="closeIcon"
                        src={deleteIcon}
                        alt="delete"
                        width={20}
                        height={20}
                      />
                    </div>
                    {img && (
                      <img
                        className="category_input_image"
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
            <div className="button_container_center">
              <ConfirmButton
                fun={submitCategory}
                condition={loading}
                text={"Create Category"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;

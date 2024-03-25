import { useEffect, useRef, useState } from "react";
import { UploadImage, deleteImage } from "../../../helper/imageActions";
import leftArrow from "../../../../public/svg/leftArrow.svg";
import rightArrow from "../../../../public/svg/rightArrow.svg";
import deleteIcons from "../../../../public/svg/delete.svg";
import noImage from "../../../../public/png/no-pictures.png";
import {
  editCategory,
  addEditedCategory,
} from "../../../features/category/categorySlice";
import { useDispatch } from "react-redux";
import AlertModal from "../alertModal/AlertModal";
import "./Modal.css";
import ConfirmButton from "../../confirmButton/ConfirmButton";
import Alert from "@mui/material/Alert";

const Modal = ({ category, setModal }) => {
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [carousalCount, setCarousalCount] = useState(0);
  const [image, setImages] = useState([]);
  const [editedImage, setEditedImage] = useState([]);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [error] = useState({
    categoryName: "Please enter category name!",
    categoryFor: "Please enter category for!",
    image: "Please add image!",
  });
  const [editFormData, setEditFormData] = useState({
    categoryName: "",
    categoryFor: "",
    image: [],
  });

  const fileInputRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setEditFormData((pre) => {
      return {
        ...pre,
        categoryName: category.categoryName,
        categoryFor: category.categoryFor,
        image: category.image.map((image) => {
          return { ...image.imageFile, id: image._id };
        }),
      };
    });

    setImages(
      category.image.map((image) => {
        return { ...image.imageFile, id: image._id };
      })
    );

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handelEditCategory = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
    console.log(editFormData);
  };

  const addImageToCloudnary = async (e) => {
    const images = Object.values(e.target.files);
    setEditedImage(Object.values(e.target.files));
    if (
      image.length > 2 ||
      images.length > 2 ||
      images?.length + image.length > 2
    ) {
      setEditedImage([]);
      return alert("only two images allowed");
    }
    setImages((pre) => {
      return [
        ...pre,
        ...images.map((img) => {
          return URL.createObjectURL(img);
        }),
      ];
    });
  };

  const submitEditCategory = async (e) => {
    let uploadedImages = [];
    e.preventDefault();

    try {
      if (
        editedImage.length === 0 &&
        editFormData.image.length === 0 &&
        image.length === 0
      ) {
        return;
      }
      if (editFormData.categoryName === "" || editFormData.categoryFor === "") {
        return;
      }
      console.log(editedImage, "thisisuploadimages");
      setIsImageUploaded(true);
      if (editedImage.length) {
        uploadedImages = await UploadImage(editedImage);
      }
      console.log(editFormData, category, "thisisuploadimages", uploadedImages);

      dispatch(addEditedCategory(editFormData, uploadedImages, category._id));

      setModal(false);
      setIsImageUploaded(false);
    } catch (error) {
      console.error("Error submitting category:", error);
    }
  };

  const removeImage = () => {
    if (image[carousalCount]?.secure_url) {
      const editedCategory = deleteImage(
        image[carousalCount],
        category._id
        // editFormData?.image[carousalCount]?.imageFile.secure_url
      )
        .then((res) => {
          console.log(res, "skfjghaskdhjf");
          setEditFormData({
            categoryName: res?.category?.categoryName,
            categoryFor: res?.category?.categoryFor,
            image: res?.category?.image.map((image) => {
              return { ...image.imageFile, id: image._id };
            }),
          });
          setImages(
            res?.category?.image.map((image) => {
              return { ...image.imageFile, id: image._id };
            })
          );
          dispatch(editCategory(res.category));
          setCarousalCount(0);
          setShowAlertModal((pre) => !pre);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setImages((pre) => {
        return pre.filter((img) => img != image[carousalCount]);
      });
      setCarousalCount(0);

      setShowAlertModal((pre) => !pre);
    }
  };
  return (
    <>
      {showAlertModal && (
        <AlertModal
          show={setShowAlertModal}
          success={removeImage}
          alertmsg={`Are you sure to delete this Image? It will remove from the server also!`}
        />
      )}
      <div className="edit_category_modal_container">
        <div className="edit_category_modal">
          <h2>create mens categories</h2>
          <div className="modal_container_category_eachDiv">
            <h4>category name</h4>
            <input
              type="text"
              name="categoryName"
              value={editFormData.categoryName}
              onChange={handelEditCategory}
            />
            <p className="modal_error">
              {editFormData.categoryName.length === 0 && error.categoryName}
            </p>
          </div>
          <div className="modal_container_category_eachDiv">
            <h4>category for</h4>
            <input
              type="text"
              name="categoryFor"
              value={editFormData.categoryFor}
              onChange={handelEditCategory}
            />
            <p className="modal_error">
              {editFormData.categoryFor.length === 0 && error.categoryFor}
            </p>
          </div>
          <div className="modal_container_category_eachDiv">
            <h4>category image</h4>
            {image?.length === 0 ? (
              <img src={noImage} alt="noImage" width={300} height={300} />
            ) : (
              <div className="modal_image_carousal_container">
                <img
                  src={leftArrow}
                  alt="leftArrow"
                  width={20}
                  height={20}
                  onClick={() => {
                    if (image?.length > 0) {
                      setCarousalCount((pre) => {
                        return pre === 0 ? image?.length - 1 : pre - 1;
                      });
                    } else {
                      return;
                    }
                  }}
                />
                <div className="modal_image_container">
                  <div
                    onClick={() => setShowAlertModal(!showAlertModal)}
                    className="modal_editcategory_image_delete_button"
                  >
                    <img
                      src={deleteIcons}
                      alt="delete"
                      width={20}
                      height={20}
                    />
                  </div>
                  {image?.map((image, i) => {
                    console.log(
                      image,
                      carousalCount === i,
                      "thihjsdfkjnaskdlf"
                    );
                    return (
                      <div key={i}>
                        {carousalCount === i && (
                          <img
                            src={image?.secure_url || image}
                            alt="category image"
                            width={300}
                            height={300}
                            className="category_list_image"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
                <img
                  src={rightArrow}
                  alt="rightArrow"
                  width={20}
                  height={20}
                  onClick={() => {
                    if (image.length > 0) {
                      setCarousalCount((pre) => {
                        return pre === image.length - 1 ? 0 : pre + 1;
                      });
                    } else {
                      return;
                    }
                  }}
                />
              </div>
            )}
            <button onClick={() => fileInputRef.current.click()}>
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
            {
              <p className="modal_error">
                {editedImage.length === 0 &&
                  editFormData.image.length === 0 &&
                  image.length === 0 &&
                  error.image}
              </p>
            }
          </div>
          <div className="button_container_center">
            <ConfirmButton
              fun={submitEditCategory}
              condition={isImageUploaded}
              text={"Create Category"}
            />

            <button
              onClick={() => {
                setModal((pre) => !pre);
              }}
              className="modal_cancel_button"
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

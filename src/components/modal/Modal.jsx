import { useEffect, useRef, useState } from "react";
import { UploadImage, deleteImage } from "../../helper/imageActions";
import leftArrow from "../../../public/svg/leftArrow.svg";
import rightArrow from "../../../public/svg/rightArrow.svg";
import deleteIcons from "../../../public/svg/delete.svg";
import noImage from "../../../public/png/no-pictures.png";
const Modal = ({ category, setModal }) => {
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [carousalCount, setCarousalCount] = useState(0);
  const [image, setImages] = useState([]);
  const [editedImage, setEditedImage] = useState([]);
  const [editFormData, setEditFormData] = useState({
    categoryName: "",
    categoryFor: "",
    image: [],
  });
  const fileInputRef = useRef(null);
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
  }, []);
  const handelEditCategory = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
    console.log(editFormData);
  };
  console.log(editFormData, "kajflajsfknasknas");

  //   const deleteImage = async (imgId, id, imgUrl) => {
  //     const data = { imgId, id, imgUrl };
  //     const response = await fetch(`http://localhost:3000/api/category/image`, {
  //       method: "DELETE",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ data: data }),
  //     });
  //     const res = await response.json();
  //     if (res.category) {
  //       setEditFormData((pre) => {
  //         return { ...pre, image: [res?.category?.image] };
  //       });
  //       setCarousalCount(0);
  //     }
  //     console.log(res, editFormData, "sfdljksadfjasdlkfj");
  //   };

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
    // images.map((img) => {
    //   const url = URL.createObjectURL(img);
    //   setCsetImage((pre) => [...pre, { url: url, file: img }]);
    // });

    // if (uploadedImages) {
    //   setEditFormData((previous) => ({
    //     ...editFormData,
    //     image: [...uploadedImages.map((item) => ({ url: item.url }))],
    //   }));
    // }
  };

  console.log(image, "asjdhfkasjdflk");
  const editCategory = async (e) => {
    e.preventDefault();
    try {
      console.log("thisisuploadimages");
      setIsImageUploaded(true);
      const uploadedImages = await UploadImage(editedImage);
      console.log(editFormData, category, "thisisuploadimages", uploadedImages);
      setIsImageUploaded(false);
      //   return;
      if (
        editFormData.categoryName === "" ||
        editFormData.categoryFor === ""
        // editFormData.image.length === 0
      ) {
        return alert("Please fill the form");
      }
      const imageFiles = uploadedImages.map((img) => {
        console.log(img.imageFile, "skjdfhkjsnfg");
        return { imageFile: img.imageFile };
      });

      const response = await fetch("http://localhost:3000/api/category", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            form: {
              ...editFormData,
              image: [
                ...editFormData?.image?.map((item) => ({ imageFile: item })),
                ...uploadedImages.map((img) => ({ imageFile: img.imageFile })),
              ],
            },
            id: category._id,
          },
        }),
      });

      const result = await response.json();
      console.log(result, "Response from backend");

      if (result) {
        setEditFormData({
          categoryName: result.category.categoryName,
          categoryFor: result.category.categoryFor,
          image: result.category.image,
        });
        // setCsetImage([]);
        setModal(false);
      }
      setIsImageUploaded(false);
    } catch (error) {
      console.error("Error submitting category:", error);
    }
  };
  return (
    <>
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
          </div>
          <div className="modal_container_category_eachDiv">
            <h4>category for</h4>
            <input
              type="text"
              name="categoryFor"
              value={editFormData.categoryFor}
              onChange={handelEditCategory}
            />
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
                    onClick={() => {
                      if (image[carousalCount]?.secure_url) {
                        const editedCategory = deleteImage(
                          image[carousalCount],
                          category._id
                          // editFormData?.image[carousalCount]?.imageFile.secure_url
                        ).then((res) => {
                          console.log(res, "skfjghaskdhjf");
                          setEditFormData({
                            categoryName: res?.category?.categoryName,
                            categoryFor: res?.category?.categoryFor,
                            image: res?.category?.image.map((image) => {
                              return { ...image.imageFile, id: image._id };
                            }),
                          });
                          setCarousalCount(0);
                        });
                      }
                      setImages((pre) => {
                        return pre.filter((img) => img != image[carousalCount]);
                      });
                      setCarousalCount(0);
                    }}
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
            {/* <button onClick={addcategoryimagetoForm}>add category image</button> */}
          </div>
          <div className="button_container_center">
            <button
              onClick={editCategory}
              style={
                isImageUploaded
                  ? { background: "red", cursor: "not-allowed" }
                  : { background: "blue" }
              }
            >
              Create Category
            </button>
            <button
              onClick={() => {
                setModal((pre) => !pre);
              }}
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

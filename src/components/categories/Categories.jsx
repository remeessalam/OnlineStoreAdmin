import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeCategory } from "../../features/category/categorySlice";
import edit from "../../../public/svg/edit.svg";
import deleteIcons from "../../../public/svg/delete.svg";
import noImage from "../../../public/png/no-pictures.png";
import "./Categories.css";
import AlertModal from "../modal/alertModal/AlertModal";

const Categories = ({ categories, setEditCategory, setModal }) => {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [categoryId, setCategoryId] = useState();

  useEffect(() => {
    return setCategoryId();
  }, []);

  const dispatch = useDispatch();

  const openModal = (category) => {
    setEditCategory(category);
    setModal(true);
  };

  const deleteCategory = () => {
    dispatch(removeCategory(categoryId));
    setShowAlertModal((pre) => !pre);
  };

  return (
    <div className="category_list_container">
      {showAlertModal && (
        <AlertModal
          show={setShowAlertModal}
          success={deleteCategory}
          alertmsg={"Are you sure to delete this Category?"}
        />
      )}
      <div className="Category_Heading">
        <h4>categories</h4>
      </div>
      <div className="category_list">
        {categories?.map((category) => {
          return (
            <div key={category._id} className="category_mapped_list_container">
              <div className="category_list_closeIcon">
                <img
                  src={edit}
                  alt="edit"
                  width={20}
                  height={20}
                  onClick={() => openModal(category)}
                />
                <img
                  onClick={() => {
                    setCategoryId(category._id);
                    setShowAlertModal(!showAlertModal);
                  }}
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
              <div className="category_details_container">
                <h3>category name: {category.categoryName}</h3>
                <h3>category for: {category.categoryFor}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;

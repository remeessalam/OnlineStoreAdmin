import { useDispatch } from "react-redux";
import { removeCategory } from "../../features/category/categorySlice";
import edit from "../../../public/svg/edit.svg";
import deleteIcons from "../../../public/svg/delete.svg";
import noImage from "../../../public/png/no-pictures.png";
import "./Categories.css";
const Categories = ({ categories, setEditCategory, setModal }) => {
  console.log("kjasflajnsnkjafg");
  console.log(categories, "kjasflajnsnkjafg");
  const dispatch = useDispatch();
  const openModal = (category) => {
    setEditCategory(category);
    setModal(true);
  };
  return (
    <div className="category_list_container">
      <div>
        <h3>categories</h3>
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
                  onClick={() => dispatch(removeCategory(category._id))}
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

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Categories from "../../components/categories/categories";
import CreateCategory from "../../components/createCategory/CreateCategory";
import Modal from "../../components/modal/Modal";
const Category = () => {
  const [modal, setModal] = useState(false);
  const [editCategory, setEditCategory] = useState();

  // const [categories, setCategories] = useState();
  const value = useSelector((state) => state.category.categoryValue);
  // useEffect(() => {
  //   fetchCategories();
  // }, []);
  console.log(value, "thisisvaluefromredux");
  // const fetchCategories = () => {
  //   fetch("http://localhost:3000/api/category", { method: "GET" }).then(
  //     (res) => {
  //       res.json().then((categories) => {
  //         setCategories(categories?.categories);
  //         // console.log(categories, "categories");
  //       });
  //     }
  //   );
  // };
  return (
    <div>
      {modal && <Modal category={editCategory} setModal={setModal} />}
      <CreateCategory />
      <hr />
      <Categories
        categories={value}
        setModal={setModal}
        setEditCategory={setEditCategory}
      />
    </div>
  );
};

export default Category;

import React, { useEffect, useState } from "react";
import CreateCategory from "../../components/createCategory/CreateCategory";

const Category = () => {
  const [categories, setCategories] = useState();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("http://localhost:3000/api/category", { method: "GET" }).then(
      (res) => {
        res.json().then((categories) => {
          setCategories(categories?.categories);
          // console.log(categories, "categories");
        });
      }
    );
  };
  return (
    <div>
      <CreateCategory categories={categories} />
    </div>
  );
};

export default Category;

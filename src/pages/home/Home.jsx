import { useEffect, useState } from "react";
import "./Home.css";
import CreateProduct from "../../components/createProduct/CreateProduct";
import CreateCategory from "../../components/createCategory/CreateCategory";
const Home = () => {
  // const [products, setProducts] = useState();
  // const [categories, setCategories] = useState();

  // useEffect(() => {
  //   fetchproducts();
  //   fetchCategories();
  // }, []);

  // const fetchCategories = () => {
  //   fetch("http://localhost:3000/api/category").then((res) => {
  //     res.json().then((categories) => {
  //       setCategories(categories?.categories);
  //       // console.log(categories, "categories");
  //     });
  //   });
  // };
  // const fetchproducts = () => {
  //   fetch("http://localhost:3000/api/product").then((res) => {
  //     res.json().then((products) => {
  //       // console.log(products, "products");
  //       setProducts(products?.products);

  //       // setCategories(categories);
  //     });
  //   });
  // };
  // console.log(products, categories);
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if ((value <= 0 && value === "-1") || value === "00") return;

  //   setFormData({ ...formData, [name]: value });
  //   console.log(formData, "form data");
  // };

  // const handleImageChange = (e) => {
  //   const { name, value } = e.target;
  //   setSetImage({ url: value });
  // };

  // const addImageToFormData = (e) => {
  //   e.preventDefault();

  //   setFormData((prevFormData) => {
  //     return {
  //       ...prevFormData,
  //       image: [...prevFormData.image, setImage],
  //     };
  //   });
  // };

  // const addsizeChart = (e) => {
  //   const { name, value } = e.target;
  //   if ((value <= 0 && value === "-1") || value === "00") return;
  //   setSizeChart({ ...sizeChart, [name]: value });
  // };

  // const handleSizeChart = (e) => {
  //   e.preventDefault();
  //   const newSizeChart = [...formData.sizeChart, sizeChart];
  //   setFormData({ ...formData, sizeChart: newSizeChart });
  //   setSizeChart({ size: "", stock: "" });
  // };

  // const createCategoryHandle = (e) => {
  //   const { name, value } = e.target;
  //   setcategoryFormData({ ...categoryFormData, [name]: value });
  // };
  // const addcategoryimagetoForm = () => {
  //   setcategoryFormData((pre) => {
  //     return { ...pre, image: [...pre.image, csetImage] };
  //   });
  //   setCsetImage({});
  //   document.querySelector('input[name="image"]').value = "";
  // };

  // const submitCategory = async (e) => {
  //   e.preventDefault();
  //   const response = await fetch("http://localhost:3000/api/category", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ data: categoryFormData }),
  //   });
  // };

  // const addproduct = async (e) => {
  //   e.preventDefault();
  //   let data = { name: "remees", age: 26, job: "developer", marriage: true };
  //   const response = await fetch("http://localhost:3000/api/product", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ data: formData }),
  //   });
  // const response = await axios.post("/api/product", JSON.stringify(data), {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // };
  return (
    <div className="main_container">
      {/* <CreateProduct />
      <CreateCategory /> */}
      <h1>This is Home page</h1>
    </div>
  );
};

export default Home;

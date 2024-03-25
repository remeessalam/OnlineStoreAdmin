import { useEffect, useState } from "react";
import CreateProduct from "../../components/createProduct/CreateProduct";
import Products from "../../components/products/Products";

const Product = () => {
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();
  useEffect(() => {
    fetchproducts();
    fetchCategories();
  }, []);
  const fetchCategories = () => {
    fetch("http://localhost:3000/api/category").then((res) => {
      res.json().then((categories) => {
        setCategories(categories?.categories);
        // console.log(categories, "categories");
      });
    });
  };
  const fetchproducts = () => {
    fetch("http://localhost:3000/api/product").then((res) => {
      res.json().then((products) => {
        // console.log(products, "products");
        setProducts(products?.products);

        // setCategories(categories);
      });
    });
  };
  return (
    <div>
      <CreateProduct products={products} categories={categories} />
      <Products products={products}/>
    </div>
  );
};

export default Product;

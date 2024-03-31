import { useEffect, useState } from "react";
import CreateProduct from "../../components/createProduct/CreateProduct";
import Products from "../../components/products/Products";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/product/productSlice";
import { fetchCategories } from "../../features/category/categorySlice";

const Product = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());

    // fetchproducts();
    // fetchCategories();
  }, []);
  const products = useSelector((state) => state.products.productList);
  const categories = useSelector((state) => state.category.categoryValue);

  return (
    <div>
      <CreateProduct products={products} categories={categories} />
      <Products products={products} />
    </div>
  );
};

export default Product;

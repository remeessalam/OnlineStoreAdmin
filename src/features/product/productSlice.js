import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../../api/product/productsApi";

const initialState = {
  productList: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.productList = action.payload;
    },
  },
});

export const fetchProducts = () => async (dispatch) => {
  try {
    const products = await getProducts();
    console.log(products, "gbfhdhdfhfgfhjfjhdfg");
    dispatch(setProducts(products?.products));
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;

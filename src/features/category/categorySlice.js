import { createSlice } from "@reduxjs/toolkit";
import {
  createNewCategory,
  deleteCategory,
  editCategorys,
  getCategories,
} from "../../api/category/categoryApi";
const initialState = {
  categoryValue: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      console.log(action.payload.categories, "dgsdfgsdhdhdghdetdst");
      state.categoryValue = action.payload.categories;
    },
    addCategory: (state, action) => {
      console.log(action.payload, "kdjgfkasljfalksfg");
      if (action.payload) {
        state.categoryValue = [...state.categoryValue, action.payload];
      }
    },
    filterCategory: (state, action) => {
      console.log(action.payload, "thisisconsolechain");
      state.categoryValue = state.categoryValue.filter(
        (item) => item._id !== action.payload
      );
    },
    editCategory: (state, action) => {
      console.log(action.payload, "thisiscationdotpayload");
      state.categoryValue = state.categoryValue.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    },
  },
});

export const fetchCategories = () => async (dispatch) => {
  try {
    const categories = await getCategories();
    console.log(categories, "gbfhdhdfhfgfhjfjhdfg");
    dispatch(setCategories(categories)); // Dispatch an action with fetched categories data
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};
export const createCategory = (formdata, image) => async (dispatch) => {
  try {
    const result = await createNewCategory(formdata, image);
    console.log(result, "thisiscreatedcategory");
    if (!result.status) {
      return result;
    }
    dispatch(addCategory(result.result));
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};
export const removeCategory = (id) => async (dispatch) => {
  try {
    const result = await deleteCategory(id);
    console.log(result, "thisisconsolechain");
    dispatch(filterCategory(id));
  } catch (error) {
    console.log(error);
  }
};
export const addEditedCategory =
  (formdata, image, categoryId) => async (dispatch) => {
    try {
      const result = await editCategorys(formdata, image, categoryId);
      console.log(result.category, "Responsefrombackend");
      dispatch(editCategory(result.category));
    } catch (error) {
      console.log(error);
    }
  };
export const { setCategories, addCategory, filterCategory, editCategory } =
  categorySlice.actions;

export default categorySlice.reducer;

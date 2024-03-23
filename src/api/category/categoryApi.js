export const getCategories = async () => {
  const categories = await fetch("http://localhost:3000/api/category", {
    method: "GET",
  });
  console.log(categories, "thisiscategories");

  return await categories.json();
};
export const createNewCategory = async (formdata, image) => {
  console.log(formdata, image, "formdataishere");
  // return "good";
  const category = await fetch("http://localhost:3000/api/category", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        ...formdata,
        image: image,
      },
    }),
  });
  return await category.json();
};

export const deleteCategory = async (id) => {
  const response = await fetch(`http://localhost:3000/api/category?_id=${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  console.log(response, "sfdljksadfjasdlkfj");
  return await response.json();
};

export const editCategorys = async (formdata, images, categoryId) => {
  const response = await fetch("http://localhost:3000/api/category", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        form: {
          ...formdata,
          image: [
            ...formdata?.image?.map((item) => ({ imageFile: item })),
            ...images.map((img) => ({ imageFile: img.imageFile })),
          ],
        },
        id: categoryId,
      },
    }),
  });
  console.log(response);
  return await response.json();
};

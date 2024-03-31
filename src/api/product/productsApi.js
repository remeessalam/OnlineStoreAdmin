export const getProducts = async () => {
  const categories = await fetch("http://localhost:3000/api/product", {
    method: "GET",
  });
  console.log(categories, "thisiscategories");

  return await categories.json();
};

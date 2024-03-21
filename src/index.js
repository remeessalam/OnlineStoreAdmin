import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import AppLayout from "./layout/AppLayout";
import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import Category from "./pages/category/Category";
import { Provider } from "react-redux";
const AppRouters = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout Outlet={Outlet} />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/category",
        element: <Category />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider>
    <RouterProvider router={AppRouters} />
  </Provider>
);

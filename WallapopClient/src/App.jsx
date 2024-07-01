import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import ProductViewPage from "./pages/ProductViewPage/ProductViewPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import NotFound from "./pages/NotFoundPage/NotFoundPage.jsx";
import ListingPage from "./pages/ListingPage/ListingPage.jsx";
import "./styles/base.css";
import "./styles/themes.css";
import "./styles/layout.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "/products/:id",
    element: (
      <Layout>
        <ProductViewPage />
      </Layout>
    ),
  },
  {
    path: "products/sell-product",
    element: (
      <Layout>
        <ListingPage />
      </Layout>
    ),
  },
  {
    errorElement: <NotFound />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

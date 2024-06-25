import React from "react";
import "./index.css";
import "./components/layout/Layout.css";
import "./components/product/ProductDetails/ProductDetails.css";
import "./components/product/ImageSlider/ImageSlider.css";
import "./components/product/ProductCard/ProductCard.css";
import "./pages/ProductPage/ProductPage.css";
import "./components/product/SellerInfo/SellerInfo.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import ProductPage from "./pages/ProductPage/ProductPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import NotFound from "./pages/NotFoundPage/NotFoundPage.jsx";
import ProductCard from "./components/product/ProductCard/ProductCard.jsx";

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
        <ProductPage />
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

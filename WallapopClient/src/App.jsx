import React from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import ProductPage from "./pages/ProductPage/ProductPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import NotFound from "./pages/NotFoundPage/NotFoundPage.jsx";
import ProductCard from "./components/product/ProductCard/ProductCard.jsx";
import ListingPage from "./pages/ListingPage/ListingPage.jsx";

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

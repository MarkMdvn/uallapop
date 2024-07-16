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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthenticationPage from "./pages/AuthenticationPage/AuthenticationPage.jsx";
import UserPage from "./pages/UserPage/UserPage.jsx";
import NavBar from "./components/common/NavBar/NavBar.jsx";
import Modal from "react-modal";
import NavCategorySelector from "./components/common/NavCategorySelector/NavCategorySelector.jsx";
import ProductListPage from "./pages/ProductListPage/ProductListPage.jsx";
import Footer from "./components/common/Footer/Footer.jsx";
import HomeBanner from "./components/banners/HomeBanner/HomeBanner.jsx";
import SellerPage from "./pages/SellerPage/SellerPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <NavCategorySelector />
        <HomeBanner />
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "/products-by-category/:categoryId",
    element: (
      <Layout>
        <ProductListPage />
      </Layout>
    ),
  },
  {
    path: "/products/:id",
    element: (
      <>
        <NavBar enableScrollEffect={false} />
        <ProductViewPage />
        <Footer />
      </>
    ),
  },
  {
    path: "/users/:userId",
    element: (
      <Layout>
        <SellerPage />
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
    path: "/authentication",
    element: <AuthenticationPage />,
  },
  {
    path: "/user",

    element: (
      <>
        <NavBar enableScrollEffect={false} />
        <UserPage />
      </>
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

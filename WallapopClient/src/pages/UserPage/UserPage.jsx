import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import UserSidebar from "../../components/user/UserSidebar/UserSidebar";
import UserFavourites from "../../components/user/UserFavourites/UserFavourites";
import UserProducts from "../../components/user/UserProducts/UserProducts";
import UserDetails from "../../components/user/UserDetails/UserDetails";
import "./UserPage.css";

const UserPage = () => {
  const location = useLocation();
  const [activeComponent, setActiveComponent] = useState("Products"); // Default component

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("favourites")) {
      setActiveComponent("Favourites");
    }
  }, [location.search]);

  const renderComponent = () => {
    switch (activeComponent) {
      case "Favourites":
        return <UserFavourites />;
      case "Products":
        return <UserProducts />;
      case "UserDetails":
        return <UserDetails />;
      default:
        return <UserProducts />;
    }
  };

  return (
    <div className="user-page-container">
      <UserSidebar
        setActiveComponent={setActiveComponent}
        initialSelected={activeComponent}
      />
      <div style={{ flexGrow: 1 }}>{renderComponent()}</div>
    </div>
  );
};

export default UserPage;

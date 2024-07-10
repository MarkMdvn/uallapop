import React, { useState, useEffect } from "react";
import "./UserSidebar.css"; // Make sure to import the CSS file
import { useAuth } from "../../auth/AuthProvider";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import { FaRegHandshake } from "react-icons/fa6";
import { TbMail, TbSettings } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { RiBarChart2Line } from "react-icons/ri";
import { MdOutlineSell, MdOutlineVerified } from "react-icons/md";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { LuWallet } from "react-icons/lu";
import { IoEarthOutline } from "react-icons/io5";
import { MdHelpOutline } from "react-icons/md";

function UserVerticalNavbar({ setActiveComponent }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(user.averageRating);

  useEffect(() => {
    setRating(user.averageRating);
  }, [user.averageRating]);

  const [selectedItem, setSelectedItem] = useState("Products");
  const handleItemClick = (componentName) => {
    setActiveComponent(componentName);
    setSelectedItem(componentName);
  };

  return (
    <div className="vertical-navbar-container">
      <div
        className={`vertical-navbar-profile-section ${
          selectedItem === "UserDetails" ? "nav-item-user-details-selected" : ""
        }`}
        onClick={() => handleItemClick("UserDetails")}
      >
        <img
          src={`data:image/jpeg;base64,${user.profileImg}`}
          alt={`${user.name}'s profile`}
          style={{ width: 35, height: 35, borderRadius: "50%" }}
        />{" "}
        <div className="nav-profile-section-details">
          <p style={{ fontWeight: "bold" }}>{user.name}</p>
          <div className="stars-profile-section">
            <Stack>
              {rating !== undefined && (
                <Rating
                  name="half-rating-read"
                  value={rating}
                  precision={0.5}
                  readOnly
                />
              )}
            </Stack>
            <small>(2)</small>
          </div>
          <p>
            <small>En Wallapop desde 2022</small>
          </p>
        </div>
      </div>
      <div className="nav-sections">
        <ul className="nav-items">
          <li>
            <FaRegHandshake /> Bought
          </li>
          <li>
            <FaHandHoldingDollar /> Sells
          </li>
          <li
            className={selectedItem === "Products" ? "nav-item-selected" : ""}
            onClick={() => handleItemClick("Products")}
          >
            <MdOutlineSell /> Products
          </li>
          <li>
            <TbMail /> Mailbox
          </li>
          <li
            className={selectedItem === "Favourites" ? "nav-item-selected" : ""}
            onClick={() => handleItemClick("Favourites")}
          >
            <AiOutlineHeart /> Favourites
          </li>
          <li>
            <RiBarChart2Line /> Statistics
          </li>
          <li>
            <MdOutlineVerified /> Wallapop PRO
          </li>
          <li>
            <LuWallet /> Wallet
          </li>
          <li>
            <IoEarthOutline /> Your impact
          </li>
          <li>
            <TbSettings /> Settings
          </li>
        </ul>
        <ul className="nav-help">
          <li>
            <MdHelpOutline /> Help
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserVerticalNavbar;

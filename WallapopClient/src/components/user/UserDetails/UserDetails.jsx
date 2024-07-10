import React from "react";
import "./UserDetails.css";
import { useAuth } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate("/"); // Call the logout function from AuthProvider
  };

  return (
    <div className="user-details-container">
      <div className="explanation-section">
        <div className="explanation-section-text">
          <h1 className="user-details-header">Your Profile</h1>
          <p className="user-details-subheader">
            Here you can see and edit your profile information
          </p>
        </div>
        <button className="close-session-button" onClick={logout}>
          Close Session
        </button>
      </div>
      <div className="profile-image-container">
        <h4>Profile image</h4>
        <div className="profile-images">
          <div className="profile-main-image">
            <span style={{ marginTop: "0px" }}>Main photo</span>
            <img
              src={`data:image/jpeg;base64,${user.profileImg}`}
              alt={`${user.name}'s profile`}
              className="profile-photo"
            />
            <div className="user-change-image-button-section">
              <button className="change-photo-button">Change Photo</button>
              <span>We accept photos .png and minimum 400 x 400px</span>
            </div>
          </div>
        </div>
      </div>

      <div className="public-info-container">
        <h4>Public Information</h4>
        <div className="info-field">
          <label>Name</label>
          <input className="input-field" value={user.name || ""} readOnly />
        </div>
        <div className="info-field">
          <label>Last Name</label>
          <input className="input-field" value={user.lastName || ""} readOnly />
        </div>
        <div className="info-field">
          <label>Product Location</label>
          <input className="input-field" value={user.location || ""} readOnly />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      404 Not Found
      <br />
      <Link to="/">Go back to home</Link>
    </div>
  );
};

export default NotFound;

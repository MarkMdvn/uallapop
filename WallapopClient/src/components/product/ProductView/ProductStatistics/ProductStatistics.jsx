import React from "react";
import "./ProductStatistics.css";
import { FaEye } from "react-icons/fa";
import { TiHeartFullOutline } from "react-icons/ti";
import { formatDate, relativeTime } from "../../../../utils/formatDate";

const ProductStatistics = ({ product }) => {
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-statistics-container">
      <span className="product-statistics-posted-at">
        Posted {relativeTime(product.createdAt)}
      </span>
      <div className="product-statistics-views-likes">
        <span>
          {" "}
          <FaEye />
          {product.viewCount}
        </span>
        <span>
          <TiHeartFullOutline />
          [??]
        </span>
      </div>
    </div>
  );
};

export default ProductStatistics;

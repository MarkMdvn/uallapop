import React, { useEffect, useState } from "react";
import "./ProductStatistics.css";
import { FaEye } from "react-icons/fa";
import { TiHeartFullOutline } from "react-icons/ti";
import { getCountOfLikes } from "../../../../api/productService"; // Import the service function
import { formatDate, relativeTime } from "../../../../utils/formatDate";

const ProductStatistics = ({ product }) => {
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (product) {
      getCountOfLikes(product.id).then((data) => {
        setLikeCount(data.count);
      });
    }
  }, [product]);

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
          <FaEye />
          {product.viewCount}
        </span>
        <span>
          <TiHeartFullOutline />
          {likeCount}
        </span>
      </div>
    </div>
  );
};

export default ProductStatistics;

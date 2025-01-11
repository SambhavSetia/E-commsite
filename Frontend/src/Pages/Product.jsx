import React, { useContext } from "react";
import "./Product.css";
import { useParams } from "react-router-dom";
const Product = () => {
  const { allProduct } = useContext(ShopContext);
  const { productId } = useParams();
  const product = allProduct.find((e) => e.id === productId);
  return <div></div>;
};

export default Product;

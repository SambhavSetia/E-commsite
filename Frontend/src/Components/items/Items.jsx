import React from "react";
import "./Items.css";
import { Link } from "react-router-dom";

const Items = (props) => {
  return (
    <div className="item">
      {/* Product Image */}
      <Link to={`/product/${props.id}`}>
        
        <img onClick={window.scrollTo(0,0)} src={props.image} alt={props.name} />
      </Link>

      {/* Product Name */}
      <p>{props.name}</p>
      {/* Product Prices */}
      <div className="item_prices">
        <div className="item_prices_new">${props.new_price}</div>
        <div className="item_prices_old">${props.old_price}</div>
      </div>
    </div>
  );
};

export default Items;

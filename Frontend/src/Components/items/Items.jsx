import React from 'react';
import './Items.css';

const Items = (props) => {
  return (
    <div className='item'>
      
      {/* Product Image */}
      <img src={props.image} alt={props.name} />
      {/* Product Name */}
      <p>{props.name}</p>
      {/* Product Prices */}
      <div className="item_prices">
        <div className="item_prices_new">
          {props.new_price}
        </div>
        <div className="item_prices_old">
          {props.old_price}
        </div>
      </div>
    </div>
  );
}

export default Items;

import React, { useEffect, useState } from 'react';
import './Popular.css';
import data_product from '../Assets/data';
import Items from '../items/Items';

const Popular = () => {
  const [data_product,setdata_product]=useState([]);
  useEffect(()=>{
    fetch('http://localhost:4000/popularinWomen')
    .then((response)=>response.json())
    .then((data)=>{setdata_product(data)})
  },[])
  return (
    <div className='popular'>
      <h1>Popular in women</h1>
      <hr />
      <div className="popular_item">
        {data_product.map((item, i) => (
          <Items 
            key={i} 
            id={item.id} 
            name={item.name} 
            image={item.image} 
            new_price={item.new_price} 
            old_price={item.old_price} 
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;

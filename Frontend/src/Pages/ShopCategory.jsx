import React,{useContext} from 'react'
import './ShopCategory.css'
import all_product from '../Components/Assets/all_product'
import { ShopContext } from '../Context/ShopContext'

const ShopCategory = (props) => {
  
  
  // const {all_product}=useContext(ShopContext);
  return (
    <div className='shopCategory'>
      <img src={props.banner} alt='' ></img>
    </div>
  )
}

export default ShopCategory
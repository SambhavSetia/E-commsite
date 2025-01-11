import React from 'react'
import './NewCollections.css'
import new_collection from '../Assets/new_collections'
import Items from '../items/Items'
const NewCollections = () => {
  return (
    <div className='newCollections'>
        <h1>New Collections</h1>
        <hr/>
        <div className="collections">
            {new_collection.map((item,i)=>{

return <Items  
key={i} 
id={item.id} 
name={item.name} 
image={item.image} 
new_price={item.new_price} 
old_price={item.old_price} />



            })}
            </div>
    </div>
  )
}

export default NewCollections
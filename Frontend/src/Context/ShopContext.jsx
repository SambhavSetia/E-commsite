import React, { createContext, useState,useEffect } from "react";
// import all_product from "../Components/Assets/all_product.js";


export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};
const ShopContextProvider = (props) => {


  


  const [cartItems, setCartItems] = useState(getDefaultCart());
  const[all_product,setAll_product]=useState([]);


  useEffect(()=>{
    fetch('http://localhost:4000/allproducts')
    .then((response)=>response.json())
    .then((data)=>{setAll_product(data)})
    console.log("hello",all_product)
  },[])
  console.log("hello",all_product)

  const addToCart = (itemId) => {



    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

  };

  const removeFromCart=(itemId)=>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1

    }))
  };
  const getTotalCartAmount=()=>{
    let totalAmount=0;
    for(const item in cartItems){
      if(cartItems[item]>0){
        let itemInfo =all_product.find((product)=>
            product.id===Number(item));
            totalAmount=totalAmount+itemInfo.new_price*cartItems[item];
        }
      }return totalAmount;
    }
    

    const getTotalCartItems=()=>{
      let totalItem=0;
      for(const item in cartItems){
        if(cartItems[item]>0){
          totalItem=totalItem+cartItems[item];
        }
      }
      return totalItem;
    }

  
  const contextValue = { all_product, cartItems,addToCart,removeFromCart,getTotalCartAmount,getTotalCartItems };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );

};
export default ShopContextProvider;






// import React, { createContext, useState, useEffect } from "react";

// export const ShopContext = createContext(null);

// const getDefaultCart = () => {
//   let cart = {};
//   for (let index = 0; index < 300 + 1; index++) {
//     cart[index] = 0;
//   }
//   return cart;
// };

// const ShopContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState(getDefaultCart());
//   const [all_product, setAll_product] = useState([]);
//   const [loading, setLoading] = useState(true); // loading state

//   useEffect(() => {
//     fetch('http://localhost:4000/allproducts')
//       .then((response) => response.json())
//       .then((data) => {
//         setAll_product(data);
//         setLoading(false); // set loading to false after data is fetched
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//         setLoading(false); // set loading to false if error occurs
//       });
//   }, []);

//   const addToCart = (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//   };

//   const removeFromCart = (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//   };

//   const getTotalCartAmount = () => {
//     if (loading) return 0; // Return 0 if products are still loading

//     let totalAmount = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         let itemInfo = all_product.find((product) => product.id === Number(item));
//         if (itemInfo) {
//           totalAmount = totalAmount + itemInfo.new_price * cartItems[item];
//         }
//       }
//     }
//     return totalAmount;
//   };

//   const getTotalCartItems = () => {
//     let totalItem = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         totalItem = totalItem + cartItems[item];
//       }
//     }
//     return totalItem;
//   };

//   const contextValue = {
//     all_product,
//     cartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     getTotalCartItems
//   };

//   return (
//     <ShopContext.Provider value={contextValue}>
//       {props.children}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;

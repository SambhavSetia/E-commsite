import React, { createContext, useState, useEffect } from "react";

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
  const [all_product, setAll_product] = useState([]);
  const [loading, setLoading] = useState(true); // loading state for async fetch

  // Fetching products from the server
  useEffect(() => {
    let isMounted = true; // flag to avoid state updates on unmounted component

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://e-commerce-backend-yq08.onrender.com/allproducts"
        );
        const data = await response.json();
        if (isMounted) {
          setAll_product(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();

    if (localStorage.getItem("auth-token")) {
      fetch("https://e-commerce-backend-yq08.onrender.com/getcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // Send an empty JSON body
      })
        .then((response) => response.json())
        .then((data) => {
          if (isMounted) setCartItems(data);
        })
        .catch((error) => console.error("Error fetching cart data:", error));
    }

    return () => {
      isMounted = false; // Cleanup on component unmount
    };
  }, []);

  // Adding item to cart and sending request to server
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

    // Check if user is logged in and has an auth token
    if (localStorage.getItem("auth-token")) {
      try {
        const response = await fetch(
          "https://e-commerce-backend-yq08.onrender.com/addtocart",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "auth-token": `${localStorage.getItem("auth-token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ itemId }),
          }
        );
        const data = await response.json();
        console.log(data); // Handle response
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  // Removing item from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      try {
        const response = await fetch(
          "https://e-commerce-backend-yq08.onrender.com/removefromcart",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "auth-token": `${localStorage.getItem("auth-token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ itemId }),
          }
        );
        const data = await response.json();
        console.log(data); // Handle response
      } catch (error) {
        console.error("Error Removing from cart:", error);
      }
    }
  };

  // Calculate total cart amount
  const getTotalCartAmount = () => {
    if (loading) return 0; // Return 0 if loading

    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // Calculate total number of items in the cart
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    loading, // provide loading state in the context
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

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
          "http://localhost:4000/allproducts"
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
      fetch("http://localhost:4000/getcart", {
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
          "http://localhost:4000/addtocart",
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
          "http://localhost:4000/removefromcart",
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

  // ✅ Updated: Calculate total cart amount
  const getTotalCartAmount = () => {
    if (loading || !Array.isArray(all_product)) return 0;

    let totalAmount = 0;

    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];
      if (quantity > 0) {
        const product = all_product.find(
          (p) => String(p.id) === String(itemId)
        );
        if (product?.new_price) {
          totalAmount += product.new_price * quantity;
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

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthContext";

export const cartContext = createContext({});
function CartCount({ children }) {
  const { isLogggedin } = useContext(authContext);
  const [cartCount, setCartCount] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCartProducts(res.data.data.products);
        setCartCount(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
      })
      .catch((err) => {
        {
          /*Do Nothing */
        }
      });
  }, [isLogggedin]);
  return (
    <cartContext.Provider
      value={{
        cartCount,
        setCartCount,
        cartProducts,
        setCartProducts,
        totalCartPrice,
        setTotalCartPrice,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export default CartCount;

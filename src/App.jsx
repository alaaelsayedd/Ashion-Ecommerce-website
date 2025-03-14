import "./App.css";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login/Login";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Signup from "./components/Signup/Signup";
import ProtectRoute from "./Guards/ProtectRoutes";
import ProductDetails from "./components/Product/ProductDetails";
import Cart from "./components/Cart/Cart";
import AuthProtectRoute from "./Guards/AuthProtectRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import WishList from "./components/WishList/WishList";
import Order from "./components/Order/Order";
import Checkout from "./components/Checkout/Checkout";
import Men from "./components/Pages/Men";
import Women from "./components/Pages/Women";
import Shop from "./components/Pages/Shop";
import ContactForm from "./components/Contact/Conatct";
import Brands from "./components/Brands/Brands";
import { useEffect } from "react";
function App() {

  // useEffect(() => {
  //   window.addEventListener("storage", () => {
  //     localStorage.removeItem("token");
  //     setLoginState(false);
  //   });
  // });
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/login",
          element: (
            <ProtectRoute>
              {" "}
              <Login />
            </ProtectRoute>
          ),
        },
        {
          path: "/signup",
          element: (
            <ProtectRoute>
              <Signup />
            </ProtectRoute>
          ),
        },
        {
          path: "/product/:id",
          element: <ProductDetails />,
        },
        {
          path: "/cart",
          element: (
            <AuthProtectRoute>
              <Cart />
            </AuthProtectRoute>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <AuthProtectRoute>
              <WishList />
            </AuthProtectRoute>
          ),
        },
        {
          path: "/order/allorders",
          element: (
            <AuthProtectRoute>
              <Order />
            </AuthProtectRoute>
          ),
        },
        {
          path: "/checkout",
          element: (
            <AuthProtectRoute>
              <Checkout />
            </AuthProtectRoute>
          ),
        },
        {
          path: "/men",
          element: <Men />,
        },
        {
          path: "/women",
          element: <Women />,
        },
        {
          path: "/shop",
          element: <Shop />,
        },
        {
          path: "/contact",
          element: <ContactForm />,
        },
        {
          path: "/brands",
          element: <Brands />,
        },
      ],
    },
  ]);
 
  return (
    <>
     
      <Provider store={store}>
        {/* <AuthContextProier> */}
      
          <RouterProvider router={router} />
          <ToastContainer />
          
        {/* </AuthContextProier> */}
      </Provider>
    </>
  );
}

export default App;

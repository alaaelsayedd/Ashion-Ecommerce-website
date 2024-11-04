import "./App.css";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login/Login";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Signup from "./components/Signup/Signup";
import AuthContextProier from "./Context/AuthContext";
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

function App() {
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
      ],
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <AuthContextProier>
          <RouterProvider router={router} />
          <ToastContainer />
        </AuthContextProier>
      </Provider>
    </>
  );
}

export default App;

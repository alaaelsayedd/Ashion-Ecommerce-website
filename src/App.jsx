import "./App.css";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login/Login";
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

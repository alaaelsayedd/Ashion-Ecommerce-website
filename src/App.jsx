import "./App.css";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

import AuthContextProier from "./Context/AuthContext";
import ProtectRoute from "./Guards/ProtectRoutes";
import ProductDetails from "./components/Product/ProductDetails";

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
      ],
    },
  ]);

  return (
    <>
      <AuthContextProier>
        <RouterProvider router={router} />
      </AuthContextProier>
    </>
  );
}

export default App;

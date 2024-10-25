import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../Context/AuthContext";

function ProtectRoute({ children }) {
  const {isLogggedin} =useContext(authContext)
  console.log(isLogggedin);

  return <>{!isLogggedin ? children : <Navigate to={"/"}></Navigate>}</>;
}

export default ProtectRoute;

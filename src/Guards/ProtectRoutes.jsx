import { useContext } from "react";
import { authContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectRoute({ children }) {
  const { isloggedin } = useContext(authContext);

  return <>{isloggedin ? <Navigate to={"/"}></Navigate> : children }</>;
}

export default ProtectRoute;

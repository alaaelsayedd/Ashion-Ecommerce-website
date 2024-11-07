import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectRoute({ children }) {
  const { isLogggedin } = useSelector((store) => store.auth);

  return <>{!isLogggedin ? children : <Navigate to={"/"}></Navigate>}</>;
}

export default ProtectRoute;

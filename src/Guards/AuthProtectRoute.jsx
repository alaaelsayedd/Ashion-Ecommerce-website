import { useContext } from "react";
import { authContext } from "../Context/AuthContext";
import Login from "../components/Login/Login";

function AuthProtectRoute({children}) {
    const { isLogggedin } = useContext(authContext);
    return (
        <>
       {isLogggedin ? children : <Login></Login>}
        </> 
     );
}

export default AuthProtectRoute;

import Login from "../components/Login/Login";
import { useSelector } from "react-redux";

function AuthProtectRoute({children}) {
    const {isLogggedin} =useSelector(store=>store.auth)

    return (
        <>
       {isLogggedin ? children : <Login/>}
        </> 
     );
}

export default AuthProtectRoute;
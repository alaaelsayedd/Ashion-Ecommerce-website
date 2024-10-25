import { createContext, useEffect, useState } from "react";

export const authContext = createContext(false);
function AuthContextProvider({ children }) {
  const [isLogggedin, setLoginState] = useState(
    !!localStorage.getItem("token")
  );
  console.log(isLogggedin)

  useEffect(() => {
    window.addEventListener("storage", () => {
      localStorage.removeItem("token");
      setLoginState(false);
    });
  });

  return (
    <authContext.Provider value={{ isLogggedin, setLoginState }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthContextProvider;

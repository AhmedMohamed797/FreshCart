import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("token") || sessionStorage.getItem("token"),
  );

  function logOut() {
    setToken(null);
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ token, setToken, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

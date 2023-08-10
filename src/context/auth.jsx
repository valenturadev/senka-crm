import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ role: "normal", token: "" });

  const navigation = useNavigate();

  const logout = () => {
    navigation("/giris-yap");
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

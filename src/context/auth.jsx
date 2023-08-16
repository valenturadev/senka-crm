import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
  const navigation = useNavigate();

  const [auth, setAuth] = useState({ role: "normal", token: "" });
  //const [auth, setAuth] = useState({ role: "normal", token: "11" });

  const logout = () => {
    navigation("/giris-yap");
  };

  const login = () => {};

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

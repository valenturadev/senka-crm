import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { errorMessage } from "../utils/toast";
import axios from "axios";

const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
  const navigation = useNavigate();
  const [user, setUser] = useState({
    token: "",
    qr_code: "",
    is_web_controller_page: false,
    is_operations_team: false,
    is_customer_relations: false,
    is_finance: false,
    is_accounting: false,
    name: "mertcan",
    surname: "kose",
  });

  useEffect(() => {
    let localUser = localStorage.getItem("user");
    let myUser = JSON.parse(localUser);
    setUser(myUser)

    console.log("My user: ", myUser);
  }, []);

  const logout = () => {
    navigation("/giris-yap");
  };

  const login = async (phone, password) => {
    const cleanedNumber = phone.replace(/[\s()-]/g, "");
    const transformedNumber = "90" + cleanedNumber;

    try {
      const response = await axios.post(
        `https://senka.valentura.com/api/crm/Api/login`,
        {
          tel_no: transformedNumber,
          password: password,
          password_a: password,
        }
      );

      if (response.data.data.token) {
        let userRole = getTrueKey(response.data.data);
        let dataUser = { ...response.data.data, role: userRole };
        setUser(dataUser);
        localStorage.setItem("user", JSON.stringify(dataUser));
        navigation("/");
      }
    } catch (error) {
      errorMessage("Giriş Yapılamadı!");
      console.log(error);
    }
  };

  const getTrueKey = (obj) => {
    for (const key in obj) {
      if (obj[key] === true) {
        return key;
      }
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
